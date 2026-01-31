import React from "react";

function MainFooter() {
  return (
    <footer className="md:px-12 mt-auto sm:px-6 px-2.5 py-2 bg-linear-to-r from-blue-900 via-blue-900 to-blue-950 text-white font-medium sm:flex text-center items-center justify-between">
      <p>Built with &hearts; by PakDeals</p>
      <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
    </footer>
  );
}

export default MainFooter;
