import { Heart } from '@phosphor-icons/react';
import { useTheme } from 'styled-components';
import { QuantityInput } from '../Form/QuantityInput';
import {
  CoffeeImg,
  Container,
  Control,
  Description,
  Order,
  Price,
  Tags,
  Title,
} from './styles';
import { useContext } from 'react';
import { CartContext } from '../../contexts/CartProvider';

type CoffeeCardProps = {
  coffee: {
    id: string;
    name: string;
    description: string;
    tags: string[];
    price: number;
    imageUrl: string;
    quantity: number;
    favorite: boolean;
  };
  incrementQuantity: (id: string) => void;
  decrementQuantity: (id: string) => void;
  handleFavoriteCoffee: (id: string) => void;
};

export function CoffeeCard({
  coffee,
  incrementQuantity,
  decrementQuantity,
  handleFavoriteCoffee,
}: CoffeeCardProps) {
  const theme = useTheme();
  const { addItem } = useContext(CartContext);

  return (
    <Container>
      <CoffeeImg src={coffee.imageUrl} alt={coffee.name} />
      <Tags>
        {coffee.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </Tags>
      <Title>{coffee.name}</Title>
      <Description>{coffee.description}</Description>
      <Control>
        <Price>
          <span>R$</span>
          <span>{coffee.price.toFixed(2)}</span>
        </Price>
        <Order $itemAdded={coffee.quantity > 0}>
          <QuantityInput
            quantity={coffee.quantity}
            incrementQuantity={() => incrementQuantity(coffee.id)}
            decrementQuantity={() => decrementQuantity(coffee.id)}
          />
          <button
            type="button"
            onClick={() => handleFavoriteCoffee(coffee.id)}
            title="Favoritar"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              marginRight: '0.5rem'
            }}
          >
            <Heart
              size={22}
              color={coffee.favorite ? 'red' : theme.colors['base-card']}
            />
          </button>
          <button
            type="button"
            className="add-to-cart-btn"
            onClick={() => addItem({ ...coffee, quantity: coffee.quantity || 1 })}
          >
            Adicionar ao carrinho
          </button>
        </Order>
      </Control>
    </Container>
  );
}