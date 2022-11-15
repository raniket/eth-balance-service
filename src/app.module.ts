import { Module } from '@nestjs/common';
import { BalanceModule } from './balance/balance.module';
import { ConfigModule } from '@nestjs/config';
import config from './common/config';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, load: [config] }),
        BalanceModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }
