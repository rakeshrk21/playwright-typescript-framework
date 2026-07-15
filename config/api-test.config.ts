import dotenv from 'dotenv';
import path from 'node:path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const TEST_ENV = process.env.TEST_ENV || 'dev'

export const config = {
    API_URL: 'https://conduit-api.bondaracademy.com',
    EMAIL: 'tm.rakeshr@gmail.com',
    PASSWORD: 'password123',
}

if(TEST_ENV === 'qa'){
    config.EMAIL = 'tm.rakeshr@gmail.com';
    config.PASSWORD = 'password123';
}

if(TEST_ENV === 'prod'){
    if(!process.env.PASSWORD || !process.env.EMAIL){
        throw new Error('missing password or email');
    }
    config.PASSWORD = process.env.PASSWORD as string;
    config.EMAIL = process.env.EMAIL as string;
}
