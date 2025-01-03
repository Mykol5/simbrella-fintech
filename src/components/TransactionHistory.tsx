import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './NavBar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Transaction {
  id: number;
  date: string;
  amount: number;
  type: string;
}

const TransactionHistory: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filterType, setFilterType] = useState<string>('all');
  const [sortKey, setSortKey] = useState<string>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        const transactionData: Transaction[] = response.data.slice(0, 10).map((item: { id: any }, index: number) => ({
          id: item.id,
          date: new Date().toISOString().split('T')[0],
          amount: parseFloat((Math.random() * 1000).toFixed(2)),
          type: index % 2 === 0 ? 'credit' : 'debit',
        }));
        setTransactions(transactionData);
      } catch (error) {
        console.error('Error fetching transactions', error);
      }
    };

    fetchTransactions();
  }, []);

  const filteredTransactions = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    if (startDate && endDate) {
      return transactionDate >= startDate && transactionDate <= endDate;
    }
    return filterType === 'all' || transaction.type === filterType;
  });

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortKey === 'date') {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    } else if (sortKey === 'amount') {
      return sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount;
    } else if (sortKey === 'type') {
      return sortOrder === 'asc'
        ? a.type.localeCompare(b.type)
        : b.type.localeCompare(a.type);
    }
    return 0;
  });

  const handleSort = (key: string) => {
    if (key === sortKey) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const formatAmount = (amount: number): string => `$${amount.toFixed(2)}`;

  return (
    <div>
      <Navbar />
      <div className="p-6 bg-white shadow-lg rounded-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Transaction History</h2>
        </div>
        <div className="flex flex-wrap sm:flex-row sm:space-x-4 justify-between sm:space-y-0 space-y-4 mb-6">
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            <label htmlFor="filter" className="text-gray-600 font-medium">Filter by Type:</label>
            <select
              id="filter"
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All</option>
              <option value="credit">Credit</option>
              <option value="debit">Debit</option>
            </select>
          </div>
          <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-4 sm:space-y-0 space-y-4">
            <div>
              <label className="text-gray-600 font-medium">Select Date Range:</label>
              <div className="flex space-x-4">
                <DatePicker
                  selected={startDate}
                  onChange={(date: Date | null) => setStartDate(date)}
                  dateFormat="yyyy/MM/dd"
                  placeholderText="Start Date"
                />
                <DatePicker
                  selected={endDate}
                  onChange={(date: Date | null) => setEndDate(date)}
                  dateFormat="yyyy/MM/dd"
                  placeholderText="End Date"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-hidden border border-gray-200 rounded-lg shadow-md">
          <table className="min-w-full bg-white divide-y divide-gray-200">
            <thead className="bg-purple-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium cursor-pointer" onClick={() => handleSort('date')}>Date</th>
                <th className="px-6 py-3 text-left text-sm font-medium cursor-pointer" onClick={() => handleSort('amount')}>Amount</th>
                <th className="px-6 py-3 text-left text-sm font-medium cursor-pointer" onClick={() => handleSort('type')}>Type</th>
              </tr>
            </thead>
            <tbody className="text-gray-800 divide-y divide-gray-200">
              {sortedTransactions.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-4 text-center text-gray-500">No transactions found</td>
                </tr>
              ) : (
                sortedTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-3">{transaction.date}</td>
                    <td className="px-6 py-3 font-semibold">{formatAmount(transaction.amount)}</td>
                    <td className="px-6 py-3">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${transaction.type === 'credit' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Navbar from './NavBar';
// import DatePicker from 'react-datepicker'; // Assuming you use react-datepicker

// import 'react-datepicker/dist/react-datepicker.css';

// interface Transaction {
//   id: number;
//   date: string;
//   amount: number;
//   type: string;
// }

// const TransactionHistory: React.FC = () => {
//   const [transactions, setTransactions] = useState<Transaction[]>([]);
//   const [filterType, setFilterType] = useState<string>('all');
//   const [sortKey, setSortKey] = useState<string>('date');
//   const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
//   const [startDate, setStartDate] = useState<Date | null>(null); // start date for filter
//   const [endDate, setEndDate] = useState<Date | null>(null); // end date for filter

//   useEffect(() => {
//     const fetchTransactions = async () => {
//       try {
//         const response = await axios.get('https://jsonplaceholder.typicode.com/posts');

//         const transactionData: Transaction[] = response.data.slice(0, 10).map((item: { id: any }, index: number) => ({
//           id: item.id,
//           date: new Date().toISOString().split('T')[0],
//           amount: parseFloat((Math.random() * 1000).toFixed(2)),
//           type: index % 2 === 0 ? 'credit' : 'debit',
//         }));

//         setTransactions(transactionData);
//       } catch (error) {
//         console.error('Error fetching transactions', error);
//       }
//     };

//     fetchTransactions();
//   }, []);

//   const filteredTransactions = transactions.filter((transaction) => {
//     const transactionDate = new Date(transaction.date);
//     if (startDate && endDate) {
//       return transactionDate >= startDate && transactionDate <= endDate;
//     }
//     return filterType === 'all' || transaction.type === filterType;
//   });

//   const sortedTransactions = [...filteredTransactions].sort((a, b) => {
//     if (sortKey === 'date') {
//       const dateA = new Date(a.date);
//       const dateB = new Date(b.date);
//       return sortOrder === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
//     } else if (sortKey === 'amount') {
//       return sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount;
//     } else if (sortKey === 'type') {
//       return sortOrder === 'asc'
//         ? a.type.localeCompare(b.type)
//         : b.type.localeCompare(a.type);
//     }
//     return 0;
//   });

//   const handleSort = (key: string) => {
//     if (key === sortKey) {
//       setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
//     } else {
//       setSortKey(key);
//       setSortOrder('asc');
//     }
//   };

//   const formatAmount = (amount: number): string => `$${amount.toFixed(2)}`;

//   return (
//     <div>
//       <Navbar />
//       <div className="p-6 bg-white shadow-lg rounded-xl">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold text-gray-800">Transaction History</h2>
//         </div>
        
//         {/* Filter Section */}
//         <div className="flex flex-wrap sm:flex-row sm:space-x-4 justify-between sm:space-y-0 space-y-4 mb-6">
//           <div className="flex items-center space-x-4 mb-4 sm:mb-0">
//             <label htmlFor="filter" className="text-gray-600 font-medium">
//               Filter by Type:
//             </label>
//             <select
//               id="filter"
//               className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={filterType}
//               onChange={(e) => setFilterType(e.target.value)}
//             >
//               <option value="all">All</option>
//               <option value="credit">Credit</option>
//               <option value="debit">Debit</option>
//             </select>
//           </div>

//           {/* Date Range Filter */}
//           <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-4 sm:space-y-0 space-y-4">
//             <div>
//               <label className="text-gray-600 font-medium">Select Date Range:</label>
//               <div className="flex space-x-4">
//                 <DatePicker
//                   selected={startDate}
//                   onChange={(date: Date | null) => setStartDate(date)}
//                   dateFormat="yyyy/MM/dd"
//                   placeholderText="Start Date"
//                 />
//                 <DatePicker
//                   selected={endDate}
//                   onChange={(date: Date | null) => setEndDate(date)}
//                   dateFormat="yyyy/MM/dd"
//                   placeholderText="End Date"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Transaction Table */}
//         <div className="overflow-hidden border border-gray-200 rounded-lg shadow-md">
//           <table className="min-w-full bg-white divide-y divide-gray-200">
//             <thead className="bg-purple-600 text-white">
//               <tr>
//                 <th className="px-6 py-3 text-left text-sm font-medium cursor-pointer" onClick={() => handleSort('date')}>
//                   Date
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-medium cursor-pointer" onClick={() => handleSort('amount')}>
//                   Amount
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-medium cursor-pointer" onClick={() => handleSort('type')}>
//                   Type
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="text-gray-800 divide-y divide-gray-200">
//               {sortedTransactions.length === 0 ? (
//                 <tr>
//                   <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
//                     No transactions found
//                   </td>
//                 </tr>
//               ) : (
//                 sortedTransactions.map((transaction) => (
//                   <tr key={transaction.id} className="hover:bg-gray-50">
//                     <td className="px-6 py-3">{transaction.date}</td>
//                     <td className="px-6 py-3 font-semibold">{formatAmount(transaction.amount)}</td>
//                     <td className="px-6 py-3">
//                       <span
//                         className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
//                           transaction.type === 'credit' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//                         }`}
//                       >
//                         {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
//                       </span>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TransactionHistory;






// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Navbar from './NavBar';

// interface Transaction {
//   id: number;
//   date: string;
//   amount: number; // Amount should be a number
//   type: string;
// }

// const TransactionHistory: React.FC = () => {
//   const [transactions, setTransactions] = useState<Transaction[]>([]);
//   const [filterType, setFilterType] = useState<string>('all');
//   const [sortKey, setSortKey] = useState<string>('date'); // Default sort by 'date'
//   const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); // Default ascending order

//   // Fetch mock transaction data
//   useEffect(() => {
//     const fetchTransactions = async () => {
//       try {
//         const response = await axios.get('https://jsonplaceholder.typicode.com/posts');

//         // Simulate transaction data
//         const transactionData: Transaction[] = response.data.slice(0, 10).map((item: { id: any }, index: number) => ({
//           id: item.id,
//           date: new Date().toISOString().split('T')[0], // Current date
//           amount: parseFloat((Math.random() * 1000).toFixed(2)), // Random amount as number
//           type: index % 2 === 0 ? 'credit' : 'debit', // Alternate types
//         }));

//         setTransactions(transactionData);
//       } catch (error) {
//         console.error('Error fetching transactions', error);
//       }
//     };

//     fetchTransactions();
//   }, []);

//   // Filter transactions
//   const filteredTransactions = transactions.filter(
//     (transaction) => filterType === 'all' || transaction.type === filterType
//   );

//   // Sort transactions based on sortKey and sortOrder
//   const sortedTransactions = [...filteredTransactions].sort((a, b) => {
//     if (sortKey === 'date') {
//       const dateA = new Date(a.date);
//       const dateB = new Date(b.date);
//       return sortOrder === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
//     } else if (sortKey === 'amount') {
//       return sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount;
//     } else if (sortKey === 'type') {
//       return sortOrder === 'asc'
//         ? a.type.localeCompare(b.type)
//         : b.type.localeCompare(a.type);
//     }
//     return 0;
//   });

//   // Handle sorting when header is clicked
//   const handleSort = (key: string) => {
//     if (key === sortKey) {
//       // Reverse the sort order if the same column is clicked
//       setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
//     } else {
//       // Set the new sort key and reset to ascending order
//       setSortKey(key);
//       setSortOrder('asc');
//     }
//   };

//   // Format amount
//   const formatAmount = (amount: number): string => `$${amount.toFixed(2)}`;

//   return (
//     <div>
//       {/* Global Navbar */}
//       <Navbar />

//       {/* Transaction History Section */}
//       <div className="p-6 bg-white shadow-lg rounded-xl">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold text-gray-800">Transaction History</h2>
//           <div className="flex items-center space-x-4">
//             <label htmlFor="filter" className="text-gray-600 font-medium">
//               Filter by Type:
//             </label>
//             <select
//               id="filter"
//               className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={filterType}
//               onChange={(e) => setFilterType(e.target.value)}
//             >
//               <option value="all">All</option>
//               <option value="credit">Credit</option>
//               <option value="debit">Debit</option>
//             </select>
//           </div>
//         </div>

//         <div className="overflow-hidden border border-gray-200 rounded-lg shadow-md">
//           <table className="min-w-full bg-white divide-y divide-gray-200">
//             <thead className="bg-purple-600 text-white">
//               <tr>
//                 <th
//                   className="px-6 py-3 text-left text-sm font-medium cursor-pointer"
//                   onClick={() => handleSort('date')}
//                 >
//                   Date
//                 </th>
//                 <th
//                   className="px-6 py-3 text-left text-sm font-medium cursor-pointer"
//                   onClick={() => handleSort('amount')}
//                 >
//                   Amount
//                 </th>
//                 <th
//                   className="px-6 py-3 text-left text-sm font-medium cursor-pointer"
//                   onClick={() => handleSort('type')}
//                 >
//                   Type
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="text-gray-800 divide-y divide-gray-200">
//               {sortedTransactions.length === 0 ? (
//                 <tr>
//                   <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
//                     No transactions found
//                   </td>
//                 </tr>
//               ) : (
//                 sortedTransactions.map((transaction) => (
//                   <tr key={transaction.id} className="hover:bg-gray-50">
//                     <td className="px-6 py-3">{transaction.date}</td>
//                     <td className="px-6 py-3 font-semibold">
//                       {formatAmount(transaction.amount)}
//                     </td>
//                     <td className="px-6 py-3">
//                       <span
//                         className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
//                           transaction.type === 'credit'
//                             ? 'bg-green-100 text-green-800'
//                             : 'bg-red-100 text-red-800'
//                         }`}
//                       >
//                         {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
//                       </span>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TransactionHistory;
