import { useState } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);
    setInput("");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [...messages, userMessage] }),
    });

    const data = await res.json();
    setMessages([...messages, userMessage, { role: "assistant", content: data.reply }]);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Paradise Realty FLA AI Assistant</h1>
      <div style={{ border: "1px solid #ccc", padding: 10, height: 300, overflowY: "scroll" }}>
        {messages.map((m, i) => (
          <p key={i}><b>{m.role}:</b> {m.content}</p>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: "80%" }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}