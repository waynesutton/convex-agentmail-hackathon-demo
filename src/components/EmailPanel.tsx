import { useState, FormEvent } from "react";
import { useAction, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import "./EmailPanel.css";

interface EmailPanelProps {
  threadId: Id<"threads">;
}

function EmailPanel({ threadId }: EmailPanelProps) {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [creatingInbox, setCreatingInbox] = useState(false);
  const [inboxAddress, setInboxAddress] = useState<string | null>(null);

  const createInbox = useAction(api.mail.createInbox);
  const sendEmail = useAction(api.mail.sendEmail);

  const handleCreateInbox = async () => {
    setCreatingInbox(true);
    try {
      const result = await createInbox({ threadId });
      setInboxAddress(result.emailAddress);
    } finally {
      setCreatingInbox(false);
    }
  };

  const handleSendEmail = async (e: FormEvent) => {
    e.preventDefault();
    if (!to.trim() || !subject.trim() || !text.trim() || sending) return;

    setSending(true);
    try {
      await sendEmail({
        threadId,
        to: to.trim(),
        subject: subject.trim(),
        text: text.trim(),
      });
      setTo("");
      setSubject("");
      setText("");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="email-panel">
      <h2>Email Integration</h2>

      <div className="inbox-section">
        <h3>Your Inbox</h3>
        {!inboxAddress ? (
          <button
            className="create-inbox-btn"
            onClick={handleCreateInbox}
            disabled={creatingInbox}
          >
            {creatingInbox ? "Creating..." : "Create Inbox"}
          </button>
        ) : (
          <div className="inbox-address">
            <label>Inbox Address:</label>
            <code>{inboxAddress}</code>
          </div>
        )}
      </div>

      <div className="send-email-section">
        <h3>Send Email</h3>
        <form onSubmit={handleSendEmail}>
          <div className="form-field">
            <label htmlFor="to">To:</label>
            <input
              id="to"
              type="email"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="recipient@example.com"
              disabled={sending}
            />
          </div>
          <div className="form-field">
            <label htmlFor="subject">Subject:</label>
            <input
              id="subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Email subject"
              disabled={sending}
            />
          </div>
          <div className="form-field">
            <label htmlFor="text">Message:</label>
            <textarea
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Email body"
              rows={4}
              disabled={sending}
            />
          </div>
          <button
            type="submit"
            className="send-email-btn"
            disabled={!to.trim() || !subject.trim() || !text.trim() || sending}
          >
            {sending ? "Sending..." : "Send Email"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EmailPanel;

