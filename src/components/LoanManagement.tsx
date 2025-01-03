// src/components/LoanManagement.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './NavBar'; // Import Navbar component

interface Loan {
  id: number;
  amount: number;
  tenure: number;
  purpose: string;
  status: string; // 'active', 'paid'
  dateRequested?: string; // Optional dateRequested property
}

const LoanManagement: React.FC = () => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [amount, setAmount] = useState<number>(0);
  const [tenure, setTenure] = useState<number>(0);
  const [purpose, setPurpose] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch loan data from the mock API
  useEffect(() => {
    const fetchLoanData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts'); // Replace with mock API
        // Map response to match Loan interface
        const formattedLoans = response.data.slice(0, 5).map((item: any) => ({
          id: item.id,
          amount: Math.floor(Math.random() * 10000 + 1000),
          tenure: Math.floor(Math.random() * 12 + 1),
          purpose: `Purpose ${item.id}`,
          status: item.id % 2 === 0 ? 'active' : 'paid',
          dateRequested: item.dateRequested, // Mock dateRequested
        }));
        setLoans(formattedLoans);
      } catch (error) {
        console.error('Error fetching loan data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLoanData();
  }, []);

  // Handle loan request submission
  const handleLoanRequest = async () => {
    if (!amount || !tenure || !purpose) {
      alert('Please fill all fields before submitting!');
      return;
    }

    try {
      setLoading(true);
      const newLoan = {
        id: loans.length + 1,
        amount,
        tenure,
        purpose,
        status: 'active',
        dateRequested: new Date().toISOString(), // Adding current date as requested date
      };
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', newLoan);
      setLoans([...loans, response.data]);
      setAmount(0);
      setTenure(0);
      setPurpose('');
    } catch (error) {
      console.error('Error submitting loan request', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar /> {/* Include Navbar here */}

      <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto mt-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Loan Management</h2>

        {/* Loan Request Form */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Request a New Loan</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="number"
              className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value))}
            />
            <input
              type="number"
              className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Tenure (months)"
              value={tenure}
              onChange={(e) => setTenure(parseInt(e.target.value))}
            />
            <input
              type="text"
              className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Purpose"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
            />
          </div>
          <button
            onClick={handleLoanRequest}
            className="mt-4 w-full bg-purple-600 text-white py-3 rounded-lg shadow-md hover:bg-purple-500 transition duration-200 focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Request Loan'}
          </button>
        </div>

        {/* Loan History Section */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Active Loans</h3>
          <div className="bg-white shadow-md rounded-lg p-6">
            {loans.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {loans.map((loan) => {
                  const loanDate = loan.dateRequested
                    ? new Date(loan.dateRequested)
                    : new Date(); // Handle dateRequested and fallback to current date

                  return (
                    <li key={loan.id} className="py-4 flex justify-between items-center">
                      <div>
                        <p className="text-gray-800 font-medium">Amount: ${loan.amount}</p>
                        <p className="text-gray-600">Tenure: {loan.tenure} months</p>
                        <p className="text-gray-600">Purpose: {loan.purpose}</p>
                        <p className="text-gray-600">Date Requested: {loanDate.toLocaleDateString()}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          loan.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {loan.status === 'active' ? 'Active' : 'Paid'}
                      </span>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-gray-600 text-center">No active loans found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanManagement;







// // src/components/LoanManagement.tsx
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Navbar from './NavBar'; // Import Navbar component

// interface Loan {
//   id: number;
//   amount: number;
//   tenure: number;
//   purpose: string;
//   status: string; // 'active', 'paid'
// }

// const LoanManagement: React.FC = () => {
//   const [loans, setLoans] = useState<Loan[]>([]);
//   const [amount, setAmount] = useState<number>(0);
//   const [tenure, setTenure] = useState<number>(0);
//   const [purpose, setPurpose] = useState<string>('');
//   const [loading, setLoading] = useState<boolean>(false);

//   // Fetch loan data from the mock API
//   useEffect(() => {
//     const fetchLoanData = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get('https://jsonplaceholder.typicode.com/posts'); // Replace with mock API
//         // Map response to match Loan interface
//         const formattedLoans = response.data.slice(0, 5).map((item: any) => ({
//           id: item.id,
//           amount: Math.floor(Math.random() * 10000 + 1000),
//           tenure: Math.floor(Math.random() * 12 + 1),
//           purpose: `Purpose ${item.id}`,
//           status: item.id % 2 === 0 ? 'active' : 'paid',
//         }));
//         setLoans(formattedLoans);
//       } catch (error) {
//         console.error('Error fetching loan data', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLoanData();
//   }, []);

//   // Handle loan request submission
//   const handleLoanRequest = async () => {
//     if (!amount || !tenure || !purpose) {
//       alert('Please fill all fields before submitting!');
//       return;
//     }

//     try {
//       setLoading(true);
//       const newLoan = {
//         id: loans.length + 1,
//         amount,
//         tenure,
//         purpose,
//         status: 'active',
//       };
//       const response = await axios.post('https://jsonplaceholder.typicode.com/posts', newLoan);
//       setLoans([...loans, response.data]);
//       setAmount(0);
//       setTenure(0);
//       setPurpose('');
//     } catch (error) {
//       console.error('Error submitting loan request', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <Navbar /> {/* Include Navbar here */}

//       <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto mt-6">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6">Loan Management</h2>

//         {/* Loan Request Form */}
//         <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
//           <h3 className="text-xl font-semibold text-gray-700 mb-4">Request a New Loan</h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <input
//               type="number"
//               className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//               placeholder="Amount"
//               value={amount}
//               onChange={(e) => setAmount(parseInt(e.target.value))}
//             />
//             <input
//               type="number"
//               className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//               placeholder="Tenure (months)"
//               value={tenure}
//               onChange={(e) => setTenure(parseInt(e.target.value))}
//             />
//             <input
//               type="text"
//               className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//               placeholder="Purpose"
//               value={purpose}
//               onChange={(e) => setPurpose(e.target.value)}
//             />
//           </div>
//           <button
//             onClick={handleLoanRequest}
//             className="mt-4 w-full bg-blue-500 text-white py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-200 focus:ring-2 focus:ring-blue-500"
//             disabled={loading}
//           >
//             {loading ? 'Submitting...' : 'Request Loan'}
//           </button>
//         </div>

//         {/* Loan History Section */}
//         <div>
//           <h3 className="text-xl font-semibold text-gray-700 mb-4">Active Loans</h3>
//           <div className="bg-white shadow-md rounded-lg p-6">
//             {loans.length > 0 ? (
//               <ul className="divide-y divide-gray-200">
//                 {loans.map((loan) => (
//                   <li key={loan.id} className="py-4 flex justify-between items-center">
//                     <div>
//                       <p className="text-gray-800 font-medium">Amount: ${loan.amount}</p>
//                       <p className="text-gray-600">Tenure: {loan.tenure} months</p>
//                       <p className="text-gray-600">Purpose: {loan.purpose}</p>
//                     </div>
//                     <span
//                       className={`px-3 py-1 rounded-full text-sm font-medium ${
//                         loan.status === 'active'
//                           ? 'bg-green-100 text-green-800'
//                           : 'bg-gray-100 text-gray-800'
//                       }`}
//                     >
//                       {loan.status === 'active' ? 'Active' : 'Paid'}
//                     </span>
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p className="text-gray-600 text-center">No active loans found.</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoanManagement;
