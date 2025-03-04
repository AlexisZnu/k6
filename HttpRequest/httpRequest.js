import http from 'k6/http';
import { check } from 'k6';
import { sleep } from 'k6';
import exec from 'k6/execution';
import {Counter, Trend} from 'k6/metrics'


export const options = {
    vus: 10,
    duration: '10s',
    thresholds: {
        http_req_duration : ['p(95) <200'],
        http_req_duration : ['max <2000'],
        //ver de que tipo es el metodo, en este caso es de tipo rate
        http_req_failed : ['rate <0.1'],

        //metodo de agregacion
            //cuantas solicitudes se enviaron
        http_reqs : ['count>20'],
        //
        http_reqs : ['rate>4'],

        vus:['value>=9'],

        //validacion de checks, en %, para en caso de que fallen, se pueda validar que el % esté
        checks : ['rate >= 0.95'],
        response_time_news_page : ['p(95)<180', 'p(99)<200']
    }
}


//definir nuestras propias metricas
//vamos a definir una variable de una metrica simple contador

let myCounter = new Counter('my_counter');
let newsPageResponseTrend = new Trend('response_time_news_page');

export default function(){
   let res = http.get('http://test.k6.io' + (exec.scenario.iterationInTest === 1 ? 'foo' : ''));

   check(res,{
    'status is 200': (r) => r.status === 200
   });

   check(res,{
    //Hacer validaciones que la pagina contiene el siguiente String
    'page is startpage': (r) => r.body.includes('Collection of simple web-pages suitable for load testing')
   });

   myCounter.add(1);

   res = http.get('https://test.k6.io/news.php')
   //obtener la información de la respuesta, pasarla a ma metrica utilizando"add",y por ultimo utilizar los umbrales para vigilar la metrica, y así verificar que es lo que espero
   newsPageResponseTrend.add(res.timings.duration);

   sleep(1);

}