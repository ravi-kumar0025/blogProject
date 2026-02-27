import { useState } from "react";
import { useForm } from "react-hook-form";
import { sendContactMessage } from "../services/contact.js";
import Input from "../components/Input.jsx";

function Contact() {
    const { register, handleSubmit, reset } = useForm();
    const [status, setStatus] = useState({ type: "", message: "" });
    const [sending, setSending] = useState(false);

    const onSubmit = async (data) => {
        setSending(true);
        setStatus({ type: "", message: "" });
        const result = await sendContactMessage({
            name: data.name,
            email: data.email,
            query: data.query,
        });
        setSending(false);
        setStatus({ type: result.ok ? "success" : "error", message: result.message });
        if (result.ok) {
            reset({ name: "", email: "", query: "" });
        }
    };

    return (
        <div className="mx-auto w-full max-w-3xl px-4 py-6">
            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 text-white sm:p-6">
                <h1 className="text-center text-2xl font-bold text-cyan-300">Contact</h1>
                <p className="mt-2 text-center text-sm text-slate-300">
                    Share your question with the developer.
                </p>

                <form className="mt-6 flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        label="Name"
                        placeholder="Your name"
                        {...register("name", { required: true })}
                    />
                    <Input
                        label="Email"
                        type="email"
                        placeholder="Your email"
                        {...register("email", { required: true })}
                    />
                    <div>
                        <label className="mb-1 inline-block pl-1">Query</label>
                        <textarea
                            className="min-h-32 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none duration-200 hover:border-blue-500 focus:border-2 focus:border-blue-700"
                            placeholder="Write your query"
                            {...register("query", { required: true })}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={sending}
                        className="mt-2 rounded-lg bg-cyan-300 px-4 py-2 font-semibold text-slate-900 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {sending ? "Sending..." : "Send Query"}
                    </button>
                </form>

                {status.message && (
                    <p className={`mt-4 text-sm ${status.type === "success" ? "text-emerald-300" : "text-rose-300"}`}>
                        {status.message}
                    </p>
                )}
            </div>
        </div>
    );
}

export default Contact;
