import GuestForm from "./ClientGuestForm";

// Temporary test page, reachable only by typing /test. Not linked anywhere.
export const metadata = {
  title: "Test – Formulaire invités",
  robots: { index: false, follow: false },
};

export default function TestPage() {
  return (
    <main>
      <GuestForm />
    </main>
  );
}
