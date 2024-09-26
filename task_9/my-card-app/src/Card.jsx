import React from 'react';
import './Card.css';

function Card({ question, onDelete, onExpand }) {
  const handleExpand = () => {
    onExpand(question); // Expand card
  };

  // Format
  const formattedDate = question.date
    ? new Date(question.date.seconds ? question.date.seconds * 1000 : question.date).toLocaleDateString()
    : 'No Date';

  return (
    <div className="column">
      <h3>{question.title}</h3>
      <p>{question.tag}</p>
      <p>{formattedDate}</p>
      <button onClick={handleExpand}>Expand</button>
      <button onClick={() => onDelete(question.id)}>Delete</button>
    </div>
  );
}

export default Card;
