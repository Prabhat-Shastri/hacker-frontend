import React, { useState, useEffect, useRef } from "react";
import "./web.css";

function WebSocketChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [ws, setWs] = useState(null); // WebSocket state
  const roleRef = useRef(null); // Store role locally
  const clientIdRef = useRef(null); // Store client id locally

  // Establish WebSocket connection when component mounts
  useEffect(() => {
    const client_id = window.prompt("Enter your ID (1234 for counselor):");
    const role = client_id === "1234" ? "Counselor" : "Student";
    roleRef.current = role; // Store the role
    clientIdRef.current = client_id; // Store the client ID

    const webSocket = new WebSocket(`ws://localhost:8000/ws/${client_id}`);
    setWs(webSocket);

    // Handle incoming WebSocket messages
    webSocket.onmessage = (event) => {
      const message = event.data;
      const sender = message.includes("You wrote:") ? "user" : "bot";
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: sender, text: message, clientId: client_id },
      ]);
    };

    // Cleanup WebSocket connection on unmount
    return () => {
      webSocket.close();
    };
  }, []);

  // Function to send message
  const sendMessage = () => {
    if (input.trim() && ws) {
      setMessages([...messages, { sender: "user", text: input, clientId: clientIdRef.current }]);
      ws.send(input); // Send message to WebSocket
      setInput(""); // Clear input
    }
  };

  // Handle "Enter" key press to send message
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="chatbot-container">
      <h1>Role: {roleRef.current}</h1>
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === "user" ? "sent" : "received"}`}>
            {msg.text.replace(/You wrote: |Counselor says: /gi, "")}{" "}
          </div>
        ))}
      </div>
      <div className="chatbot-input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          className="chatbot-input"
        />
        <button onClick={sendMessage} className="chatbot-send-button">
          Send
        </button>
      </div>
    </div>
  );
}

export default WebSocketChat;
