import http from 'k6/http';
import { sleep  } from 'k6';
import exec from 'k6/execution'

export const options = {
    vus: 2,
    duration: '5s'
}

console.log ('--- init stage ---');
//En la etapa init lo que estamos haciendo es importando los diferentes modulos que necesitamos
//ej: hacer peticiones Http desde nuestro script, 
//La etapa init también tiene la variable options

export function setup(){

    //podemos enviar algunas peticiones Http para obtener datos
    //Podemos utilizar una llamada a la API para iniciar un entorno y luego esperar un poco hasta que entono esté listo
    console.log('--- setup stage ---');

    let res = http.get('https://test.k6.local/status');

    if(res.error){
        exec.test.abort('Aborting test. Aplication is DOWN');
    }
}

export default function (){
    console.log('--- VU stage ---');
}

export function teardown (data){
    //podemos utilizar algunas llamadas a la API y esensialmente derribar ese entorno, pero tenemos que saber cuándo hacerlo   
    //tambien tiene acciso a los datos que tenemos en la configuración
    console.log ('--- Teardown stage ---');
}