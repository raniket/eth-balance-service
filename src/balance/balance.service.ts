import { Injectable } from '@nestjs/common';
import { BalanceDto } from './dto/response/balance.dto';
import { EtherService } from '../ether/ether.service';

@Injectable()
export class BalanceService {

    constructor(
        private readonly etherService: EtherService
    ) { }

    public async getTotalBalance(addresses: string[]): Promise<BalanceDto> {
        const promises = addresses.map(address => this.etherService.getBalance(address));
        const addressBalances = await Promise.all(promises);
        const response: BalanceDto = {
            addresses: addressBalances,
            totalBalance: 0
        };
        response.totalBalance = response.addresses.reduce((acc, cur) => acc + cur.balance, 0);
        return response;
    }
}
