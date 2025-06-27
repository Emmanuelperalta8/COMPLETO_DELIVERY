import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const coffees = [
  {
    name: "Expresso Tradicional",
    description: "O tradicional café feito com água quente e grãos moídos",
    tags: ["tradicional"],
    price: 9.9,
    imageUrl: "/images/coffees/expresso.png",
  },
  {
    name: "Expresso Americano",
    description: "Expresso diluído, menos intenso que o tradicional",
    tags: ["tradicional"],
    price: 9.9,
    imageUrl: "/images/coffees/americano.png",
  },
  {
    name: "Expresso Cremoso",
    description: "Café expresso tradicional com espuma cremosa",
    tags: ["tradicional"],
    price: 9.9,
    imageUrl: "/images/coffees/expresso-cremoso.png",
  },
  {
    name: "Expresso Gelado",
    description: "Bebida preparada com café expresso e cubos de gelo",
    tags: ["tradicional", "gelado"],
    price: 9.9,
    imageUrl: "/images/coffees/cafe-gelado.png",
  },
  {
    name: "Café com Leite",
    description: "Meio a meio de expresso tradicional com leite vaporizado",
    tags: ["tradicional", "com leite"],
    price: 9.9,
    imageUrl: "/images/coffees/cafe-com-leite.png",
  },
  {
    name: "Latte",
    description: "Uma dose de café expresso com o dobro de leite e espuma cremosa",
    tags: ["tradicional", "com leite"],
    price: 9.9,
    imageUrl: "/images/coffees/latte.png",
  },
  {
    name: "Capuccino",
    description: "Bebida com canela feita de doses iguais de café, leite e espuma",
    tags: ["tradicional", "com leite"],
    price: 9.9,
    imageUrl: "/images/coffees/capuccino.png",
  },
  {
    name: "Macchiato",
    description: "Café expresso misturado com um pouco de leite quente e espuma",
    tags: ["tradicional", "com leite"],
    price: 9.9,
    imageUrl: "/images/coffees/macchiato.png",
  },
  {
    name: "Mocaccino",
    description: "Café expresso misturado com um pouco de leite quente e espuma",
    tags: ["tradicional", "com leite"],
    price: 9.9,
    imageUrl: "/images/coffees/mocaccino.png",
  },
  {
    name: "Chocolate Quente",
    description: "Bebida feita com chocolate dissolvido no leite quente e café",
    tags: ["especial", "com leite"],
    price: 9.9,
    imageUrl: "/images/coffees/chocolate-quente.png",
  },
  {
    name: "Cubano",
    description: "Drink gelado de café expresso com rum, creme de leite e hortelã",
    tags: ["especial", "alcoólico", "gelado"],
    price: 9.9,
    imageUrl: "/images/coffees/cubano.png",
  },
  {
    name: "Havaiano",
    description: "Bebida adocicada preparada com café e leite de coco",
    tags: ["especial"],
    price: 9.9,
    imageUrl: "/images/coffees/havaiano.png",
  },
  {
    name: "Árabe",
    description: "Bebida preparada com grãos de café árabe e especiarias",
    tags: ["especial"],
    price: 9.9,
    imageUrl: "/images/coffees/arabe.png",
  },
  {
    name: "Irlandês",
    description: "Bebida a base de café, uísque irlandês, açúcar e chantilly",
    tags: ["especial", "alcoólico"],
    price: 9.9,
    imageUrl: "/images/coffees/irlandes.png",
  },
];

async function main() {
  console.log("Populando o banco de dados com cafés...");

  for (const coffee of coffees) {
    const createdCoffee = await prisma.coffee.create({
      data: {
        name: coffee.name,
        description: coffee.description,
        price: coffee.price,
        imageUrl: coffee.imageUrl,
        tags: {
          create: coffee.tags.map((tag) => ({
            tag: {
              connectOrCreate: {
                where: { name: tag },
                create: { name: tag },
              },
            },
          })),
        },
      },
    });

    console.log(`Café criado: ${createdCoffee.name}`);
  }

  console.log("Banco de dados populado com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
