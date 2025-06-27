import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { api } from '../../services/api'

interface Tag {
  id?: string | number
  name: string
}

interface Coffee {
  id: string | number
  name: string
  imageUrl: string
  description: string
  price: number
  tags: Tag[] | string[]
  // Adicione outros campos se necessário
}

export function CoffeeDetails() {
  const { id } = useParams<{ id: string }>()
  const [coffee, setCoffee] = useState<Coffee | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    api.get(`/coffees/${id}`)
      .then(res => setCoffee(res.data))
      .catch(err => {
        console.error(err)
        setCoffee(null)
      })
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <p>Carregando...</p>
  if (!coffee) return <p>Café não encontrado.</p>

  return (
    <div>
      <h2>{coffee.name}</h2>
      <img src={coffee.imageUrl} alt={coffee.name} />
      <p>{coffee.description}</p>
      <p>Preço: R$ {Number(coffee.price).toFixed(2)}</p>
      {coffee.tags && coffee.tags.length > 0 && (
        <ul>
          {coffee.tags.map((tag, i) => {
            if (typeof tag === 'string') {
              return <li key={tag}>{tag}</li>
            }
            return <li key={tag.id ?? tag.name}>{tag.name}</li>
          })}
        </ul>
      )}
      {/* Adicione outros atributos que quiser mostrar */}
    </div>
  )
}