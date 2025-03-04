import http from 'k6/http';
import {check} from 'k6';

export default function () {

    const credentials = {
        //para hacer el nombre del usuario dinamico con el objeto Date
        username: 'test_' + Date.now(),
        password: 'secret_' + Date.now(),
    }

    http.post('https://test-api.k6.io/user/register/',
        JSON.stringify(credentials),
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );

    let res = http.post('https://test-api.k6.io/auth/token/login/',
        JSON.stringify(
            {
                username: credentials.username,
                password: credentials.password,
            }
        ),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    const accessToken = res.json().access;
    console.log(accessToken);

    http.get('https://test-api.k6.io/my/crocodiles/',
        {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        }
    );

    let croco = http.post('https://test-api.k6.io/my/crocodiles/',
        JSON.stringify(
            {
                name: 'Ale Croc',
                sex: 'M',
                date_of_birth: '2020-01-01',

            }
        ),
        {
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            }
        }
    );

    console.log(croco.json().id);

    const newCrocoID = croco.json().id;
    const crocodile =http.get(
        `https://test-api.k6.io/my/crocodiles/${newCrocoID}`,
        {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        }
    );

    check(crocodile,{
        'status is 200': (r) => r.status ===200,
        'croco id' : (r) => r.json().id === newCrocoID
    });

    console.log(crocodile);
}