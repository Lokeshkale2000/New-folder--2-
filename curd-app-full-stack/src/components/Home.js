import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Home.css'; // Ensure this CSS file exists and is updated

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all posts from the backend
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://new-folder-2-kappa-pied.vercel.app/api/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error); // Log error for debugging
        setError('Failed to fetch posts. Please try again later.');
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://new-folder-2-kappa-pied.vercel.app/api/posts/${id}`);
      setPosts(posts.filter(post => post._id !== id));
    } catch (error) {
      console.error('Error deleting post:', error); // Log error for debugging
      setError('Failed to delete post. Please try again later.');
    }
  };

  return (
    <div className="home">
      <h3 className="PostTitle">All Posts</h3>
      {error && <p className="error-message">{error}</p>}
      <ul className="post-list">
        {posts.map(post => (
          <li key={post._id} className="post-item">
            <div className="post-content">
              <h5>Title: {post.title}</h5>
              <p>Content: {post.content}</p>
              <p>By: {post.author}</p>
              <p>At: {new Date(post.createdAt).toLocaleString()}</p> {/* Format date */}
            </div>
            <div className="post-actions">
              <Link to={`/edit-post/${post._id}`} className="edit-btn">Edit</Link>
              <button onClick={() => handleDelete(post._id)} className="delete-btn">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
