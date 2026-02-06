import { EllipsisVertical } from "lucide-react";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

function ChatsHeaderComponent() {
  const { id } = useParams();
  const [dropdownToggle, setDropdownToggle] = useState(false);

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

  const currentUser = userData.find((user) => user.id === id);

  return (
    <div className="bg-white flex items-center h-24.25 justify-between md:px-12 px-6 py-6 border border-t-0 border-l-0 border-gray-200">
      {currentUser ? (
        <>
          <div className="flex items-center gap-5">
            <div className="w-10 h-10">
              <img
                src={currentUser.profileImage}
                alt="IMG"
                className="w-full rounded-full"
              />
            </div>

            <div>
              <h5 className="sm:text-base text-sm font-semibold text-gray-700">
                {currentUser.name}
              </h5>

              {currentUser.status === "1" ? (
                <span className="font-medium text-green-500 text-sm">
                  Online
                </span>
              ) : (
                <span className="font-medium text-gray-500 text-sm">
                  Offline
                </span>
              )}
            </div>
          </div>

          <div className="relative">
            <button
              type="button"
              className="grid place-items-center hover:shadow-md w-10 h-10 rounded-md hover:text-blue-800 transition-all duration-300"
              onClick={() => setDropdownToggle(!dropdownToggle)}
            >
              <EllipsisVertical />
            </button>

            <div
              className={`absolute top-13 -left-25 w-40 z-10 bg-white shadow-lg border border-gray-200 p-1 rounded-md transition-all duration-300 origin-top transform ${
                dropdownToggle
                  ? "scale-y-100 opacity-100"
                  : "scale-y-0 opacity-0"
              }`}
            >
              <Link to={`/user-profile/${currentUser.id}`}>
                <div
                  className="cursor-pointer p-2 hover:bg-blue-50 rounded-md hover:text-blue-700"
                  onClick={() => setDropdownToggle(false)}
                >
                  View Profile
                </div>
              </Link>

              <div
                className="cursor-pointer p-2 hover:bg-blue-50 rounded-md hover:text-blue-700"
                onClick={() => setDropdownToggle(false)}
              >
                Block
              </div>

              <div
                className="cursor-pointer p-2 hover:bg-blue-50 rounded-md hover:text-blue-700"
                onClick={() => setDropdownToggle(false)}
              >
                Delete
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default ChatsHeaderComponent;
