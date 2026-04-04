// frontend/src/components/CategoryFilter.tsx
import { useEffect, useState } from 'react';
import { BASE_URL } from '../api/backendUrl';

function CategoryFilter({
  selectedCategories,
  setSelectedCategories,
}: {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${BASE_URL}/Bookstore/GetCategories`);
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };
    fetchCategories();
  }, []);

  const toggleCategory = (category: string) => {
    const updated = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(updated);
  };

  return (
    <div className="category-filter shadow-sm rounded bg-white overflow-hidden">
      {/* BOOTSTRAP NOVELTY: Using a List Group with actionable items */}
      <div className="bg-primary text-white p-3">
        <h5 className="mb-0 fw-bold small text-uppercase tracking-wider">
          Filter by Category
        </h5>
      </div>

      <div className="list-group list-group-flush">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => toggleCategory(c)}
            className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center py-3 border-0 border-bottom ${
              selectedCategories.includes(c)
                ? 'bg-light fw-bold text-primary'
                : ''
            }`}
          >
            <span className="small">{c}</span>
            {selectedCategories.includes(c) && (
              <span className="badge bg-primary rounded-pill">✓</span>
            )}
          </button>
        ))}
      </div>

      {selectedCategories.length > 0 && (
        <div className="p-3 bg-light border-top">
          <button
            className="btn btn-outline-danger btn-sm w-100 rounded-pill"
            onClick={() => setSelectedCategories([])}
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default CategoryFilter;
