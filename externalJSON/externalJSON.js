import http from 'k6/http';
import {check} from 'k6';
import {SharedArray} from "k6/data";
import {randomItem} from "https://jslib.k6.io/k6-utils/1.2.0/index.js";

const userCredentials = new SharedArray('users with credentials', function () {
    return JSON.parse(open('./users/user.json')).users;
});

//k6 run --http-debug="full" externalJSON.js

export default function () {

    // userCredentials.forEach((item) => {
    //     const credentials = {
    //         username: 'test_' + item.username,
    //         password: 'test_' + item.password,
    //     };
    const randomUser = randomItem(userCredentials);

    // const res = http.post(
    //     'https://test-api.k6.io/user/register/',
    //     JSON.stringify(credentials),
    //     {
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     }
    // );
    //
    // check(res, {
    //     'status is 201': (r) => r.status === 201,
    // });


    let response = http.post(
        'https://test-api.k6.io/auth/token/login/',
        JSON.stringify(
            {
                username: randomUser.username,
                password: randomUser.password,
            }
        ),
        {
            headers: {
                'Content-Type': 'application/json',
            }
        }
    );


    check(response, {
        'status is 200': (r) => r.status === 200,
        'token is present': (r) => r.json() !== undefined,
    });

    const accestoken = response.json().access;
    console.log(accestoken);
}

