import http from 'k6/http'
import {sleep} from 'k6';

//k6 login cloud
//k6 login cloud --token
//k6 cloud .\first-script.js
//k6 run .\first-script.js -o cloud

//la manera en la que se puede ejecutar el script es con el siguiente comando personalizado
//k6 run script.js --vus 1 --duration 10s --iterations 1


//para ejecutar el script para eludir la verificación de certificados
//k6 run script.js --insecure-skip-tls-verify


//output en json
//k6 run script.js --out json=results.json

export const options = {
    vus: 10,
    duration: '20s',
    cloud: {
        proyectID: 3751932
    }

}

export default function () {
    http.get('https://test.k6.io');
    sleep(1);
}