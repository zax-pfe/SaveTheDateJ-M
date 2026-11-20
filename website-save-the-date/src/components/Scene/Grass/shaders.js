// Grass shaders, adapted from Bruno Simon's TSL grass to GLSL (WebGL renderer).
// Each blade is one triangle: a tip (aCorner 0) and two base corners (1 = left, 2 = right).

const noise = /* glsl */ `
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  // Smooth value noise, 0..1
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }
`;

export const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uBladeWidth;
  uniform float uWidthRandomness;
  uniform float uBladeHeight;
  uniform float uHeightRandomness;
  uniform float uHeightVariation;
  uniform float uPatchSize;
  uniform float uWindStrength;
  uniform float uWindSpeed;
  uniform float uWindFrequency;
  uniform float uWindFlutter;
  uniform vec2 uWindDirection;

  attribute float aCorner;
  attribute float aRandom;

  varying float vTipness;
  varying float vRandom;

  ${noise}

  void main() {
    // Blade center in world space (all 3 vertices share it)
    vec3 center = (modelMatrix * vec4(position, 1.0)).xyz;

    float tipness = step(aCorner, 0.5);

    // Height: per-blade randomness + large patches of taller / shorter grass
    float height = uBladeHeight * mix(1.0, aRandom, uHeightRandomness);
    height *= mix(1.0, noise(center.xz / uPatchSize) * 1.5 + 0.25, uHeightVariation);

    // Width: per-blade randomness (fract() decorrelates it from the height randomness)
    float width = uBladeWidth * mix(1.0, fract(aRandom * 7.31) * 1.5 + 0.25, uWidthRandomness);

    // Shape: tip at (0, 1), base corners at (±1, 0)
    float side = aCorner < 0.5 ? 0.0 : (aCorner < 1.5 ? 1.0 : -1.0);

    // Billboard: rotate the blade around Y so it always faces the camera
    vec2 toCamera = cameraPosition.xz - center.xz;
    float angle = atan(toCamera.x, toCamera.y);
    vec3 right = vec3(cos(angle), 0.0, -sin(angle));

    vec3 worldPosition = center + right * side * width;
    worldPosition.y += tipness * height;

    // Wind: a noise field scrolling along the wind direction (gusts) + per-blade flutter
    vec2 windUv = center.xz * uWindFrequency - uWindDirection * uTime * uWindSpeed;
    float gust = noise(windUv);
    float flutter = sin(uTime * 4.0 + aRandom * 6.2831) * uWindFlutter;
    float bend = uWindStrength * (gust + flutter);

    vec2 windOffset = uWindDirection * bend * height;
    worldPosition.xz += windOffset * tipness;

    // Keep the blade length roughly constant: a bent tip gets lower
    float bentHeight = sqrt(max(height * height - dot(windOffset, windOffset), height * height * 0.05));
    worldPosition.y -= tipness * (height - bentHeight);

    vTipness = tipness;
    vRandom = aRandom;

    gl_Position = projectionMatrix * viewMatrix * vec4(worldPosition, 1.0);
  }
`;

export const fragmentShader = /* glsl */ `
  uniform vec3 uBaseColor;
  uniform vec3 uTipColor;
  uniform float uColorVariation;

  varying float vTipness;
  varying float vRandom;

  void main() {
    vec3 color = mix(uBaseColor, uTipColor, smoothstep(0.0, 1.0, vTipness));
    color *= 1.0 + (vRandom - 0.5) * uColorVariation;

    gl_FragColor = vec4(color, 1.0);

    #include <colorspace_fragment>
  }
`;
