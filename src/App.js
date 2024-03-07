const React = require("react"); // Change to require
// const App = require("./App.css"); // Import CSS (if not using Babel)
import './App.css'; // Import CSS (if using Babel)
const { useState, useEffect } = require("react");
const Register = require("./components/Register");
const axios = require('axios');

function App() {
  const port = process.env.REACT_APP_SERVER_PORT || 8000;
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
