import React from 'react';
import { Link } from 'react-router-dom';
import { api } from '../lib/axios';
import { Book } from '../types';
import axios from 'axios';
import './BookCard.css';

interface BookCardProps {
  book: Book;
  onDelete: (id: number) => void;
}

export function BookCard({ book, onDelete }: BookCardProps) {
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await api.delete(`/books/${book.id}/`);
        onDelete(book.id);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          // Assuming the error response for a non-owner might be a 403 Forbidden
          if (error.response.status === 403) {
            alert("You don't have permission to delete this book.");
          } else {
            alert(error.response.data.detail || 'Failed to delete the book. Please try again.');
          }
        } else {
          alert('An unexpected error occurred while deleting the book.');
        }
        console.error('Failed to delete the book:', error);
      }
    }
  };

  return (
    <div className="book-card">
      <div className="book-card-content">
        <h3>{book.title}</h3>
        <p className="book-author">by {book.author}</p>
        <p className="book-description">{book.description}</p>
      </div>
      <div className="book-card-footer">
        <Link to={`/books/edit/${book.id}`} className="edit-button">
          Edit
        </Link>
        <button onClick={handleDelete} className="delete-button">
          Delete
        </button>
        <button className="swap-button">Request Swap</button>
      </div>
    </div>
  );
}
