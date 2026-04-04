import { useEffect, useState } from 'react';
import './CategoryFilter.css';
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
        console.log('Fetched categories:', data);
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };

    fetchCategories();
  }, []);

  function handleCheckboxChange({ target }: { target: HTMLInputElement }) {
    const updatedCategories = selectedCategories.includes(target.value)
      ? selectedCategories.filter((x) => x !== target.value)
      : [...selectedCategories, target.value];
    setSelectedCategories(updatedCategories);
  }

  // frontend/src/components/CategoryFilter.tsx
  return (
    <div className="bg-white p-4 rounded shadow-sm border">
      <h5 className="fw-bold mb-3 pb-2 border-bottom">Categories</h5>
      <div className="d-flex flex-column gap-2">
        {categories.map((c) => (
          <div key={c} className="form-check custom-checkbox">
            <input
              type="checkbox"
              id={c}
              value={c}
              className="form-check-input pointer"
              checked={selectedCategories.includes(c)}
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label pointer small" htmlFor={c}>
              {c}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;
