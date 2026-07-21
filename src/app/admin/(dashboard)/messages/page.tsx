"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEnvelopeOpen, FaTrash } from "react-icons/fa";
import { subscribeMessages, markMessageRead, deleteMessage } from "@/lib/data/messages";
import { getErrorMessage } from "@/lib/errors";
import type { ContactMessage } from "@/types/content";
import { PageHeader } from "@/components/admin/Card";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  useEffect(() => subscribeMessages(setMessages), []);

  async function handleToggleRead(message: ContactMessage) {
    try {
      await markMessageRead(message.id, !message.read);
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteMessage(id);
      toast.success("Message deleted");
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  }

  return (
    <div className="max-w-3xl">
      <PageHeader title="Messages" description="Submissions from your contact form." />

      {messages.length === 0 ? (
        <p className="glass rounded-xl p-8 text-center text-sm text-muted">
          No messages yet.
        </p>
      ) : (
        <div className="space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`glass rounded-xl p-5 ${!message.read ? "border-primary/40" : ""}`}
            >
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold">
                    {message.name}{" "}
                    {!message.read && (
                      <span className="ml-2 rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary-light">
                        New
                      </span>
                    )}
                  </p>
                  <a
                    href={`mailto:${message.email}`}
                    className="text-xs text-secondary hover:underline"
                  >
                    {message.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted">
                    {new Date(message.createdAt).toLocaleString()}
                  </span>
                  <button
                    onClick={() => handleToggleRead(message)}
                    className="rounded p-1.5 text-muted hover:text-white"
                    title={message.read ? "Mark as unread" : "Mark as read"}
                  >
                    <FaEnvelopeOpen size={13} />
                  </button>
                  <button
                    onClick={() => handleDelete(message.id)}
                    className="rounded p-1.5 text-muted hover:text-accent"
                  >
                    <FaTrash size={13} />
                  </button>
                </div>
              </div>
              <p className="text-sm text-muted">{message.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
