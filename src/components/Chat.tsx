import { useState } from "react";
import { useQuery, useMutation, useAction } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import Composer from "./Composer";
import EmailPanel from "./EmailPanel";
import "./Chat.css";

interface ChatProps {
  threadId: Id<"threads">;
}

function Chat({ threadId }: ChatProps) {
  const messages = useQuery(api.messages.listMessages, { threadId });
  const sendMessage = useMutation(api.messages.sendUserMessage);
  const [showEmailPanel, setShowEmailPanel] = useState(false);

  const handleSendMessage = async (content: string) => {
    await sendMessage({ threadId, content });
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1>Convex AgentMail Chat</h1>
        <button
          className="email-toggle-btn"
          onClick={() => setShowEmailPanel(!showEmailPanel)}
        >
          {showEmailPanel ? "Hide Email" : "Show Email"}
        </button>
      </div>

      <div className="chat-content">
        <div className="messages-container">
          {messages && messages.length === 0 && (
            <div className="empty-state">
              Send a message to start chatting with the agent
            </div>
          )}
          {messages?.map((message) => (
            <div key={message._id} className={`message message-${message.role}`}>
              <div className="message-role">
                {message.role === "user"
                  ? "You"
                  : message.role === "assistant"
                    ? "Agent"
                    : "Email"}
              </div>
              <div className="message-content">
                {message.subject && (
                  <div className="message-subject">
                    <strong>Subject:</strong> {message.subject}
                  </div>
                )}
                {message.from && (
                  <div className="message-from">
                    <strong>From:</strong> {message.from}
                  </div>
                )}
                {message.to && (
                  <div className="message-to">
                    <strong>To:</strong> {message.to}
                  </div>
                )}
                <div className="message-text">{message.content}</div>
              </div>
            </div>
          ))}
        </div>

        <Composer onSend={handleSendMessage} />
      </div>

      {showEmailPanel && <EmailPanel threadId={threadId} />}
    </div>
  );
}

export default Chat;

