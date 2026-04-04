// frontend/src/pages/BooksPage.tsx
import { useState } from 'react';
import BookstoreList from '../components/BookstoreList';
import CategoryFilter from '../components/CategoryFilter';

function BookstorePage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <div className="container mt-5">
      <div className="row gap-4">
        {' '}
        {/* Bootstrap Grid: Adding a small gap between columns */}
        {/* BOOTSTRAP NOVELTY #2: Sidebar shadow and border-radius for modern look */}
        <div
          className="col-md-3 bg-white p-4 rounded-3 shadow-sm border h-100 sticky-top"
          style={{ top: '2rem' }}
        >
          <CategoryFilter
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        </div>
        {/* The Main Book List */}
        <div className="col-md-8 px-0">
          <BookstoreList selectedCategories={selectedCategories} />
        </div>
      </div>
    </div>
  );
}

export default BookstorePage;
