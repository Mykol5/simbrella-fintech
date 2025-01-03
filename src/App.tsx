// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import UserOverview from './components/UserOverview';
import LoanManagement from './components/LoanManagement';
import TransactionHistory from './components/TransactionHistory';
import Navbar from './components/NavBar';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* Global Navbar for other pages */}
        <Route path="/*" element={<Navbar />} />
                
        <Route path="/user-overview" element={<UserOverview />} />
        <Route path="/loan-management" element={<LoanManagement />} />
        <Route path="/transaction-history" element={<TransactionHistory />} />
      </Routes>
    </Router>
  );
};

export default App;






// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
