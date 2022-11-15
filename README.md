## Author Name
Raniket Ram

## Project Title
eth-balance-service

## Description

This is a simple service that can be used to get the balance of Ethereum addresses. It uses Goerli network, but can be configured to use any other network.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## License

[MIT licensed](LICENSE).

## Sample Request

```bash
curl -X GET "http://localhost:3000/v1/balance?addresses=0x0000000000000000000000000000000000000000,0x0000000000000000000000000000000000000001" -H "accept: application/json"
```

## Sample Response

```json
{
    "addresses": [
        {
            "address": "0x0000000000000000000000000000000000000000",
            "balance": 3175.0612338614656
        },
        {
            "address": "0x0000000000000000000000000000000000000001",
            "balance": 33.28107343778957
        }
    ],
    "totalBalance": 3208.342307299255
}
```

