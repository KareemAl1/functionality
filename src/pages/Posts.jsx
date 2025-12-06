// src/pages/Posts.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Posts = () => {
  const { id } = useParams();        // user id from /posts/:id
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [loading, setLoading] = useState(true);

  async function fetchPosts(userId) {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?userId=${userId || id}`
      );

      setPosts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function onSearch() {
    fetchPosts(searchId);
  }

  function onSearchKeyPress(event) {
    if (event.key === "Enter") {
      onSearch();
    }
  }

  function handleBack() {
    // go back to the home page
    navigate("/");
    // or: navigate(-1);   // go back in history
  }

  useEffect(() => {
    fetchPosts();
  }, [id]); // include id so React Router warning goes away

  return (
    <div>
      <div className="post__search">
        <button onClick={handleBack}>← Back</button>

        <div className="post__search--container">
          <label className="post__search--label">Search by Id</label>
          <input
            type="number"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            onKeyDown={onSearchKeyPress}
          />
          <button onClick={onSearch}>Enter</button>
        </div>
      </div>

      {loading ? (
        // skeleton loading UI
        new Array(10).fill(0).map((_, index) => (
          <div className="post" key={index}>
            <div className="post__title">
              <div className="post__title--skeleton" />
            </div>
            <div className="post__body">
              <p className="post__body--skeleton" />
            </div>
          </div>
        ))
      ) : (
        // real posts
        posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="post__title">{post.title}</div>
            <p className="post__body">{post.body}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Posts;
