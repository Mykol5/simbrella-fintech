// components/LandingPage.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 via-purple-600 to-indigo-900 text-white flex flex-col">
      {/* Header / Navbar */}
      <header className="flex items-center justify-between px-8 py-4 bg-purple-800">
        <h1 className="text-3xl font-extrabold tracking-wide">FintechPro</h1>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/user-overview" className="hover:text-purple-300">User Overview</Link>
          <Link to="/loan-management" className="hover:text-purple-300">Loan Management</Link>
          <Link to="/transaction-history" className="hover:text-purple-300">Transaction History</Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl focus:outline-none"
        >
          {menuOpen ? '✖' : '☰'}
        </button>
      </header>

      {/* Mobile Menu (Fullscreen Overlay) */}
      {menuOpen && (
        <div className="absolute top-0 left-0 w-full h-screen bg-purple-900 z-50 flex flex-col items-center justify-center space-y-6">
          <Link
            to="/user-overview"
            className="text-xl hover:text-purple-300"
            onClick={() => setMenuOpen(false)}
          >
            User Overview
          </Link>
          <Link
            to="/loan-management"
            className="text-xl hover:text-purple-300"
            onClick={() => setMenuOpen(false)}
          >
            Loan Management
          </Link>
          <Link
            to="/transaction-history"
            className="text-xl hover:text-purple-300"
            onClick={() => setMenuOpen(false)}
          >
            Transaction History
          </Link>
        </div>
      )}

      {/* Hero Section */}
      <main className="flex flex-1 flex-col items-center justify-center text-center px-4">
        <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          Manage Your <span className="text-purple-400">Finances</span> Like a Pro
        </h2>
        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl">
          Seamlessly track transactions, manage loans, and keep an overview of your financial health—all in one place.
        </p>
        <div className="flex space-x-4">
          <Link
            to="/user-overview"
            className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg shadow-md transition-all duration-300 text-sm md:text-base"
          >
            Get Started
          </Link>
          <Link
            to="/loan-management"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-md transition-all duration-300 text-sm md:text-base"
          >
            Explore Features
          </Link>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="bg-white text-gray-900 py-16 px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-blue-700 text-white flex items-center justify-center rounded-full mb-4">
              💳
            </div>
            <h3 className="text-lg font-semibold mb-2">User Overview</h3>
            <p>Stay updated with your account balance and recent transactions.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-green-600 text-white flex items-center justify-center rounded-full mb-4">
              🏦
            </div>
            <h3 className="text-lg font-semibold mb-2">Loan Management</h3>
            <p>Manage active loans and request new ones easily.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-purple-600 text-white flex items-center justify-center rounded-full mb-4">
              📊
            </div>
            <h3 className="text-lg font-semibold mb-2">Transaction History</h3>
            <p>Analyze and filter your transactions seamlessly.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} FintechPro. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;







// // components/LandingPage.tsx
// import React from 'react';
// import { Link } from 'react-router-dom';

// const LandingPage: React.FC = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-700 via-purple-600 to-indigo-900 text-white flex flex-col">
//       {/* Header */}
//       <header className="flex justify-between items-center px-8 py-6">
//         <h1 className="text-3xl font-extrabold tracking-wide">FintechPro</h1>
//         <nav className="flex space-x-6">
//           <a href="#about" className="hover:text-purple-300">About</a>
//           <a href="#features" className="hover:text-purple-300">Features</a>
//           <a href="#contact" className="hover:text-purple-300">Contact</a>
//         </nav>
//       </header>

//       {/* Hero Section */}
//       <main className="flex flex-1 flex-col items-center justify-center text-center px-4">
//         <h2 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
//           Manage Your <span className="text-purple-400">Finances</span> Like a Pro
//         </h2>
//         <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl">
//           Seamlessly track transactions, manage loans, and keep an overview of your financial health—all in one place.
//         </p>
//         <div className="flex space-x-4">
//           <Link
//             to="/user-overview"
//             className="px-8 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg shadow-md transition-all duration-300"
//           >
//             Get Started
//           </Link>
//           <Link
//             to="/loan-management"
//             className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-md transition-all duration-300"
//           >
//             Explore Features
//           </Link>
//         </div>
//       </main>

//       {/* Features Section */}
//       <section id="features" className="bg-white text-gray-900 py-20 px-8">
//         <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
//           <div className="flex flex-col items-center text-center">
//             <div className="w-16 h-16 bg-blue-700 text-white flex items-center justify-center rounded-full mb-4">
//               💳
//             </div>
//             <h3 className="text-xl font-semibold mb-2">User Overview</h3>
//             <p>Stay updated with your account balance and recent transactions.</p>
//           </div>
//           <div className="flex flex-col items-center text-center">
//             <div className="w-16 h-16 bg-green-600 text-white flex items-center justify-center rounded-full mb-4">
//               🏦
//             </div>
//             <h3 className="text-xl font-semibold mb-2">Loan Management</h3>
//             <p>Manage active loans and request new ones easily.</p>
//           </div>
//           <div className="flex flex-col items-center text-center">
//             <div className="w-16 h-16 bg-purple-600 text-white flex items-center justify-center rounded-full mb-4">
//               📊
//             </div>
//             <h3 className="text-xl font-semibold mb-2">Transaction History</h3>
//             <p>Analyze and filter your transactions seamlessly.</p>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 py-8 text-center text-gray-400">
//         <p>&copy; {new Date().getFullYear()} FintechPro. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default LandingPage;

