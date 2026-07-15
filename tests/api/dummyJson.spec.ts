import { expect, test } from "../../utils/fixtures";

const body = {
    username: "emilys",
    password: "emilyspass",
};

const BASE_URL_DUMMY_JSON = 'https://dummyjson.com';
const LOGIN_ENDPOINT_PATH_DUMMY_JSON = `${BASE_URL_DUMMY_JSON}/auth/login`;

test.describe('call the dummy json api', ()=>{

    test('Fetch - call the /login', async () => {
        const response = await fetch(LOGIN_ENDPOINT_PATH_DUMMY_JSON, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const jsonResponse = await response.json();

        expect(response.status).toBe(200);
        expect(jsonResponse.accessToken).toBeTruthy();
    });
})
