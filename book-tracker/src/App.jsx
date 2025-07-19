import { useState, useEffect } from 'react'
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import { createBook, getAllBooks, deleteBook as fbDeleteBook } from "./firebase/bookService";
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      const data = await getAllBooks();
      setBooks(data);
    };
    fetchBooks();
  }, []);

  const deleteBook = async (id) => {
    await fbDeleteBook(id);
    const updated = await getAllBooks();
    setBooks(updated);
  };

  const addBook = async (newBook) => {
    await createBook(newBook);
    const updated = await getAllBooks();
    setBooks(updated);
    setShowForm(false);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title"> Book Tracker</h1>
      </header>
      <button className="add-btn" onClick={() => setShowForm(true)}>
          ➕ Add Book
      </button>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div 
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn" onClick={() => setShowForm(false)}>
              ✕
            </button>
            <BookForm addBook={addBook} />
          </div>
        </div>
      )}

      <main className="main-content">
        <BookList books={books} deleteBook={deleteBook} />
      </main>
    </div>
  );
}

export default App;
