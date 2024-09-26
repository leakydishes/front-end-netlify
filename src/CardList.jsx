import React from 'react';
import Card from './Card';
import './Card.css';

function CardList({ questions, searchQuery, filterBy, onDelete, onExpand }) {
  // Filter
  const filteredQuestions = questions.filter((question) => {
    if (filterBy === 'title') {
      return question.title.toLowerCase().includes(searchQuery.toLowerCase());
    } else if (filterBy === 'tag') {
      return question.tag.toLowerCase().includes(searchQuery.toLowerCase());
    } else if (filterBy === 'date') {
      return new Date(question.date).toLocaleDateString().includes(searchQuery);
    }
    return true; // Show all
  });

  return (
    <div className="row">
      {filteredQuestions.map((question) => (
        <Card 
          key={question.id}
          question={question}
          onDelete={onDelete}
          onExpand={onExpand} // Expander
        />
      ))}
    </div>
  );
}

export default CardList;
