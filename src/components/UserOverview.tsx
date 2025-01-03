import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './NavBar';  // Importing the global Navbar

interface Transaction {
  id: number;
  type: string;
  amount: number;
}

interface User {
  id: number;
  name: string;
  accountBalance: number;
  recentTransactions?: Transaction[];
}

const UserOverview: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // State for loading

  // Fetch user data dynamically from API
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true); // Set loading to true when fetching
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users/1');
        const mockUser: User = {
          id: response.data.id,
          name: response.data.name,
          accountBalance: 12345.67, // Mocked account balance
          recentTransactions: [
            { id: 1, type: 'Deposit', amount: 500.0 },
            { id: 2, type: 'Withdrawal', amount: 200.0 },
          ],
        };
        setUser(mockUser);
      } catch (error) {
        console.error('Error fetching user data', error);
      } finally {
        setLoading(false); // Set loading to false after fetching is complete
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar included */}
      <Navbar />

      <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-xl transition-all duration-300 hover:shadow-xl mt-8">
        {loading ? (
          <p className="text-center text-gray-600">Loading user data...</p> // Loading state
        ) : user ? (
          <>
            {/* User Overview Section */}
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-semibold text-gray-700 mr-4">
                {user.name ? user.name.charAt(0) : '?'}
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800">{user.name}</h2>
                <p className="text-lg text-gray-600">Account Balance</p>
              </div>
            </div>

            {/* Balance Overview Section */}
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Balance Overview</h3>
              <p className="text-2xl font-bold mt-2">${user.accountBalance.toFixed(2)}</p>
            </div>

            {/* Recent Transactions Section */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-gray-800">Recent Transactions</h3>
              <ul className="mt-4">
                {user.recentTransactions && user.recentTransactions.length > 0 ? (
                  user.recentTransactions.map((transaction) => (
                    <li key={transaction.id} className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-lg">{transaction.type}</span>
                      <span className="text-lg font-semibold">
                        {transaction.type === 'Deposit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                      </span>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-600">No transactions found.</p>
                )}
              </ul>
            </div>

            {/* View Transactions Button */}
            <div className="mt-6">
              <button className="w-full py-3 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition duration-200 focus:outline-none">
                View Transactions
              </button>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-600">Failed to load user data. Please try again later.</p>
        )}
      </div>
    </div>
  );
};

export default UserOverview;



// Your implementation of the TransactionHistory component addresses several of the requirements, particularly under the "Transaction History Section" and "Responsive Design" criteria. Below is a checklist of how it aligns with the given scenario and what could still be added or enhanced:

// 1. User Overview Section:
// ✅ Displays basic user information, including name, account balance, and recent transactions.

// What’s missing:
// A dedicated section for displaying user details such as name and account balance.
// Dynamically fetching and displaying this information from the API.
// 2. Loan Management Section:
// ❌ View loan history and details of currently active loans.

// What’s missing:
// A section for loan history and active loan details.
// A form for requesting new loans with proper input validation (amount, tenure, and purpose).
// 3. Transaction History Section:
// ✅ Render a table showing recent transactions. ✅ Filter by transaction type (credit/debit). ✅ Sort by date, amount, or transaction type.

// What’s missing:
// Sorting functionality by date, amount, or transaction type. Your table supports filtering but does not yet include sorting.
// 4. Responsive Design:
// ✅ Ensure the application is fully responsive.

// What’s missing:
// While your TransactionHistory component uses responsive elements (e.g., flex, rounded-lg, and responsive padding), a more comprehensive test on mobile/tablet layouts is needed to ensure seamless scaling and alignment.
// Technical Requirements:
// Frontend Framework: React with TypeScript
// ✅ You’re using React and TypeScript effectively.

// Styling: Tailwind CSS
// ✅ Tailwind CSS is implemented correctly for styling.

// State Management: React Context API or Redux
// ⚠️ Current state is local (useState) but could be upgraded to a global state solution (e.g., Context API) for better scalability.

// API Integration:
// ✅ Using axios to fetch mock REST API data.
// ⚠️ Extend API calls to include user details and loan data.

// Routing:
// ⚠️ React Router is not yet implemented. Add navigation between the dashboard sections (e.g., User Overview, Loan Management, Transaction History).

// Testing:
// ❌ Unit tests for a React component are not included. Add tests for components like the TransactionHistory table.

// Performance Optimization:
// ⚠️ The application structure seems efficient, but performance optimization (e.g., lazy loading for large components or data pagination) is not yet demonstrated.





// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Navbar from './NavBar';  // Importing the global Navbar

// interface Transaction {
//   id: number;
//   type: string;
//   amount: number;
// }

// interface User {
//   name: string;
//   accountBalance: number;
//   recentTransactions?: Transaction[];
// }

// const UserOverview: React.FC = () => {
//   const [user, setUser] = useState<User | null>(null);

//   // Fetch user data
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get('https://jsonplaceholder.typicode.com/users/1');
//         const mockUser: User = {
//           name: response.data.name,
//           accountBalance: 12345.67, // Mocked account balance
//           recentTransactions: [
//             { id: 1, type: 'Deposit', amount: 500.0 },
//             { id: 2, type: 'Withdrawal', amount: 200.0 },
//           ],
//         };
//         setUser(mockUser);
//       } catch (error) {
//         console.error('Error fetching user data', error);
//       }
//     };

//     fetchUserData();
//   }, []);

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       {/* Navbar included */}
//       <Navbar />

//       <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-xl transition-all duration-300 hover:shadow-xl mt-8">
//         {user ? (
//           <>
//             <div className="flex items-center mb-4">
//               <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-semibold text-gray-700 mr-4">
//                 {user.name ? user.name.charAt(0) : '?'}
//               </div>
//               <div>
//                 <h2 className="text-3xl font-bold text-gray-800">{user.name}</h2>
//                 <p className="text-lg text-gray-600">Account Balance</p>
//               </div>
//             </div>

//             <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-lg shadow-md">
//               <h3 className="text-xl font-semibold">Balance Overview</h3>
//               <p className="text-2xl font-bold mt-2">${user.accountBalance.toFixed(2)}</p>
//             </div>

//             <div className="mt-6">
//               <h3 className="text-xl font-semibold text-gray-800">Recent Transactions</h3>
//               <ul className="mt-4">
//                 {user.recentTransactions && user.recentTransactions.length > 0 ? (
//                   user.recentTransactions.map((transaction) => (
//                     <li key={transaction.id} className="flex justify-between py-2 border-b border-gray-200">
//                       <span className="text-lg">{transaction.type}</span>
//                       <span className="text-lg font-semibold">
//                         {transaction.type === 'Deposit' ? '+' : '-'}${transaction.amount.toFixed(2)}
//                       </span>
//                     </li>
//                   ))
//                 ) : (
//                   <p className="text-gray-600">No transactions found.</p>
//                 )}
//               </ul>
//             </div>

//             <div className="mt-6">
//               <button className="w-full py-3 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition duration-200 focus:outline-none">
//                 View Transactions
//               </button>
//             </div>
//           </>
//         ) : (
//           <p className="text-center text-gray-600">Loading user data...</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserOverview;



// // src/components/UserOverview.tsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// interface User {
//   name: string;
//   accountBalance: number;
// }

// const UserOverview: React.FC = () => {
//   const [user, setUser] = useState<User | null>(null);

//   // Fetch user data from the mock API
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get('https://6776f59280a79bf91900a8b0.mockapi.io/fintech/user/1');
//         setUser(response.data);
//       } catch (error) {
//         console.error("Error fetching user data", error);
//       }
//     };
    
//     fetchUserData();
//   }, []);

//   return (
//     <div className="p-4 bg-white shadow-md rounded-lg">
//       {user ? (
//         <>
//           <h2 className="text-xl font-semibold">{user.name}</h2>
//           <p className="text-gray-600">Account Balance: ${user.accountBalance}</p>
//         </>
//       ) : (
//         <p>Loading user data...</p>
//       )}
//     </div>
//   );
// };

// export default UserOverview;
