import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    const coffees = await prisma.coffee.findMany() // Substitua "coffee" pelo nome da tabela no seu schema.prisma
    console.log('Conexão bem-sucedida! Dados encontrados:', coffees)
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
