import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { CoffeesModule } from './coffees/coffees.module';
import { TagsModule } from './tags/tags.module';
import { CartModule } from './cart/cart.module';
import { CheckoutModule } from './checkout/checkout.module';
import { AppController } from './app.controller';


@Module({
  imports: [
    PrismaModule,
    CoffeesModule,
    TagsModule,
    CartModule,
    CheckoutModule,
  ],
  controllers: [
    AppController, // Adicionando AppController para gerenciar a rota "/"
  ],
})
export class AppModule {}
