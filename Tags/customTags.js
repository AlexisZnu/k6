import http from 'k6/http';
import { Counter } from 'k6/metrics';
import { check, sleep } from 'k6';

//En las opciones se definen los umbrales
export const options = {
    thresholds : {
        http_req_duration:['p(95)<1000'],
        'http_req_duration{page:order}' : ['p(95)<1000'],
        http_errors: ['count==0'],
        checks: ['rate>=0.99'],
        'checks{page:order}': ['rate>=0.99']
    }
}

//Se crea una metrica personalizada, Esto cuenta esencialmente los errores HTTP
let httpErrors = new Counter('http_errors');

export default function(){
    //?mocky-delay=100ms, parámetro a tu URL simulada para retrasar la respuesta. Retraso máximo: 60 s.
    let res = http.get(
        'https://run.mocky.io/v3/264761e3-9504-4272-8150-3ca26ff13ea6?mocky-delay=100ms',
        // se puede proporcionar acá algunos params, datos adicionales escencialmente, por ende se crea un objeto {}
        {
//dentro el objeto lo que se hace es definir una propiedad llamada tags

        tags: {
        //dentro de la propiedad tags, dentro de este objeto, lo que se hace es definir las etiquetas
            page: 'order'
        }

        }
    );

    //cada vez que se produce un error, los errores http se incrementan
    if(res.error){
        httpErrors.add(1);
    }

    check(res,{
        'status is 200': (r) => r.status = 200
    });

    res = http.get('https://run.mocky.io/v3/8f10fa43-9f9e-4eef-936b-eb2972f92540');

    if(res.error){
        //un objeto con una propiedad orden de pagina
        httpErrors.add(1), {page : order};
    }

    //tambien se puede taguear os checks
    check(res,{
        'status is 201': (r) => r.status = 201
    },{page : 'order'});

    sleep(1);

}