import http from 'k6/http';
import {check} from 'k6';
import {SharedArray} from "k6/data";
import paparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';


const userCredentials = new SharedArray('users with credentials', function () {
   return  paparse.parse(open('./users/users.csv'), {header: true }).data;
});



export default function () {
userCredentials.forEach((item)=> console.log(item.username));
}