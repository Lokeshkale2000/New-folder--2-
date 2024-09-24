import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './EditPost.css'; 
const EditPostForm = () => {
  const { id } = useParams(); 
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://new-folder-2-kappa-pied.vercel.app/api/posts/${id}`);
        const post = response.data;
        setTitle(post.title);
        setContent(post.content);
        setAuthor(post.author);
        setError(''); 
      } catch (error) {
        console.error('Error fetching post:', error); 
        setError('Failed to fetch post');
      } finally {
        setLoading(false); 
      }
    };

    fetchPost();
  }, [id]);

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://new-folder-2-kappa-pied.vercel.app/api/posts/${id}`, { title, content, author });
      setSuccess('Post updated successfully!');
      setTimeout(() => navigate('/Home'), 1500); 
    } catch (error) {
      console.error('Error updating post:', error); 
      setError('Failed to update post');
    }
  };

 
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
            aria-required="true" 
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            aria-required="true" 
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
            aria-required="true" 
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
