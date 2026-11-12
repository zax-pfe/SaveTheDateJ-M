"use client";

import dynamic from "next/dynamic";

// Client-only render for the test page: browser extensions (e.g. Keeper) that
// inject markup into inputs can no longer cause hydration mismatches here.
const GuestForm = dynamic(() => import("@/components/GuestForm/GuestForm"), {
  ssr: false,
});

export default function ClientGuestForm() {
  return <GuestForm />;
}
