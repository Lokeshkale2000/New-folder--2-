import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './EditPost.css'; // Ensure this CSS file exists and is updated

const EditPostForm = () => {
  const { id } = useParams(); // Get the post ID from the URL
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();

  // Fetch the post data when the component mounts or the ID changes
  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true); // Set loading to true while fetching
      try {
        const response = await axios.get(`https://new-folder-2-kappa-pied.vercel.app/api/posts/${id}`);
        const post = response.data;
        setTitle(post.title);
        setContent(post.content);
        setAuthor(post.author);
        setError(''); // Clear any previous error
      } catch (error) {
        console.error('Error fetching post:', error); // Log error for debugging
        setError('Failed to fetch post');
      } finally {
        setLoading(false); // Set loading to false once the fetch is complete
      }
    };

    fetchPost();
  }, [id]);

  // Handle form submission to update the post
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://new-folder-2-kappa-pied.vercel.app/api/posts/${id}`, { title, content, author });
      setSuccess('Post updated successfully!');
      setTimeout(() => navigate('/Home'), 1500); // Redirect after 1.5 seconds
    } catch (error) {
      console.error('Error updating post:', error); // Log error for debugging
      setError('Failed to update post');
    }
  };

  // Display loading, error, or form based on the state
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="edit-post-form">
      <h1>Edit Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            aria-required="true" // Improve accessibility
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            aria-required="true" // Improve accessibility
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            aria-required="true" // Improve accessibility
          />
        </div>
        <button type="submit" className='button'>Update</button>
        {success && <p className="success-message">{success}</p>}
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default EditPostForm;
