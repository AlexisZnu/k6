import http from 'k6/http'
import { sleep } from 'k6';

export const options = {
    //Definir una configuración de etapas, será un array
    stages:[
        {
            duration: '5m',
            //es el objetivo que queremos alcanzar
            target:100
        },
        {
            //permanecemos acá durante 30m
            duration: '8h',
            taget:100
        },
        {
            //durante 5min pasaremos de 100 a 0
            duration: '5m',
            taget:0
        }
    ] ,
    
} 

export default function(){
    http.get('https://test.k6.io');
    sleep(1);

    http.get('https://test.k6.io/contacts.php');

    sleep(2)

    http.get('https://test.k6.io/news.php');
    sleep(2)
}