import React, { useState } from "react";
import "./Chatbot.css";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Handle sending a message
  const sendMessage = async () => {
    if (input.trim()) {
      // Display the user's message on the chat interface
      const newMessages = [...messages, { sender: "user", text: input }];
      setMessages(newMessages);

      // Simulate a response
      const response = "This is a test response from the chatbot.";
      setMessages([...newMessages, { sender: "bot", text: response }]);
      setInput("");
    }
  };

  // Handle the "Enter" key to send the message
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
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

export default Chatbot;
