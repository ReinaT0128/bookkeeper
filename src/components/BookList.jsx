import BookCard from './BookCard';

function BookList({ books, deleteBook }) {
  if (books.length === 0) {
    return (
      <div className="empty-state">
        <p>No books added yet. Click "Add Book" to get started!</p>
      </div>
    );
  }

  return (
    <div className="book-grid">
      {books.map((book) => (
        <BookCard key={book.id} book={book} deleteBook={deleteBook} />
      ))}
    </div>
  );
}

export default BookList;
