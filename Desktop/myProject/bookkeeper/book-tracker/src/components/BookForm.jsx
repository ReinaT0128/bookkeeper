import { useState } from 'react';

function BookForm({ addBook }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [summary, setSummary] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCover, setSelectedCover] = useState('');
  const [uploadedCover, setUploadedCover] = useState('');

  const handleSearch = async () => {
    if (!title) return;
    const res = await fetch(`https://openlibrary.org/search.json?title=${title}&author=${author}`);
    const data = await res.json();
    setSearchResults(data.docs.slice(0, 5));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => setUploadedCover(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    addBook({
      title,
      author,
      summary, 
      coverUrl: selectedCover || uploadedCover || '',
    });
    setTitle('');
    setAuthor('');
    setSummary('');
    setSearchResults([]);
    setSelectedCover('');
    setUploadedCover('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Book title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Author (optional)"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <button type="button" onClick={handleSearch}>
        🔍 Search Cover
      </button>
      {searchResults.length > 0 && (
        <div style={{ display: 'flex', gap: '10px', marginTop: '1rem', flexWrap: 'wrap' }}>
          {searchResults.map((book, i) => {
            const coverId = book.cover_i;
            const coverUrl = coverId
              ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
              : '';
            return (
              <img
                key={i}
                src={coverUrl}
                alt="cover"
                style={{
                  height: '100px',
                  border: selectedCover === coverUrl ? '3px solid #6366f1' : '1px solid #ccc',
                  cursor: 'pointer',
                }}
                onClick={() => setSelectedCover(coverUrl)}
              />
            );
          })}
        </div>
      )}
      <p style={{ marginTop: '1rem' }}>Or upload your own cover:</p>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {uploadedCover && (
        <img src={uploadedCover} alt="custom cover" style={{ height: '100px', marginTop: '0.5rem' }} />
      )}
      <textarea
        placeholder="Summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        rows="4"
        style={{ width: '100%', marginTop: '1rem' }}
      />
      <button type="submit" style={{ marginTop: '1rem' }}>Add Book</button>
    </form>
  );
}

export default BookForm;
