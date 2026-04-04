import { useNavigate, useParams } from 'react-router-dom';
import WelcomeBrand from '../components/WelcomeBrand';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import type { CartItem } from '../types/CartItem';

function DonatePage() {
  const navigate = useNavigate();
  const { bookName, bookId } = useParams();
  const { addToCart } = useCart();
  const [donationAmount, setDonationAmount] = useState<number>(0);

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookId: Number(bookId),
      bookName: bookName || 'No Books Found',
      donationAmount,
    };
    addToCart(newItem);
    navigate('/cart');
  };

  return (
    <>
      <WelcomeBrand />
      <h2>Donate to {bookName}</h2>

      <div>
        <input
          type="number"
          placeholder="Enter donation amount"
          value={donationAmount}
          onChange={(x) => setDonationAmount(Number(x.target.value))}
        />
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>

      <button onClick={() => navigate(-1)}>Go Back</button>
    </>
  );
}

export default DonatePage;
