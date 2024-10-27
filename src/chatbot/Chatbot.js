import React, { useState, useEffect, useRef } from "react";
import "./Chatbot.css";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Reference to the messages container
  const messagesEndRef = useRef(null);

  // Function to handle sending a message
  const sendMessage = async () => {
    if (input.trim()) {
      const newMessages = [...messages, { sender: "user", text: input }];
      setMessages(newMessages);

      try {
        // Make the API request to your FastAPI backend
        const response = await fetch(
          `http://localhost:8001/chat?user_query=${encodeURIComponent(input)}`
        );
        const data = await response.json();

        // Append the bot's response to the chat
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text: data.chatbot_response },
        ]);
      } catch (error) {
        console.error("Error fetching the chatbot response:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text: "Error: Could not get a response." },
        ]);
      }

      // Clear the input field after sending
      setInput("");
    }
  };

  // Handle the "Enter" key press to send the message
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  // Auto-scroll to the bottom of the messages when a new message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {/* This empty div will always be at the bottom to scroll into view */}
        <div ref={messagesEndRef} />
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
