import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../App.css';

const CartSummary = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart-summary" onClick={() => navigate('/cart')}>
      🛒 <strong>{totalAmount.toFixed(2)}</strong>
    </div>
  );
};

export default CartSummary;
