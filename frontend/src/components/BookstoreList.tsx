import { useEffect, useState } from 'react';
import type { Book } from '../types/Book';
import { BASE_URL } from '../api/backendUrl';

function BookstoreList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<string>('asc');

  useEffect(() => {
    const fetchBooks = async () => {
      const categoryParams = selectedCategories
        .map((c) => `categories=${encodeURIComponent(c)}`)
        .join('&');
      const response = await fetch(
        `${BASE_URL}/Bookstore/AllBooks?pageSize=${pageSize}&pageNumber=${pageNumber}&sortOrder=${sortOrder}${categoryParams ? '&' + categoryParams : ''}`
      );
      const data = await response.json();
      setBooks(data.books);
      setTotalPages(Math.ceil(data.totalBooks / pageSize));
    };
    fetchBooks();
  }, [pageSize, pageNumber, sortOrder, selectedCategories]);

  const toggleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    setPageNumber(1);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Bookstore</h1>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <button className="btn btn-outline-primary btn-sm" onClick={toggleSort}>
          Sort by Title {sortOrder === 'asc' ? '▲' : '▼'}
        </button>
        <div className="d-flex align-items-center gap-2">
          <label className="mb-0">Results per page:</label>
          <select
            className="form-select form-select-sm w-auto"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPageNumber(1);
            }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>
      </div>

      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>ISBN</th>
            <th>Classification</th>
            <th>Category</th>
            <th>Pages</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.bookId}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publisher}</td>
              <td>{book.isbn}</td>
              <td>{book.classification}</td>
              <td>{book.category}</td>
              <td>{book.pageCount}</td>
              <td>${book.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-center gap-1 mt-3">
        <button
          className="btn btn-outline-secondary btn-sm"
          disabled={pageNumber === 1}
          onClick={() => setPageNumber(pageNumber - 1)}
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            className={`btn btn-sm ${pageNumber === index + 1 ? 'btn-primary' : 'btn-outline-secondary'}`}
            onClick={() => setPageNumber(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="btn btn-outline-secondary btn-sm"
          disabled={pageNumber === totalPages}
          onClick={() => setPageNumber(pageNumber + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default BookstoreList;
