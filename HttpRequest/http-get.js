import http from 'k6/http';
import { check } from 'k6';

export default function(){
    let res = http.get('https://test-api.k6.io/public/crocodiles/');

    const crocodile = res.json();
    const crocodileID = crocodile[0].id;
    const crocodileName = crocodile[0].name;

    res = http.get(`https://test-api.k6.io/public/crocodiles/${crocodileID}/`);

    console.log(res);
    //console.log(res.headers.Allow);
    console.log(res.headers['Content-Type']);

    check (res,{
        'status is 200' : (r) => r.status ===200,
        'Crocodile name' : (r) => r.json().name === crocodileName
    });
}