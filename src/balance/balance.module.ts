import { Module } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { BalanceController } from './balance.controller';
import { EtherModule } from '../ether/ether.module';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
        EtherModule.registerAsync({
            useFactory: (config: ConfigService) => ({
                network: config.get('ETHER_NETWORK'),
            }),
            inject: [ConfigService]
        }),
    ],
    controllers: [BalanceController],
    providers: [BalanceService]
})
export class BalanceModule { }
