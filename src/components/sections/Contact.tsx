"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { FaEnvelope, FaPaperPlane } from "react-icons/fa";
import { submitMessage } from "@/lib/data/messages";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import MagneticButton from "@/components/ui/MagneticButton";

const schema = z.object({
  name: z.string().min(2, "Please enter your name").max(200),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(10, "Message should be at least 10 characters").max(5000),
});

type FormValues = z.infer<typeof schema>;

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormValues) {
    try {
      await submitMessage(data);
      toast.success("Message sent — I'll get back to you soon!");
      reset();
    } catch {
      toast.error("Firebase isn't configured yet, so this couldn't be sent.");
    }
  }

  return (
    <AnimatedSection id="contact" className="mx-auto max-w-3xl px-6 py-28">
      <SectionHeading
        eyebrow="Contact"
        title="Let's Build Something"
        description="Have a project in mind or just want to say hi? My inbox is always open."
      />

      <form onSubmit={handleSubmit(onSubmit)} className="glass space-y-5 rounded-2xl p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-muted">Name</label>
            <input
              {...register("name")}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary/60"
              placeholder="Jane Doe"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-accent">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-muted">Email</label>
            <input
              {...register("email")}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary/60"
              placeholder="jane@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-accent">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-muted">Message</label>
          <textarea
            {...register("message")}
            rows={5}
            className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary/60"
            placeholder="Tell me about your project..."
          />
          {errors.message && (
            <p className="mt-1 text-xs text-accent">{errors.message.message}</p>
          )}
        </div>

        <MagneticButton
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 disabled:opacity-60"
        >
          {isSubmitting ? (
            "Sending..."
          ) : (
            <>
              Send Message <FaPaperPlane size={13} />
            </>
          )}
        </MagneticButton>

        <p className="flex items-center justify-center gap-1.5 text-center text-xs text-muted">
          <FaEnvelope size={11} /> Or reach out directly via email.
        </p>
      </form>
    </AnimatedSection>
  );
}
