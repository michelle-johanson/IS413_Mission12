import { useEffect, useState } from 'react';

interface Book {
  bookID: number;
  title: string;
  author: string;
  publisher: string;
  isbn: string;
  classification: string;
  category: string;
  pageCount: number;
  price: number;
}

function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    fetch(
      `http://localhost:5123/api/books?pageNum=${pageNum}&pageSize=${pageSize}&sortOrder=${sortOrder}`
    )
      .then((res) => res.json())
      .then((data) => {
        setBooks(data.books);
        setTotalCount(data.totalCount);
      });
  }, [pageNum, pageSize, sortOrder]);

  const totalPages = Math.ceil(totalCount / pageSize);

  function handlePageSizeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setPageSize(Number(e.target.value));
    setPageNum(1);
  }

  function toggleSort() {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    setPageNum(1);
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Bookstore</h1>

      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>
              Title{' '}
              <button
                className="btn btn-sm btn-outline-light ms-2"
                onClick={toggleSort}
              >
                {sortOrder === 'asc' ? '▲' : '▼'}
              </button>
            </th>
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
            <tr key={book.bookID}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publisher}</td>
              <td>{book.isbn}</td>
              <td>{book.classification}</td>
              <td>{book.category}</td>
              <td>{book.pageCount}</td>
              <td>${book.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex align-items-center justify-content-between mt-3">
        <div className="d-flex align-items-center gap-2">
          <label htmlFor="pageSizeSelect">Results per page:</label>
          <select
            id="pageSizeSelect"
            className="form-select form-select-sm w-auto"
            value={pageSize}
            onChange={handlePageSizeChange}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
          </select>
        </div>

        <div className="d-flex align-items-center gap-2">
          <span>
            Page {pageNum} of {totalPages}
          </span>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => setPageNum((p) => p - 1)}
            disabled={pageNum === 1}
          >
            &laquo; Prev
          </button>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => setPageNum((p) => p + 1)}
            disabled={pageNum === totalPages}
          >
            Next &raquo;
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookList;
