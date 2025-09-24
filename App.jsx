import React, { useState } from "react";
import "./LibraryApp.css";

export default function LibraryApp() {
  const [books, setBooks] = useState([
    { id: 1, title: "The Alchemist", author: "Paulo Coelho" },
    { id: 2, title: "1984", author: "George Orwell" },
    { id: 3, title: "To Kill a Mockingbird", author: "Harper Lee" },
  ]);
  const [search, setSearch] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");

  const filteredBooks = books.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase())
  );

  const addBook = () => {
    if (newTitle.trim() && newAuthor.trim()) {
      const newBook = {
        id: Date.now(),
        title: newTitle,
        author: newAuthor,
      };
      setBooks([...books, newBook]);
      setNewTitle("");
      setNewAuthor("");
    }
  };

  const removeBook = (id) => {
    setBooks(books.filter((b) => b.id !== id));
  };

  return (
    <div className="container">
      <h1>📚 Library Management</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by title or author..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Add book */}
      <div className="add-book">
        <h2>Add New Book</h2>
        <input
          type="text"
          placeholder="Book Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          value={newAuthor}
          onChange={(e) => setNewAuthor(e.target.value)}
        />
        <button onClick={addBook}>Add Book</button>
      </div>

      {/* Book list */}
      <ul>
        {filteredBooks.map((book) => (
          <li key={book.id}>
            <strong>{book.title}</strong> by {book.author}
            <button onClick={() => removeBook(book.id)}>Remove</button>
          </li>
        ))}
      </ul>

      {filteredBooks.length === 0 && <p>No books found. Try adding one!</p>}
    </div>
  );
}
