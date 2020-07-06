import { cleanEnv, str, port } from 'envalid';

function validateEnv() {
    cleanEnv(process.env, {
        HOST: str(),
        DB_NAME: str(),
        PORT: port(),
        APP_PORT: port(),
        JWT_SECRET: str()
    });
}
export default validateEnv;