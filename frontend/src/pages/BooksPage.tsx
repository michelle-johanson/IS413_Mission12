import { useState } from 'react';
import CategoryFilter from '../components/CategoryFilter';
import BookstoreList from '../components/BookstoreList';
import WelcomeBrand from '../components/WelcomeBrand';
import CartSummary from '../components/CartSummary';

function BookstorePage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <div className="container mt-4">
      <CartSummary />
      <WelcomeBrand />
      <div className="row">
        <div className="col-md-3">
          <CategoryFilter
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        </div>
        <div className="col-md-9">
          <BookstoreList selectedCategories={selectedCategories} />
        </div>
      </div>
    </div>
  );
}

export default BookstorePage;
