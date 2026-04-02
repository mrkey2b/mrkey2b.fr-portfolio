import React, { useState } from "react";

const initialForm = {
  name: "",
  email: "",
  message: "",
  company: "", // honeypot
};

const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({
    type: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (feedback.message) {
      setFeedback({ type: "", message: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setFeedback({
        type: "error",
        message: "Merci de renseigner tous les champs avant l’envoi.",
      });
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setFeedback({
          type: "error",
          message: data?.message || "Une erreur est survenue.",
        });
        return;
      }

      setFeedback({
        type: "success",
        message: data?.message || "Merci, votre message a bien été envoyé.",
      });

      setForm(initialForm);
    } catch (error) {
      console.error(error);
      setFeedback({
        type: "error",
        message: "Une erreur est survenue. Merci de réessayer.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full rounded-[28px] border border-white/10 bg-white/5 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-10 xl:p-12">
      <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
        Prise de contact
      </p>
      <h3 className="mt-2 text-3xl font-bold text-white">Contact</h3>

      <p className="mt-4 max-w-2xl text-[16px] leading-[30px] text-zinc-400">
        Une mission, un projet, une collaboration ou une demande technique ?
        Décrivez votre besoin et votre contexte, je reviendrai vers vous dès que
        possible.
      </p>

      <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-7">
        <input
          type="text"
          name="company"
          value={form.company}
          onChange={handleChange}
          autoComplete="off"
          tabIndex={-1}
          className="hidden"
        />

        <label className="flex flex-col">
          <span className="mb-3 text-[15px] font-medium text-white">
            Votre Nom / Prénom
          </span>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nom et prénom"
            className="rounded-2xl border border-white/10 bg-black/20 px-6 py-4 text-white placeholder:text-zinc-400 outline-none transition focus:border-violet-400/40 focus:bg-black/30"
          />
        </label>

        <label className="flex flex-col">
          <span className="mb-3 text-[15px] font-medium text-white">
            Votre Mail
          </span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="votre@email.com"
            className="rounded-2xl border border-white/10 bg-black/20 px-6 py-4 text-white placeholder:text-zinc-400 outline-none transition focus:border-violet-400/40 focus:bg-black/30"
          />
        </label>

        <label className="flex flex-col">
          <span className="mb-3 text-[15px] font-medium text-white">
            Votre Message
          </span>
          <textarea
            rows={8}
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Parlez-moi de votre projet, de votre besoin ou de votre demande..."
            className="resize-none rounded-2xl border border-white/10 bg-black/20 px-6 py-4 text-white placeholder:text-zinc-400 outline-none transition focus:border-violet-400/40 focus:bg-black/30"
          />
        </label>

        {feedback.message && (
          <div
            className={`rounded-2xl border px-4 py-3 text-sm ${feedback.type === "success"
                ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
                : "border-red-500/20 bg-red-500/10 text-red-300"
              }`}
          >
            {feedback.message}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="rounded-2xl bg-white px-8 py-3 text-sm font-bold text-black transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Envoi en cours..." : "Envoyer le message"}
          </button>

          <span className="text-sm text-zinc-400">
            Réponse rapide selon disponibilité.
          </span>
        </div>
      </form>
    </section>
  );
};

export default Contact;