import { useContext } from 'react';
import { CartContext } from '../../contexts/CartProvider';
import { QuantityInput } from '../../components/Form/QuantityInput';
// src/pages/Cart/index.tsx
export interface OrderInfo {
  // Defina os campos conforme sua necessidade:
  address: string;
  paymentMethod: string;
  // ...etc
}

export function Cart() {
  const { cart, incrementItemQuantity, decrementItemQuantity, removeItem } = useContext(CartContext);

  if (cart.length === 0) return <p>Seu carrinho está vazio.</p>;

  return (
    <div>
      <h2>Carrinho</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            <img src={item.imageUrl} alt={item.name} width={60} />
            <span>{item.name}</span>
            <QuantityInput
              quantity={item.quantity}
              incrementQuantity={() => incrementItemQuantity(item.id)}
              decrementQuantity={() => decrementItemQuantity(item.id)}
            />
            <button onClick={() => removeItem(item.id)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}