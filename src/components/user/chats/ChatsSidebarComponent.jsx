import { Search } from "lucide-react";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

function ChatsSidebarComponent() {
  const [searchQuery, setSearchQuery] = useState("");
  const { id } = useParams();

  const userData = [
    {
      id: "1",
      name: "Muhammad",
      status: "0",
      profileImage: "/assets/profile.jpg",
      activeSince: "10",
    },
    {
      id: "2",
      name: "Ahad",
      status: "1",
      profileImage: "/assets/profile.jpg",
      activeSince: "5",
    },
    {
      id: "3",
      name: "John Doe",
      status: "0",
      profileImage: "/assets/profile.jpg",
      activeSince: "22",
    },
  ];

  return (
    <div className="bg-white md:w-[30%] w-full border-r border-gray-200 min-h-screen">
      <div className="grid place-items-center h-24.25 border-b border-gray-200 p-3">
        <div className="relative w-full">
          <Search className="absolute text-[#7f7f7f] top-2 left-2" />
          <input
            type="text"
            placeholder="Search User Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-2 border-gray-200 rounded-md p-2 text-[15px] pl-10 w-full"
          />
        </div>
      </div>

      <div className="mt-3 px-2 flex flex-col gap-3">
        {userData.length > 0 ? (
          userData
            .filter((user) =>
              user.name.toLowerCase().includes(searchQuery.toLowerCase()),
            )
            .map((user) => (
              <Link key={user.id} to={`/user-dashboard/chats/${user.id}`}>
                <div
                  className={`flex items-center gap-3 rounded-lg p-4 cursor-pointer transition-colors duration-200 ${
                    id === user.id
                      ? "bg-blue-50 border-r-4 border-blue-800"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="w-10 h-10 relative">
                    <img
                      src={user.profileImage}
                      alt="profile"
                      className="w-10 h-10 rounded-full"
                    />

                    {user.status === "1" ? (
                      <div className="bg-green-500 rounded-full border-2 border-white w-2.5 h-2.5 absolute bottom-0.5 right-0" />
                    ) : (
                      <div className="bg-gray-500 rounded-full border-2 border-white w-2.5 h-2.5 absolute bottom-0.5 right-0" />
                    )}
                  </div>

                  <div className="flex-1">
                    <h6 className="text-sm font-semibold text-gray-700">
                      {user.name}
                    </h6>

                    {user.status === "1" ? (
                      <p className="text-xs text-green-500">Online</p>
                    ) : (
                      <p className="text-xs text-gray-500">Offline</p>
                    )}
                  </div>

                  <h6 className="text-xs text-gray-600 font-medium tracking-wide">
                    {user.activeSince}mins
                  </h6>
                </div>
              </Link>
            ))
        ) : (
          <p className="text-center text-sm text-gray-700 py-3">
            No users added
          </p>
        )}
      </div>
    </div>
  );
}

export default ChatsSidebarComponent;
