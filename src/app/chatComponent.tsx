"use client";
import { useState } from "react";
import Link from "next/link";
export default function Chat({ diseases, responses }: { diseases: string[]; responses: Record<string, string>; }) {
  const [chatHistory, setChatHistory] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChat = async () => {
    if (!input.trim()) return;
    if (!input.trim()) return;
    setLoading(true);
    const updatedHistory = [...chatHistory, { role: "user", content: input }];
    try {
      const res = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ diseases, responses, chat_history: updatedHistory })
      });
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      setChatHistory([...updatedHistory,{ role: "bot", content: data.response }]);
    } catch (error) {
      console.error("Chat Request Failed:", error);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">AI Chat</h2>
      <div className="border p-4 mt-2 bg-gray-100 rounded-lg max-h-64 overflow-y-auto">
        {chatHistory.map((msg, index) => (
          <p key={index} className={msg.role === "bot" ? "text-blue-700" : "text-black"}>
            <strong>{msg.role === "bot" ? "AI:" : "You:"}</strong> {msg.content}
          </p>
        ))}
      </div>
      <input
        className="border p-2 w-full mt-2"
        placeholder="Ask something..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="bg-purple-500 text-white px-4 py-2 mt-2" onClick={handleChat} disabled={loading}>
        {loading ? "Thinking..." : "Send"}
      </button>
      
      {/* Buttons for Separate Pages */}
      <div className="mt-4 flex gap-4">
      <Link
          href={`/pages/diet?disease=${encodeURIComponent(diseases.join(','))}&responses=${encodeURIComponent(JSON.stringify(responses))}`}
        >
          <button className="bg-green-500 text-white px-4 py-2">View Diet Chart</button>
        </Link>
      
        <Link href="/pages/recovery">
          <button className="bg-blue-500 text-white px-4 py-2">Recovery Suggestions</button>
        </Link>
      </div>
    </div>
  );
}