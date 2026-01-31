import React from "react";

function UserFooterComponent() {
  return (
    <div className="border-t-2 border-gray-300 page py-4! text-gray-500">
      <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
    </div>
  );
}

export default UserFooterComponent;
