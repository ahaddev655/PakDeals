import React, { useEffect } from "react";
import ChatsLayout from '../../../layouts/ChatsLayout';
import { useNavigate } from "react-router-dom";

function UserChatsPage() {
  // ====================== AUTH CHECK ======================
  const userToken = localStorage.getItem("userToken");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  useEffect(() => {
    if (userToken && userId) {
      return;
    }
    setTimeout(() => {
      navigate("/signup");
    }, 500);
  }, []);
  return (
    <div className="py-6">
      {/* -------------------- HEADING -------------------- */}
      <div className="sm:px-6 px-2.5 space-y-3 mb-6">
        <h1 className="text-3xl font-semibold">Chats</h1>
        <p className="text-gray-500">
          Lorem ipsum dolor sit amet, consectetur.
        </p>
      </div>
      {/* -------------------- CHATS -------------------- */}
      <ChatsLayout />
    </div>
  );
}

export default UserChatsPage;
