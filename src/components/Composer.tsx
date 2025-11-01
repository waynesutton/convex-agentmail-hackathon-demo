import { useState, FormEvent } from "react";
import "./Composer.css";

interface ComposerProps {
  onSend: (content: string) => Promise<void>;
}

function Composer({ onSend }: ComposerProps) {
  const [content, setContent] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!content.trim() || sending) return;

    setSending(true);
    try {
      await onSend(content.trim());
      setContent("");
    } finally {
      setSending(false);
    }
  };

  return (
    <form className="composer" onSubmit={handleSubmit}>
      <input
        type="text"
        className="composer-input"
        placeholder="Type your message..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={sending}
      />
      <button
        type="submit"
        className="composer-button"
        disabled={!content.trim() || sending}
      >
        {sending ? "Sending..." : "Send"}
      </button>
    </form>
  );
}

export default Composer;

