import React, { useState } from "react";

function ChatsMainComponent() {
  const [msgs, setMsgs] = useState([
    {
      sender: "You",
      msg: "How likely are you to recommend our company to your friends and family?",
    },
    {
      sender: "Arlene McCoy",
      msg: "How likely are you to recommend our company to your friends and family?",
    },
  ]);

  const [inputMsg, setInputMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inputMsg.trim()) return;

    setMsgs((prevMsgs) => [...prevMsgs, { sender: "You", msg: inputMsg }]);

    setInputMsg("");
  };

  return (
    <div className="relative h-screen bg-gray-100">
      {/* -------------------- CHATS -------------------- */}
      <div className="p-6 overflow-y-auto h-140.75">
        {msgs.map((msg, i) => (
          <div
            key={i}
            className={`max-w-lg ${
              msg.sender === "You" ? "ml-auto" : "mr-auto"
            }`}
          >
            <span className="text-[13px] tracking-wide font-montserrat font-semibold">
              {msg.sender}
            </span>
            <div
              className={`mt-1 p-3 rounded-lg shadow-md ${
                msg.sender === "You" ? "bg-blue-900 text-white" : "bg-white"
              }`}
            >
              <p className="text-[15px]">{msg.msg}</p>
            </div>
          </div>
        ))}
      </div>

      {/* -------------------- CHATS INPUT -------------------- */}
      <form
        onSubmit={handleSubmit}
        className="bg-white py-3 px-4 absolute bottom-0 left-0 w-full border-t border-gray-200 flex items-center gap-3 z-10"
      >
        <input
          type="text"
          placeholder="Type a message..."
          value={inputMsg}
          onChange={(e) => setInputMsg(e.target.value)}
          className="w-full rounded-lg px-4 py-2 border-2 border-gray-300 focus:border-blue-800 transition-colors duration-200 ease-in-out"
        />
        <button
          type="submit"
          className="w-[20%] bg-blue-800 hover:bg-blue-900 transition-colors duration-200 ease-in-out h-10.75 rounded-lg text-white font-medium"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatsMainComponent;
