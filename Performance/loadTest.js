import http from 'k6/http'
import { sleep } from 'k6';

export const options = {
    //Definir una configuración de etapas, será un array
    stages:[
        {
            duration: '30s',
            //es el objetivo que queremos alcanzar
            taget:10
        },
        {
            //permanecemos acá durante 30m
            duration: '1m',
            taget:50
        },
        {
            //durante 5min pasaremos de 100 a 0
            duration: '30s',
            taget:0
        }
    ] ,
    
}

export default function () {
    let res = http.get('https://test-api.example.com');
    check(res, { 'status was 200': (r) => r.status === 200 });
    sleep(1);
}