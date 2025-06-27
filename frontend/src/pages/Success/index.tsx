import { CurrencyDollar, MapPin, Timer } from '@phosphor-icons/react'
import { useTheme } from 'styled-components'
import { useParams } from 'react-router-dom'

import { useCart } from '../../hooks/useCart'
import { Container, Heading, Info, InfoContent, Order } from './styles'

const paymentMethod = {
  credit: 'Cartão de crédito',
  debit: 'Cartão de débito',
  cash: 'Dinheiro',
  pix: 'Pix',
} as const;

type PaymentMethodKey = keyof typeof paymentMethod;

export function Success() {
  const { orders } = useCart()
  const { orderId } = useParams()
  const orderInfo = orders.find((order) => order.id === Number(orderId))
  const theme = useTheme()

  if (!orderInfo?.id) {
    return <h2>Pedido não encontrado.</h2>
  }

  // Cálculo do subtotal e total
  const subtotal = orderInfo.items.reduce((acc, item) => acc + (item.price * item.quantity), 0)
  const shipping = 7.5 // ou o valor real do frete, se houver no orderInfo
  const total = subtotal + shipping

  return (
    <Container>
      <Order>
        <Heading>
          <h2>Uhu! Pedido confirmado</h2>
          <span>Agora é só aguardar que logo o café chegará até você</span>
        </Heading>

        <Info>
          <InfoContent>
            <div>
              <MapPin
                color={theme.colors.white}
                style={{ backgroundColor: theme.colors.purple }}
                size={32}
              />

              <div>
                <span>
                  Entrega em <strong>{orderInfo.address}</strong>
                  <br />
                  {/* Adicione outros detalhes do endereço se houver */}
                </span>
              </div>
            </div>

            <div>
              <Timer
                color={theme.colors.white}
                style={{ backgroundColor: theme.colors.yellow }}
                size={32}
              />

              <div>
                <span>Previsão de entrega</span>
                <strong>20 min - 30 min</strong>
              </div>
            </div>

            <div>
              <CurrencyDollar
                color={theme.colors.white}
                style={{ backgroundColor: theme.colors['yellow-dark'] }}
                size={32}
              />

              <div>
                <span>Pagamento na entrega</span>
                <strong>
                  {paymentMethod[orderInfo.paymentMethod as PaymentMethodKey]}
                </strong>
              </div>
            </div>
          </InfoContent>
        </Info>

        {/* Resumo do Pedido */}
        <div style={{ marginTop: 32 }}>
          <span>Resumo do Pedido:</span>
          <ul>
            {orderInfo.items.map((item) => (
              <li key={item.id}>
                {item.quantity}x {item.name} &nbsp; R$ {(item.price * item.quantity).toFixed(2)}
              </li>
            ))}
          </ul>
          <div>
            Frete: R$ {shipping.toFixed(2)} <br />
            <strong>Total: R$ {total.toFixed(2)}</strong>
          </div>
        </div>
      </Order>

      <img src="/images/delivery.svg" alt="Pedido concluído" />
    </Container>
  )
}