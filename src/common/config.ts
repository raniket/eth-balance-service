import * as dotenv from 'dotenv';
dotenv.config();

function loadEnv(name) {
    if (process.env[name]) {
        return process.env[name];
    }

    throw new Error(`Environment variable ${name} is not defined`);
}

export default (): any => ({
    PORT: parseInt(loadEnv('PORT'), 10),
    ETHER_NETWORK: loadEnv('ETHER_NETWORK'),
});
