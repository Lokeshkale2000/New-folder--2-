import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './BlogPostForm.css'; // Corrected import path

const BlogPostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState(''); // State for author
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://new-folder-2-kappa-pied.vercel.app/api/posts', { title, content, author }); // Send author to the backend
      setSuccess('Post added successfully!');
      setTitle('');
      setContent('');
      setAuthor('');
      setTimeout(() => navigate('/Home'), 500);
    } catch (error) {
      setError('Failed to add post');
    }
  };

  return (
    <div className="blog-post-form">
      <h3 className='header'>Add New Post</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)} // Corrected state update
            required
          />
        </div>
        <button type="submit" className='button'>Submit</button>
        {success && <p className="success-message">{success}</p>}
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default BlogPostForm;
