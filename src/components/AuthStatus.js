// // src/components/AuthStatus.js
// 'use client';

// import { useState, useEffect } from 'react';
// import { getAuthStatus, logOut } from '../firebase/auth';

// const AuthStatus = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const fetchAuthStatus = async () => {
//       const user = await getAuthStatus();
//       setUser(user);
//     };

//     fetchAuthStatus();
//   }, []);

//   const handleLogout = async () => {
//     await logOut();
//     setUser(null);
//   };

//   return (
//     <div>
//       {user ? (
//         <div>
//           <p>Welcome, {user.email}</p>
//           <button onClick={handleLogout}>Log Out</button>
//         </div>
//       ) : (
//         <p>You are not logged in.</p>
//       )}
//     </div>
//   );
// };

// export default AuthStatus;
