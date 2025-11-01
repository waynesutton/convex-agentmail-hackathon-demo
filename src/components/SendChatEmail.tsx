import React, { useState } from "react";
import { useAction } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { Mail } from "lucide-react";
import "./SendChatEmail.css";

interface SendChatEmailProps {
  threadId: Id<"threads">;
}

const SendChatEmail: React.FC<SendChatEmailProps> = ({ threadId }) => {
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  
  const sendChatTranscript = useAction(api.mail.sendChatTranscript);

  const handleSendTranscript = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setMessage({ type: "error", text: "Please enter an email address" });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage({ type: "error", text: "Please enter a valid email address" });
      return;
    }

    setIsSending(true);
    setMessage(null);

    try {
      await sendChatTranscript({
        threadId,
        recipientEmail: email,
      });
      
      setMessage({ type: "success", text: `Chat transcript sent to ${email}!` });
      setEmail("");
      
      // Hide form after 3 seconds
      setTimeout(() => {
        setShowForm(false);
        setMessage(null);
      }, 3000);
    } catch (error) {
      console.error("Failed to send chat transcript:", error);
      setMessage({ type: "error", text: "Failed to send email. Please try again." });
    } finally {
      setIsSending(false);
    }
  };

  if (!showForm) {
    return (
      <button 
        className="send-chat-button" 
        onClick={() => setShowForm(true)}
        title="Send chat transcript to email"
      >
        <Mail size={18} />
        Send Chat to Email
      </button>
    );
  }

  return (
    <div className="send-chat-email-container">
      <div className="send-chat-header">
        <Mail size={18} />
        <h3>Send Chat Transcript</h3>
      </div>
      
      <form onSubmit={handleSendTranscript} className="send-chat-form">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter recipient email"
          disabled={isSending}
          required
          className="email-input"
        />
        
        <div className="button-group">
          <button 
            type="submit" 
            disabled={isSending}
            className="send-button"
          >
            {isSending ? "Sending..." : "Send"}
          </button>
          <button 
            type="button" 
            onClick={() => {
              setShowForm(false);
              setEmail("");
              setMessage(null);
            }}
            disabled={isSending}
            className="cancel-button"
          >
            Cancel
          </button>
        </div>
      </form>

      {message && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
    </div>
  );
};

export default SendChatEmail;

