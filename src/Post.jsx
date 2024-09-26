import React, { useState, useEffect } from 'react';
import { Button, Input, TextArea } from 'semantic-ui-react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { storage, db, auth } from './utils/firebase'; // Firebase references, include auth
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs

const Post = ({ postType }) => {
  const [title, setTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [imageUpload, setImageUpload] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [user, setUser] = useState(null); // Track the authenticated user
  const navigate = useNavigate();

  // Check user auth
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser); // Set user
      } else {
        setUser(null); // No user auth
      }
    });

    return () => unsubscribe(); // Cleanup
  }, []);

  // Data Change
  const chooseFile = (e) => {
    setImageUpload(e.target.files[0]);
  };

  // Image upload
  const handleImageUpload = async () => {
    if (!imageUpload) {
      setErrorMessage('Please select an image to upload.');
      return null;
    }

    const uniqueID = uuidv4(); // ID
    const imageUrl = `/images/${uniqueID}/${imageUpload.name}`; // Image path

    const storageRef = ref(storage, imageUrl); // Firebase storage ref

    try {
      const snapshot = await uploadBytes(storageRef, imageUpload);
      const downloadURL = await getDownloadURL(snapshot.ref); // Get image URL
      return downloadURL; // Return image URL Firestore input
    } catch (error) {
      setErrorMessage('Error uploading image. Please try again.');
      return null;
    }
  };

  // Form
  const handlePost = async (e) => {
    e.preventDefault();

    // User auth
    if (!user) {
      setErrorMessage('You need to be logged in to submit a post.');
      return;
    }

    // Fields filled
    if (!title || !content || (postType === 'article' && !abstract)) {
      setErrorMessage('Please fill all required fields.');
      return;
    }

    // Upload image
    const imageUrl = await handleImageUpload();
    if (!imageUrl) {
      return;
    }

    // Form data to Firebase
    const formData = {
      postType, // Store the post type
      title,
      abstract: postType === 'article' ? abstract : '', // Include abstract if it's an article
      content,
      tags,
      imageUrl, // Image URL Storage
      timestamp: serverTimestamp(), // Add auto time
    };

    try {
      // Save data
      await addDoc(collection(db, 'form-data'), formData);
      setSuccessMessage('Post submitted successfully!');

      // Clear
      setTitle('');
      setAbstract('');
      setContent('');
      setTags('');
      setImageUpload(null);

      // Home Page
      navigate('/');
    } catch (error) {
      setErrorMessage('Error submitting post.');
    }
  };

  return (
    <div className="post-container">
      <h2>New Post</h2>
      <form onSubmit={handlePost}>
        <div className="input-container">
          <label>Title</label>
          <Input
            type="text"
            placeholder="Enter a descriptive title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Conditional render */}
        {postType === 'article' && (
          <div className="input-container">
            <label>Abstract</label>
            <TextArea
              placeholder="Enter a 1-paragraph abstract"
              value={abstract}
              onChange={(e) => setAbstract(e.target.value)}
            />
          </div>
        )}

        <div className="input-container">
          <label>Content</label>
          <TextArea
            placeholder="Enter the full content of your post"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="input-container">
          <label>Tags</label>
          <Input
            type="text"
            placeholder="Enter relevant tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        <div className="input-container">
          <label>Upload Image</label>
          <Input type="file" onChange={chooseFile} />
        </div>

        <Button type="submit">Post</Button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default Post;
