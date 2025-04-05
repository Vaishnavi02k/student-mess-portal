// import { useEffect, useState } from 'react';
// import './App.css';
// import { DatePicker } from 'antd';
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from './firebase-config';

// function App() {
//   const [users, setUsers]= useState([]);
//   const usersCollectionRef= collection(db,"admins");

//   useEffect(()=>{
//     const getUsers= async ()=>{
//       const data = await getDocs(usersCollectionRef);
//       setUsers(data.docs.map((doc)=>({...doc.data(),id:doc.id})));
//     }
//     getUsers();

//   },[])
//   return (
//     <div className="App">
//     <h1 className="text-3xl font-bold underline">
//       Hello world!
//     </h1>
//     <DatePicker />
//     {
//       users.map((user)=>{
//         return(
//           <div>
//             {user.username}
//             {user.password}
//           </div>
//         )
//       })
//     }
//     </div>
//   );
// }

// export default App;
