const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { Resend } = require("resend");
const { z } = require("zod");

dotenv.config();

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
    name: z.string().trim().min(2).max(100),
    email: z.string().trim().email().max(320),
    message: z.string().trim().min(10).max(5000),
    company: z.string().max(200).optional().default(""),
});

app.use(cors());
app.use(express.json());

app.get("/api/ping", (_req, res) => {
    res.json({ ok: true });
});

app.post("/api/contact", async (req, res) => {
    try {
        const parsed = contactSchema.safeParse(req.body);

        if (!parsed.success) {
            return res.status(400).json({
                ok: false,
                message: "Les données du formulaire sont invalides.",
            });
        }

        const { name, email, message, company } = parsed.data;

        if (company && company.trim() !== "") {
            return res.status(200).json({
                ok: true,
                message: "Message envoyé.",
            });
        }

        if (
            !process.env.RESEND_API_KEY ||
            !process.env.CONTACT_TO_EMAIL ||
            !process.env.CONTACT_FROM_EMAIL
        ) {
            return res.status(500).json({
                ok: false,
                message: "Variables d'environnement manquantes.",
            });
        }

        const { error } = await resend.emails.send({
            from: process.env.CONTACT_FROM_EMAIL,
            to: [process.env.CONTACT_TO_EMAIL],
            replyTo: email,
            subject: `Nouveau message portfolio — ${name}`,
            text: `Nom: ${name}\nEmail: ${email}\n\n${message}`,
        });

        if (error) {
            console.error("Resend error:", error);
            return res.status(500).json({
                ok: false,
                message: "Impossible d’envoyer le message.",
            });
        }

        return res.status(200).json({
            ok: true,
            message: "Merci, votre message a bien été envoyé.",
        });
    } catch (error) {
        console.error("API error:", error);
        return res.status(500).json({
            ok: false,
            message: "Erreur serveur.",
        });
    }
});

app.listen(8787, () => {
    console.log("API running on http://localhost:8787");
});