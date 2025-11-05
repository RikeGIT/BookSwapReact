import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../lib/axios';
import { Book } from '../types';
import { BookCard } from '../components/BookCard';
import './BookListPage.css';

export function BookListPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchBooks() {
      try {
  // NOTE: Backend baseURL already includes /api/v1
  const response = await api.get('/books/'); 
        setBooks(response.data);
      } catch (err) {
        setError('Failed to fetch books.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  const handleDeleteBook = (id: number) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  if (loading) {
    return <div>Loading books...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="book-list-container">
      <h2>Available Books</h2>
      <Link to="/books/add" className="add-book-link">Add New Book</Link>
      <div className="book-list">
        {books.length > 0 ? (
          books.map((book) => (
            <BookCard key={book.id} book={book} onDelete={handleDeleteBook} />
          ))
        ) : (
          <p>No books available for swapping right now.</p>
        )}
      </div>
    </div>
  );
}
