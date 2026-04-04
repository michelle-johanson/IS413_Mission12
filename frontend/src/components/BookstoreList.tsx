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

  // Inside BookstoreList.tsx return...
  return (
    <div className="mt-2">
      <div className="d-flex justify-content-between align-items-end mb-4">
        <div>
          <h2 className="text-secondary fw-light">Available Books</h2>
          <button
            className="btn btn-sm btn-outline-primary mt-2"
            onClick={toggleSort}
          >
            Sort by Title {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>
        <div className="text-end">
          <label className="form-label small text-muted mb-1">
            Items Per Page
          </label>
          <select
            className="form-select form-select-sm"
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

      <div className="table-responsive shadow-sm rounded">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-dark">
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Details</th> {/* Grouping some fields saves space */}
              <th>Category</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.bookId}>
                <td className="fw-bold">{book.title}</td>
                <td>{book.author}</td>
                <td>
                  <small className="text-muted d-block">
                    ISBN: {book.isbn}
                  </small>
                  <small className="text-muted d-block">
                    Pages: {book.pageCount}
                  </small>
                </td>
                <td>
                  <span className="badge bg-light text-dark border">
                    {book.category}
                  </span>
                </td>
                <td className="fw-bold text-success">
                  ${book.price?.toFixed(2)}
                </td>
                <td>
                  <button
                    className="btn btn-primary btn-sm rounded-pill px-3"
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

      {/* Proper Bootstrap Pagination Component */}
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
      </nav>
    </div>
  );
}

export default BookstoreList;
