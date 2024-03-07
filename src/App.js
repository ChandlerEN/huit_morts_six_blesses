// import Register from "./components/Register";
// import "./App.css";

// function App() {
//   return (
//     <div className="App">
//       <Register />
//     </div>
//   );
// }

// export default App;

import "./App.css";
import axios from 'axios';
import { useState, useEffect } from "react";
import Register from "./components/Register";

function App() {
  const port = process.env.REACT_APP_SERVER_PORT;
  let [usersCount, setUsersCount] = useState(0);

  useEffect(() => {
    async function countUsers() {
      try {
        const api = axios.create({
          baseURL: `http://localhost:${port}`,
        });
        const response = await api.get(`/users`);
        setUsersCount(response.data.utilisateurs.length);
      } catch (error) {
        console.error(error);
      }
    }
    countUsers();
  }, [port]);

  return (
    <div className="App">
      <Register />
      <header className="App-header">
        <h1>Users manager</h1>
        <p>{usersCount} user(s) already registered</p>
      </header>
    </div>
  );
}

export default App;
