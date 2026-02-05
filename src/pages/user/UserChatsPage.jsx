import React from "react";
import ChatsLayout from './../../layouts/ChatsLayout';

function UserChatsPage() {
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
