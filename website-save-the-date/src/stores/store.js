import { create } from "zustand";

export const DEVICE_BREAKPOINTS = {
  phone: 750,
  m: 1300,
  l: 1920,
};

export const useDeviceStore = create(() => ({
  deviceMode: null,
}));

export function listenDeviceMode() {
  const queries = Object.entries(DEVICE_BREAKPOINTS).map(([mode, width]) => ({
    mode,
    media: window.matchMedia(`(max-width: ${width}px)`),
  }));

  const update = () => {
    const match = queries.find(({ media }) => media.matches);

    useDeviceStore.setState({
      deviceMode: match ? match.mode : "xl",
    });
  };

  update();

  queries.forEach(({ media }) => media.addEventListener("change", update));

  return () =>
    queries.forEach(({ media }) => media.removeEventListener("change", update));
}
