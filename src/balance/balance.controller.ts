import { Controller, Get, Query } from '@nestjs/common';
import { AddressValidator } from '../common/validator/address-validator';
import { BalanceService } from './balance.service';
import { BalanceDto } from './dto/response/balance.dto';

@Controller('v1/balance')
export class BalanceController {
    constructor(private readonly balanceService: BalanceService) { }

    @Get()
    async getTotalBalance(@Query('addresses', new AddressValidator) addresses: string[]): Promise<BalanceDto> {
        return this.balanceService.getTotalBalance(addresses);
    }
}
