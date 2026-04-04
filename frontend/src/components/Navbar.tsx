// frontend/src/components/Navbar.tsx
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Navbar() {
  // Use the new global helpers we added to CartContext
  const { totalItems, cartTotal } = useCart();
  const tooltipRef = useRef<HTMLAnchorElement>(null);

  // BOOTSTRAP NOVELTY #2: Initialize Bootstrap Tooltip
  useEffect(() => {
    if (tooltipRef.current && window.bootstrap) {
      new window.bootstrap.Tooltip(tooltipRef.current);
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm sticky-top mb-4">
      <div className="container">
        <Link className="navbar-brand fw-bold tracking-tight" to="/">
          <span className="text-accent">THE HILTON</span> BOOKSTORE
        </Link>

        <div className="ms-auto d-flex align-items-center">
          {/* Displaying the live total in the navbar */}
          {totalItems > 0 && (
            <span className="text-white me-3 d-none d-md-inline small fw-light">
              Total: <span className="fw-bold">${cartTotal.toFixed(2)}</span>
            </span>
          )}

          <Link
            to="/cart"
            ref={tooltipRef}
            className="btn btn-light position-relative"
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="View your cart"
          >
            🛒 <span className="d-none d-sm-inline">Cart</span>
            {totalItems > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger shadow">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
