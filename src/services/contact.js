import conf from "../../const.js";

export const sendContactMessage = async ({ name, email, query }) => {
    if (!conf.emailServiceId || !conf.emailTemplateId || !conf.emailPublicKey) {
        return {
            ok: false,
            message: "Contact service is not configured yet.",
        };
    }

    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            service_id: conf.emailServiceId,
            template_id: conf.emailTemplateId,
            user_id: conf.emailPublicKey,
            template_params: {
                from_name: name,
                from_email: email,
                user_query: query,
            },
        }),
    });

    if (!response.ok) {
        return {
            ok: false,
            message: "Unable to send your query right now. Please try again.",
        };
    }

    return {
        ok: true,
        message: "Your query has been sent to the developer.",
    };
};
