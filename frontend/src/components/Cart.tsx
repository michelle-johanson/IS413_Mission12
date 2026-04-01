import { useCart } from '../context/CartContext';

interface CartProps {
  onContinueShopping: () => void;
}

function Cart({ onContinueShopping }: CartProps) {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } =
    useCart();

  if (cartItems.length === 0) {
    return (
      <div className="container mt-4">
        <h1 className="mb-4">Shopping Cart</h1>
        <div className="alert alert-info">Your cart is empty.</div>
        <button className="btn btn-primary" onClick={onContinueShopping}>
          &larr; Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Shopping Cart</h1>

      <div className="row">
        <div className="col-lg-9">
          <table className="table table-striped table-bordered align-middle">
            <thead className="table-dark">
              <tr>
                <th>Title</th>
                <th style={{ width: '130px' }}>Quantity</th>
                <th>Price</th>
                <th>Subtotal</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.bookID}>
                  <td>{item.title}</td>
                  <td>
                    <div className="input-group input-group-sm">
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() =>
                          updateQuantity(item.bookID, item.quantity - 1)
                        }
                      >
                        −
                      </button>
                      <input
                        type="number"
                        className="form-control text-center"
                        value={item.quantity}
                        min={1}
                        onChange={(e) =>
                          updateQuantity(item.bookID, Number(e.target.value))
                        }
                      />
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() =>
                          updateQuantity(item.bookID, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => removeFromCart(item.bookID)}
                    >
                      &times;
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Order summary card */}
        <div className="col-lg-3">
          <div className="card shadow-sm">
            <div className="card-header bg-dark text-white">
              <strong>Order Summary</strong>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush mb-3">
                {cartItems.map((item) => (
                  <li
                    key={item.bookID}
                    className="list-group-item d-flex justify-content-between px-0"
                  >
                    <span className="text-truncate me-2" style={{ maxWidth: '140px' }}>
                      {item.title} ×{item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="d-flex justify-content-between fw-bold fs-5">
                <span>Total:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>
            <div className="card-footer d-grid gap-2">
              <button className="btn btn-success">Checkout</button>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={clearCart}
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <button className="btn btn-primary mt-3" onClick={onContinueShopping}>
        &larr; Continue Shopping
      </button>
    </div>
  );
}

export default Cart;
