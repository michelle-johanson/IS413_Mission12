import { ReactNode } from 'react';
import { useCart } from '../context/CartContext';

interface LayoutProps {
  children: ReactNode;
  onGoToCart: () => void;
  onGoToBooks: () => void;
  currentView: 'books' | 'cart';
}

function Layout({ children, onGoToCart, onGoToBooks, currentView }: LayoutProps) {
  const { cartCount } = useCart();

  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
      {/* Navbar */}
      <nav className="navbar navbar-dark" style={{ backgroundColor: '#1a1a2e' }}>
        <div className="container">
          <button
            className="navbar-brand btn btn-link text-white text-decoration-none p-0 navbar-brand-title"
            onClick={onGoToBooks}
          >
            📚 The Book Nook
          </button>
          <div className="d-flex align-items-center gap-3">
            <button
              className={`btn btn-sm ${currentView === 'books' ? 'btn-light' : 'btn-outline-light'}`}
              onClick={onGoToBooks}
            >
              Browse Books
            </button>
            <button
              className="btn btn-sm btn-warning position-relative"
              onClick={onGoToCart}
            >
              🛒 Cart
              {cartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Page content — grows to fill remaining space */}
      <main className="flex-grow-1">
        {children}
      </main>

      {/* Footer — always at bottom */}
      <footer className="site-footer">
        <div className="container">
          &copy; {new Date().getFullYear()} The Book Nook &mdash; IS 413 Bookstore Project
        </div>
      </footer>
    </div>
  );
}

export default Layout;
