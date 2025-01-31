// import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
// import { doc, getDoc } from "firebase/firestore";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { db } from "../auth/firebase";
// import { useState } from "react";

// function HomePage() {
//   const auth = getAuth();
//   const [user, setUser] = useState(null);
//   const [userData, setUserData] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//       setUser(currentUser);
//       console.log("Current user:", currentUser);
//       if (currentUser) {
//         const userDoc = await getDoc(doc(db, "users", currentUser.uid));
//         if (userDoc.exists()) {
//           setUserData(userDoc.data());
//         }
//       }
//     });

//     return () => unsubscribe();
//   }, [auth]);

//   const handleLogout = async () => {
//     await signOut(auth);
//     navigate("/login");
//   };

//   if (!user) {
//     return <div>Please Login or Register to show this Section</div>;
//   }
//   return (
//     <div>
//       <div>
//         <h2>Welcome, {userData?.name || user.email}</h2>
//         {userData && (
//           <div>
//             <p>Email: {user.email}</p>
//             <p>Mobile: {userData.mobile}</p>
//           </div>
//         )}
//         <h2>{user.displayName}</h2>
//         <button onClick={handleLogout}>Logout</button>
//       </div>
//     </div>
//   );
// }

// export default HomePage;

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../auth/firebase";
import "../assets/stylesheet/HomePage.css";

function HomePage() {
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="auth-message">
        Please Login or Register to show this Section
      </div>
    );
  }

  return (
    <div className="homepage-container">
      <div className="glass-card">
        <h2>Welcome, {userData?.name || user.email}</h2>
        {userData && (
          <div className="user-info">
            <p>Email: {user.email}</p>
            <p>Mobile: {userData.mobile}</p>
          </div>
        )}
        <h2>{user.displayName}</h2>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default HomePage;
