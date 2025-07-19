import { useState } from 'react';

function BookCard({ book, deleteBook }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(true);
  };

  const handleCloseClick = (e) => {
    e.stopPropagation();
    setIsFlipped(false);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    deleteBook(book.id);
  };

  return (
    <div className={`book-card ${isFlipped ? 'flipped' : ''}`}>
      <div className="book-card-inner">
        <div className="book-card-front" onClick={handleCardClick}>
          <div className="book-cover-container">
            {book.coverUrl ? (
              <img 
                src={book.coverUrl}
                alt={`${book.title} cover`}
                className="book-cover"
              />
            ) : (
              <div className="no-cover">
                <span>📚</span>
              </div>
            )}
          </div>
          
          <div className="book-info">
            <h3 className="book-title">{book.title}</h3>
            {book.author && <p className="book-author">by {book.author}</p>}
          </div>
          
          <button 
            className="delete-btn"
            onClick={handleDeleteClick}
            aria-label={`Delete ${book.title}`}
          >
            🗑️ Delete
          </button>
        </div>

        {/* Back of the card */}
        <div className="book-card-back">
          <button 
            className="close-btn"
            onClick={handleCloseClick}
            aria-label="Close details"
          >
            ✕
          </button>
          
          <div className="book-details">
            <h2 className="book-title-large">{book.title}</h2>
            {book.author && <p className="book-author-large">by {book.author}</p>}
            
            {book.coverUrl && (
              <div className="book-cover-large">
                <img 
                  src={book.coverUrl}
                  alt={`${book.title} cover`}
                />
              </div>
            )}
            
            <div className="book-summary">
              <h4>Summary</h4>
              <p>{book.summary || 'No summary available.'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
