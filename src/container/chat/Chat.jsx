import "./chat.css";
import logo from "../../assets/shoptalk.png";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { routes } from "../../routes/routes";

const Chat = () => {
  const msgScrollerRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [productId, setProductId] = useState("");
  const [messages, setMessages] = useState([
    {
      author: "bot",
      message: "Hey, How can I help you?",
    },
  ]);
  useEffect(() => {
    // Scroll to the bottom when messages change
    const productId = localStorage.getItem("productId");
    setProductId(productId);
    if (msgScrollerRef.current) {
      msgScrollerRef.current.scrollTop = msgScrollerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (inputValue.trim() === "") return;

    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer secret_token",
    };

    try {
      setMessages((prev) => [
        ...prev,
        { author: "user", message: inputValue },
        { author: "bot", message: "Thinking..." },
      ]);
      setInputValue("");

      const reply = await axios.post(
        `${routes.chat}/api/chat`,
        {
          message: inputValue,
          id: productId,
        },
        {
          headers,
        }
      );

      setMessages((prev) => {
        // Replace the loading message with the actual reply
        const updatedMessages = [...prev];
        updatedMessages.pop(); // Remove the loading message
        return [
          ...updatedMessages,
          { author: "bot", message: reply.data.message },
        ];
      });
    } catch (error) {
      console.log(error);
      // Handle errors if necessary
    }
  };

  return (
    <div className="Chat">
      <div className="chat-nav">
        <img src={logo} alt="" className="chat-nav-logo" />
        <div className="chat-nav-title">ShopTalk Bot</div>
      </div>
      <div className="msg-scroller" ref={msgScrollerRef}>
        {messages.map((msg, i) => (
          <div
            className={`msg-wrapper ${
              msg.author !== "bot" ? "user-msg" : "bot-msg"
            }`}
            key={i}
          >
            <div
              className={`msg ${msg.author !== "bot" ? "user-msg" : "bot-msg"}`}
            >
              {msg.message}
            </div>
          </div>
        ))}
      </div>
      <div className="chat-bottom">
        <input
          className="chat-input"
          placeholder="Ask queries...."
          value={inputValue}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="send-btn" onClick={() => handleSend()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="bi bi-send-fill"
            viewBox="0 0 16 16"
          >
            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Chat;
