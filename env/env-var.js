import http from 'k6/http';
import { sleep } from 'k6';
import {randomIntBetween} from "https://jslib.k6.io/k6-utils/1.2.0/index.js";
import {randomString} from "https://jslib.k6.io/k6-utils/1.2.0/index.js";
import {randomItem} from "https://jslib.k6.io/k6-utils/1.2.0/index.js";
import {SharedArray} from "k6/data";

const userCredentials = new SharedArray('users with credentials',  function () {
    return JSON.parse(open('./users/user.json')).users;
});

console.log(userCredentials);

export const options = {
    vus: 5,
    duration: '10s',
}
export default function () {

    const credentials = {
        username: 'test_' + randomString(8),
        pasword: 'test_' + randomString(8),
    }
    let res = http.get(`${__ENV.BASE_URL}/publc/cocodriles/`);

    const crocodilers = res.json();
    const crocodilesId = crocodilers.map(crocodiler => crocodiler.id);
    const croco = randomItem(crocodilesId);
    sleep(randomIntBetween(1, 5));
}