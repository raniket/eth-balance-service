import { Test, TestingModule } from '@nestjs/testing';
import { BalanceService } from './balance.service';
import { EtherService } from '../ether/ether.service';

describe('BalanceService', () => {

    describe('Test success scenario', () => {
        let service: BalanceService;

        beforeEach(async () => {
            const module: TestingModule = await Test.createTestingModule({
                providers: [BalanceService],
            }).useMocker((token) => {
                const result = {
                    address: '0x0000000000000000000000000000000000000000',
                    balance: 0.01
                }
                if (token === EtherService) {
                    return { getBalance: jest.fn().mockResolvedValue(result) };
                }
            })
                .compile();

            service = module.get<BalanceService>(BalanceService);
        });

        it('should be defined', () => {
            expect(service).toBeDefined();
        });

        it('should fetch the balances', async () => {
            const input = ['0x0000000000000000000000000000000000000000', '0x0000000000000000000000000000000000000001']
            const result = await service.getTotalBalance(input);

            expect(result.addresses).toBeDefined();
            expect(result.totalBalance).toBeDefined();

            expect(result.addresses).toBeInstanceOf(Array);
            expect(result.totalBalance).toBe(0.02);
        });
    });

    describe('Test failure scenario', () => {
        let service: BalanceService;

        beforeEach(async () => {
            const module: TestingModule = await Test.createTestingModule({
                providers: [BalanceService],
            }).useMocker((token) => {
                if (token === EtherService) {
                    return { getBalance: jest.fn().mockRejectedValue('Could not fetch the balance') };
                }
            })
                .compile();

            service = module.get<BalanceService>(BalanceService);
        });

        it('should be defined', () => {
            expect(service).toBeDefined();
        });

        it('should throw an error', async () => {
            const input = ['0x0000000000000000000000000000000000000000', '0x0000000000000000000000000000000000000001'];
            try {
                await service.getTotalBalance(input);
            } catch (error) {
                expect(error).toBeDefined();
                expect(error).toBe('Could not fetch the balance');
            }
        });
    });
});
