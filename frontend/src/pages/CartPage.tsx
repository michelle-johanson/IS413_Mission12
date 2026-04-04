import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

// frontend/src/pages/CartPage.tsx
function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart, clearCart } = useCart();

  // Fix: price * quantity
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mt-5">
      <div className="card shadow-sm border-0">
        <div className="card-header bg-primary text-white py-3">
          <h2 className="mb-0 h4">Your Shopping Cart</h2>
        </div>
        <div className="card-body p-0">
          {cart.length === 0 ? (
            <div className="p-5 text-center">
              <p className="text-muted">Your cart is feeling a little light.</p>
              <button
                className="btn btn-primary"
                onClick={() => navigate('/books')}
              >
                Go Shopping
              </button>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Book Title</th>
                    <th className="text-center">Qty</th>
                    <th className="text-end">Price</th>
                    <th className="text-end">Subtotal</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.bookId}>
                      <td className="fw-bold">{item.bookName}</td>
                      <td className="text-center">{item.quantity}</td>
                      <td className="text-end">${item.price.toFixed(2)}</td>
                      <td className="text-end fw-bold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                      <td className="text-center">
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => removeFromCart(item.bookId)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="card-footer bg-white py-4">
          <div className="row align-items-center">
            <div className="col-md-6">
              <button
                className="btn btn-link text-decoration-none text-muted"
                onClick={() => navigate('/books')}
              >
                ← Continue Browsing
              </button>
              <button
                className="btn btn-link text-danger text-decoration-none"
                onClick={clearCart}
              >
                Clear Cart
              </button>
            </div>
            <div className="col-md-6 text-end">
              <h4 className="mb-3">
                Total: <span className="text-primary">${total.toFixed(2)}</span>
              </h4>
              <button className="btn btn-accent btn-lg px-5">
                Checkout Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
