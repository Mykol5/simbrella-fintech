import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-purple-800 relative">
      <h1 className="text-3xl font-extrabold tracking-wide text-white">FintechPro</h1>

      {/* Desktop Menu */}
      <nav className="hidden md:flex space-x-6">
        <Link to="/" className="hover:underline text-white">Home</Link>
        <Link to="/user-overview" className="hover:underline text-white">User Overview</Link>
        <Link to="/loan-management" className="hover:underline text-white">Loan Management</Link>
        <Link to="/transaction-history" className="hover:underline text-white">Transaction History</Link>
      </nav>

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden text-white text-2xl focus:outline-none"
      >
        {menuOpen ? '✖' : '☰'}
      </button>

      {/* Mobile Menu (Fullscreen Overlay) */}
      {menuOpen && (
        <div className="absolute top-0 left-0 w-full h-screen bg-purple-900 z-50 flex flex-col items-center justify-center space-y-6">
          <button
            onClick={() => setMenuOpen(false)}  // Close the menu when clicked
            className="absolute top-4 right-4 text-white text-3xl"
          >
            ✖
          </button>
          <Link
            to="/"
            className="text-xl hover:text-purple-300 text-white"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/user-overview"
            className="text-xl hover:text-purple-300 text-white"
            onClick={() => setMenuOpen(false)}
          >
            User Overview
          </Link>
          <Link
            to="/loan-management"
            className="text-xl hover:text-purple-300 text-white"
            onClick={() => setMenuOpen(false)}
          >
            Loan Management
          </Link>
          <Link
            to="/transaction-history"
            className="text-xl hover:text-purple-300 text-white"
            onClick={() => setMenuOpen(false)}
          >
            Transaction History
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;




// import { Link } from 'react-router-dom';

// const Navbar: React.FC = () => {
//   return (
//     <header className="flex items-center justify-between px-8 py-4 bg-purple-800">
//       <h1 className="text-3xl font-extrabold tracking-wide">FintechPro</h1>
//       <nav className="space-x-6">
//         <Link to="/user-overview" className="hover:text-purple-300">User Overview</Link>
//         <Link to="/loan-management" className="hover:text-purple-300">Loan Management</Link>
//         <Link to="/transaction-history" className="hover:text-purple-300">Transaction History</Link>
//       </nav>
//     </header>
//   );
// };

// export default Navbar;
