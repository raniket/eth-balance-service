import * as ethers from 'ethers';
import { Inject, Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { EtherModuleOptions } from "./ether-module-options.interface";
import { MODULE_OPTIONS_TOKEN } from "./ether.module-definition";
import { Logger } from '../common/logger/logger.service';

export class IAddressBalance {
    address: string;
    balance: number;
}

@Injectable()
export class EtherService {

    private readonly provider: ethers.providers.BaseProvider;

    constructor(
        @Inject(MODULE_OPTIONS_TOKEN) private options: EtherModuleOptions,
        private readonly logger: Logger
    ) {
        this.provider = ethers.getDefaultProvider(options.network);
    }

    public async getBalance(address: string): Promise<IAddressBalance> {
        this.logger.log('Fetching balance...')
        try {
            const balance = await this.provider.getBalance(address);
            const balanceInEth = ethers.utils.formatEther(balance);
            return {
                address: address,
                balance: parseFloat(balanceInEth)
            };
        } catch (error) {
            this.logger.error('Error while fetching balance', [error.message]);
            throw new Error('Could not fetch the balance')
        }
    }
}
