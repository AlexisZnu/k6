import http from 'k6/http'
import { sleep } from 'k6';

export const options = {
    //Definir una configuración de etapas, será un array
    stages:[
        {
            duration: '2h',
            //es el objetivo que queremos alcanzar
            taget:1000000
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