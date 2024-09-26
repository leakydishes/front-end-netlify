import React, { useState, useEffect } from 'react';
import { getPostsFromFirestore, deletePostFromFirestore } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase';
import '../HomePage.css'

const HomePage = () => {
  // States
  const [questions, setQuestions] = useState([]); // Store posts
  const [searchTerm, setSearchTerm] = useState(''); // Search
  const [expandedPostId, setExpandedPostId] = useState(null); // Track expanded
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track auth
  const [loading, setLoading] = useState(true); // Stop posts from auto showing
  const navigate = useNavigate(); // Page redirects

// Check if the user is logged in
useEffect(() => {
  const checkAuthState = async () => {
    const user = auth.currentUser;
    if (user) {
      setIsAuthenticated(true);

      const questionsList = await getPostsFromFirestore(); // Fetch posts
      setQuestions(questionsList);
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false); // Set loading to false after auth check
  };
  checkAuthState();
}, []);

// Search
const handleSearchChange = (e) => {
  setSearchTerm(e.target.value);
};

// Search
const filteredQuestions = questions.filter((question) =>
  (question.title && question.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
  (question.postType && question.postType.toLowerCase().includes(searchTerm.toLowerCase()))
);

// Expand
const handleExpand = (id) => {
  setExpandedPostId(expandedPostId === id ? null : id);
};

// Delete
const handleDelete = async (id) => {
  await deletePostFromFirestore(id); // Delete from Firestore
  setQuestions(questions.filter((question) => question.id !== id)); // Update state
};

// Redirect login page
const redirectToLogin = () => {
  navigate('/login'); // Navigate to login page
};

// Loading when checking state
if (loading) {
  return <p>Loading...</p>;
}

// Not auth = Login btn
if (!isAuthenticated) {
  return (
    <div>
      <p>You need to be logged in to view posts.</p>
      <button onClick={redirectToLogin}>Login</button>
    </div>
  );
}

// Posts
return (
  <div>
    <h2>Question List</h2>

    {/* Search Input */}
    <input
      type="text"
      placeholder="Search questions..."
      value={searchTerm}
      onChange={handleSearchChange}
    />

    {filteredQuestions.length === 0 ? (
      <p>No posts available</p>
    ) : (
      filteredQuestions.map((question) => (
        <div key={question.id} className="question-card">
          <h3>{question.title}</h3>
          <p>{question.postType === 'question' ? 'Question' : 'Article'}</p>
          <p>{new Date(question.timestamp.seconds * 1000).toLocaleDateString()}</p>

          {/* Expand button */}
          <button onClick={() => handleExpand(question.id)}>
            {expandedPostId === question.id ? 'Collapse' : 'Expand'}
          </button>

          {/* Delete button */}
          <button onClick={() => handleDelete(question.id)}>Delete</button>

          {/* Expanded Content */}
          {expandedPostId === question.id && (
            <div className="expanded-content">
              {question.abstract && <p>Abstract: {question.abstract}</p>}
              <p>{question.content}</p>
              <p>{question.tags}</p>
            </div>
          )}
        </div>
      ))
    )}
  </div>
);
};

export default HomePage;