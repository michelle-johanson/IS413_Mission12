// frontend/src/components/BookstoreList.tsx
import { useEffect, useState } from 'react';
import type { Book } from '../types/Book';
import { BASE_URL } from '../api/backendUrl';
import { useCart } from '../context/CartContext';

function BookstoreList({
  selectedCategories,
}: {
  selectedCategories: string[];
}) {
  const { addToCart } = useCart();
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
    <div className="mt-2">
      {/* Bootstrap Grid: Heading and Pagination Controls */}
      <div className="row align-items-end mb-4">
        <div className="col-md-8">
          <h2 className="text-primary fw-bold">Available Books</h2>
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={toggleSort}
          >
            Sort by Title {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>
        <div className="col-md-4 text-end">
          <label className="form-label small text-muted mb-1">
            Results Per Page
          </label>
          <select
            className="form-select form-select-sm shadow-sm"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPageNumber(1);
            }}
          >
            <option value="5">5 Per Page</option>
            <option value="10">10 Per Page</option>
            <option value="20">20 Per Page</option>
          </select>
        </div>
      </div>
      {/* BOOTSTRAP NOVELTY #1: Table with Hover Effect and Striped Rows */}
      <div className="table-responsive shadow rounded-4 overflow-hidden border">
        <table className="table table-hover table-striped align-middle mb-0">
          <thead className="table-dark text-uppercase small">
            <tr>
              <th className="ps-4">Title</th>
              <th>Author</th>
              <th>Publisher & Details</th>
              <th>Category</th>
              <th className="text-end">Price</th>
              <th className="text-center pe-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.bookId}>
                <td className="ps-4 fw-bold text-dark">{book.title}</td>
                <td>{book.author}</td>
                <td>
                  <span className="d-block small fw-bold text-secondary">
                    {book.publisher}
                  </span>
                  {/* Mission 11: Displaying ISBN, Pages, and Classification */}
                  <small className="text-muted d-block">
                    ISBN: {book.isbn} | Pages: {book.pageCount} | Type:{' '}
                    {book.classification}
                  </small>
                </td>
                <td>
                  <span className="badge rounded-pill bg-light text-dark border px-3">
                    {book.category}
                  </span>
                </td>
                {/* BOOTSTRAP NOVELTY #2: Using Contextual text colors (text-success) for pricing */}
                <td className="text-end fw-bold text-success font-monospace">
                  ${book.price?.toFixed(2)}
                </td>
                <td className="text-center pe-4">
                  <button
                    className="btn btn-primary btn-sm rounded-pill px-4 shadow-sm"
                    onClick={() =>
                      addToCart({
                        bookId: book.bookId,
                        bookName: book.title,
                        price: book.price ?? 0,
                        quantity: 1,
                      })
                    }
                  >
                    Add to Cart
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Bootstrap Pagination Component */}
      <nav className="mt-4 d-flex justify-content-center">
        <ul className="pagination pagination-sm">
          <li className={`page-item ${pageNumber === 1 ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => setPageNumber(pageNumber - 1)}
            >
              Previous
            </button>
          </li>

          {[...Array(totalPages)].map((_, index) => (
            <li
              key={index + 1}
              className={`page-item ${pageNumber === index + 1 ? 'active' : ''}`}
            >
              <button
                className="page-link"
                onClick={() => setPageNumber(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}

          <li
            className={`page-item ${pageNumber === totalPages ? 'disabled' : ''}`}
          >
            <button
              className="page-link"
              onClick={() => setPageNumber(pageNumber + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>{' '}
    </div>
  );
}

export default BookstoreList;
