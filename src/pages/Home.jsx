// Home.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();
      setUsers(data);
    }

    fetchUsers();
  }, []);

  return (
    <div className="container">
      <div className="row user-list">
        {users.map((user) => (
          <Link
            key={user.id}
            to={`/posts/${user.id}`}       // 👈 go to posts page for that user
            className="user"
          >
            <div className="user-card">
              <div className="user-card__container">
                <h3>{user.name}</h3>
                <p>
                  <b>Email:</b> {user.email}
                </p>
                <p>
                  <b>Phone:</b> {user.phone}
                </p>
                <p>
                  <b>Website:</b> {user.website}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
