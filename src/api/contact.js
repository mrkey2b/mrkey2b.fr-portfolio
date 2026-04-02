import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors());
app.use(express.json());

app.use((req, _res, next) => {
    console.log(`\n[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.get("/api/ping", (_req, res) => {
    return res.status(200).json({
        ok: true,
        message: "API OK",
        source: "express-contact-server",
    });
});

app.post("/api/contact", async (req, res) => {
    console.log("BODY RECU =>", req.body);
    console.log("HEADERS =>", req.headers);
    console.log("ENV CHECK =>", {
        hasResendKey: Boolean(process.env.RESEND_API_KEY),
        contactToEmail: process.env.CONTACT_TO_EMAIL || null,
        contactFromEmail: process.env.CONTACT_FROM_EMAIL || null,
    });

    try {
        const { name, email, message, company } = req.body ?? {};

        console.log("FIELDS =>", {
            name,
            email,
            message,
            company,
            types: {
                name: typeof name,
                email: typeof email,
                message: typeof message,
                company: typeof company,
            },
        });

        if (company) {
            console.log("HONEYPOT TRIGGERED");
            return res.status(200).json({
                ok: true,
                message: "Message envoyé.",
                debug: "honeypot_triggered",
            });
        }

        if (!name || !email || !message) {
            console.log("VALIDATION ERROR => champs manquants");
            return res.status(400).json({
                ok: false,
                message: "Tous les champs sont requis.",
                debug: {
                    receivedBody: req.body,
                    missing: {
                        name: !name,
                        email: !email,
                        message: !message,
                    },
                },
            });
        }

        console.log("ENVOI RESEND EN COURS...");

        const { data, error } = await resend.emails.send({
            from: process.env.CONTACT_FROM_EMAIL,
            to: [process.env.CONTACT_TO_EMAIL],
            replyTo: email,
            subject: `Nouveau message de ${name}`,
            text: `Nom: ${name}\nEmail: ${email}\n\n${message}`,
        });

        console.log("RESEND RESPONSE =>", { data, error });

        if (error) {
            console.error("RESEND ERROR =>", error);
            return res.status(500).json({
                ok: false,
                message: "Impossible d’envoyer le message.",
                debug: error,
            });
        }

        return res.status(200).json({
            ok: true,
            message: "Merci, votre message a bien été envoyé.",
            debug: {
                resendId: data?.id ?? null,
            },
        });
    } catch (error) {
        console.error("SERVER ERROR =>", error);
        return res.status(500).json({
            ok: false,
            message: "Erreur serveur.",
            debug: String(error),
        });
    }
});

app.listen(8787, () => {
    console.log("API contact sur http://localhost:8787");
    console.log("ENV AU DEMARRAGE =>", {
        hasResendKey: Boolean(process.env.RESEND_API_KEY),
        contactToEmail: process.env.CONTACT_TO_EMAIL || null,
        contactFromEmail: process.env.CONTACT_FROM_EMAIL || null,
    });
});