"use client";

import { useState } from "react";
import styles from "./style.module.scss";

const FIELDS = [
  { name: "first_name", label: "Prénom", autoComplete: "given-name", required: true },
  { name: "last_name", label: "Nom", autoComplete: "family-name", required: true },
  { name: "email", label: "E-mail", type: "email", autoComplete: "email" },
  { name: "address", label: "Adresse", autoComplete: "address-line1", required: true },
  { name: "address_complement", label: "Complément d'adresse", autoComplete: "address-line2" },
  { name: "postal_code", label: "Code postal", autoComplete: "postal-code", required: true },
  { name: "city", label: "Ville", autoComplete: "address-level2", required: true },
  { name: "country", label: "Pays", autoComplete: "country-name", required: true },
];

export default function GuestForm() {
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    if (status === "loading") return;

    const data = Object.fromEntries(new FormData(event.currentTarget));
    setStatus("loading");

    try {
      const response = await fetch("/api/guests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (!response.ok) throw new Error(result.error);
      setStatus("success");
    } catch (error) {
      setErrorMessage(error.message || "Une erreur est survenue, merci de réessayer.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className={styles.success} role="status">
        Merci ! Vos coordonnées ont bien été enregistrées.
      </p>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {FIELDS.map(({ name, label, type = "text", required, autoComplete }) => (
        <label key={name} className={styles.field}>
          <span>
            {label}
            {!required && " (facultatif)"}
          </span>
          <input
            className={styles.input}
            name={name}
            type={type}
            required={required}
            autoComplete={autoComplete}
            maxLength={200}
          />
        </label>
      ))}

      <p className={styles.privacy}>
        Vos coordonnées sont recueillies uniquement pour vous envoyer le
        faire-part officiel de notre mariage.
      </p>

      {status === "error" && (
        <p className={styles.error} role="alert">
          {errorMessage}
        </p>
      )}

      <button className={styles.submit} type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Envoi en cours…" : "Envoyer"}
      </button>
    </form>
  );
}
