export class BalanceDto {
    addresses: AddressBalanceDto[];
    totalBalance: number;
}

export class AddressBalanceDto {
    address: string;
    balance: number;
}