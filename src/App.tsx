import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { Id } from "../convex/_generated/dataModel";
import Chat from "./components/Chat";
import Docs from "./components/Docs";
import Changelog from "./components/Changelog";
import "./App.css";

function ChatPage() {
  const [threadId, setThreadId] = useState<Id<"threads"> | null>(null);
  const createThread = useMutation(api.messages.createThread);

  // Initialize thread on mount
  useEffect(() => {
    const initThread = async () => {
      const id = await createThread();
      setThreadId(id);
    };
    initThread();
  }, [createThread]);

  if (!threadId) {
    return (
      <div className="app-container">
        <div className="loading">Initializing chat...</div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="app-header">
        <div className="header-left">
          <Link to="/docs" className="header-link">Documentation</Link>
        </div>
        <div className="header-right">
          <Link to="/" className="header-link">Home</Link>
        </div>
      </div>
      <Chat threadId={threadId} />
      <div className="app-footer">
        <p>
          Powered by{" "}
          <a href="https://convex.dev" target="_blank" rel="noopener noreferrer">
            Convex
          </a>
        </p>
        <p>
          <a 
            href="https://github.com/waynesutton/convex-agentmail-hackathon-demo" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Open Source on GitHub
          </a>
        </p>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/changelog" element={<Changelog />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

