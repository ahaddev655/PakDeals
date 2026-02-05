import React from "react";
import ChatsSidebarComponent from "../components/user/chats/ChatsSidebarComponent";
import ChatsHeaderComponent from "../components/user/chats/ChatsHeaderComponent";
import { Outlet } from "react-router-dom";

function ChatsLayout() {
  return (
    <div className="flex border-t border-gray-200 h-screen">
      <ChatsSidebarComponent />
      <div className="md:w-[70%] w-full flex flex-col">
        <ChatsHeaderComponent />
        <Outlet />
      </div>
    </div>
  );
}

export default ChatsLayout;
