import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TransactionModule } from './transaction/transaction.module';
import { WalletModule } from './wallet/wallet.module';

@Module({
  imports: [AuthModule, UserModule, TransactionModule, WalletModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
