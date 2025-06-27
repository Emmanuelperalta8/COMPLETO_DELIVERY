import { Coffee, Package, ShoppingCart, Timer } from '@phosphor-icons/react';
import { useTheme } from 'styled-components';
import { CoffeeCard } from '../../components/CoffeeCard';
import { CoffeeList, Heading, Hero, HeroContent, Info, Navbar } from './styles';
import { useEffect, useState } from 'react';
import { Radio } from '../../components/Form/Radio';
import { api } from '../../services/api';
import { Link } from 'react-router-dom';

interface Coffee {
  id: string;
  name: string;
  description: string;
  tags: string[];
  price: number;
  imageUrl: string;
  quantity: number;
  favorite: boolean;
}

export function Home() {
  const theme = useTheme();
  const [coffees, setCoffees] = useState<Coffee[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    api.get('/coffees')
      .then((response) => {
        const formattedCoffees = response.data.map((coffee: any) => ({
          id: coffee.id,
          name: coffee.name,
          description: coffee.description,
          tags: coffee.tags.map((tag: any) => tag.name),
          price: Number(coffee.price),
          imageUrl: coffee.imageUrl,
          quantity: 0,
          favorite: false,
        }));
        setCoffees(formattedCoffees);
      })
      .catch((error) => {
        console.error('Erro ao buscar cafés:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function incrementQuantity(id: string) {
    setCoffees((prevState) =>
      prevState.map((coffee) =>
        coffee.id === id
          ? { ...coffee, quantity: coffee.quantity + 1 }
          : coffee,
      ),
    );
  }

  function decrementQuantity(id: string) {
    setCoffees((prevState) =>
      prevState.map((coffee) =>
        coffee.id === id && coffee.quantity > 0
          ? { ...coffee, quantity: coffee.quantity - 1 }
          : coffee,
      ),
    );
  }

  function handleFavoriteCoffee(id: string) {
    setCoffees((prevState) =>
      prevState.map((coffee) =>
        coffee.id === id
          ? { ...coffee, favorite: !coffee.favorite }
          : coffee,
      ),
    );
  }

  const filteredCoffees = selectedTag
    ? coffees.filter((coffee) => coffee.tags.includes(selectedTag))
    : coffees;

  function handleTagSelection(tag: string) {
    setSelectedTag((prevSelectedTag) =>
      prevSelectedTag === tag ? null : tag,
    );
  }

  if (loading) return <p>Carregando cafés...</p>;

  return (
    <div>
      <Hero>
        <HeroContent>
          <div>
            <Heading>
              <h1>Encontre o café perfeito para qualquer hora do dia</h1>
              <span>
                Com o Coffee Delivery você recebe seu café onde estiver, a qualquer hora
              </span>
            </Heading>
            <Info>
              <div>
                <ShoppingCart size={32} weight="fill" color={theme.colors.background} style={{ backgroundColor: theme.colors['yellow-dark'] }} />
                <span>Compra simples e segura</span>
              </div>
              <div>
                <Package size={32} weight="fill" color={theme.colors.background} style={{ backgroundColor: theme.colors['base-text'] }} />
                <span>Embalagem mantém o café intacto</span>
              </div>
              <div>
                <Timer size={32} weight="fill" color={theme.colors.background} style={{ backgroundColor: theme.colors.yellow }} />
                <span>Entrega rápida e rastreada</span>
              </div>
              <div>
                <Coffee size={32} weight="fill" color={theme.colors.background} style={{ backgroundColor: theme.colors.purple }} />
                <span>O café chega fresquinho até você</span>
              </div>
            </Info>
          </div>
          <img src="/images/hero.svg" alt="Café do Coffee Delivery" />
        </HeroContent>
        <img src="/images/hero-bg.svg" id="hero-bg" alt="" />
      </Hero>

      <CoffeeList>
        <h2>Nossos cafés</h2>
        <Navbar>
          <Radio onClick={() => handleTagSelection('tradicional')} isSelected={selectedTag === 'tradicional'} value="tradicional">
            <span>Tradicional</span>
          </Radio>
          <Radio onClick={() => handleTagSelection('gelado')} isSelected={selectedTag === 'gelado'} value="gelado">
            <span>Gelado</span>
          </Radio>
          <Radio onClick={() => handleTagSelection('com leite')} isSelected={selectedTag === 'com leite'} value="com leite">
            <span>Com leite</span>
          </Radio>
        </Navbar>
        <div>
          {filteredCoffees.length === 0 ? (
            <p>Nenhum café encontrado.</p>
          ) : (
            filteredCoffees.map((coffee) => (
              <Link key={coffee.id} to={`/coffees/${coffee.id}`}>
                <CoffeeCard
                  coffee={coffee}
                  incrementQuantity={incrementQuantity}
                  decrementQuantity={decrementQuantity}
                  handleFavoriteCoffee={handleFavoriteCoffee}
                />
              </Link>
            ))
          )}
        </div>
      </CoffeeList>
    </div>
  );
}