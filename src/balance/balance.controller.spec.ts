import { Test } from '@nestjs/testing';
import { EtherService } from '../ether/ether.service';
import { BalanceController } from './balance.controller';
import { BalanceService } from './balance.service';

describe('BalanceController', () => {
    describe('Test success scenario', () => {
        let controller: BalanceController;

        beforeEach(async () => {
            const moduleRef = await Test.createTestingModule({
                controllers: [BalanceController],
                providers: [BalanceService],
            })
                .useMocker((token) => {
                    const result = {
                        address: '0x0000000000000000000000000000000000000000',
                        balance: 0.01
                    }
                    if (token === EtherService) {
                        return { getBalance: jest.fn().mockResolvedValue(result) };
                    }
                })
                .compile();

            controller = moduleRef.get(BalanceController);
        });

        it('should be defined', () => {
            expect(controller).toBeDefined();
        });

        it('should fetch the balances', async () => {
            const input = [
                '0x0000000000000000000000000000000000000000',
                '0x0000000000000000000000000000000000000001',
                '0x0000000000000000000000000000000000000002'
            ];

            const result = await controller.getTotalBalance(input);

            expect(result.addresses).toBeDefined();
            expect(result.totalBalance).toBeDefined();

            expect(result.addresses).toBeInstanceOf(Array);
            expect(result.totalBalance).toBe(0.03);
        });
    });

    describe('Test failure scenario', () => {
        let controller: BalanceController;

        beforeEach(async () => {
            const moduleRef = await Test.createTestingModule({
                controllers: [BalanceController],
                providers: [BalanceService],
            })
                .useMocker((token) => {
                    if (token === EtherService) {
                        return { getBalance: jest.fn().mockRejectedValue('Could not fetch the balance') };
                    }
                })
                .compile();

            controller = moduleRef.get(BalanceController);
        });

        it('should throw an error', () => {
            expect(controller).toBeDefined();
        });

        it('should fetch the balances', async () => {
            const input = [
                '0x0000000000000000000000000000000000000000',
                '0x0000000000000000000000000000000000000001',
                '0x0000000000000000000000000000000000000002'
            ];

            try {
                await controller.getTotalBalance(input);
            } catch (error) {
                expect(error).toBeDefined();
                expect(error).toBe('Could not fetch the balance');
            }
        });
    });
});
