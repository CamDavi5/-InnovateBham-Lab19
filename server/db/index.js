var mysql = require('mysql');
import Chirps from './chirps';

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'innovatebham',
    password: 'garrettGarf',
    database: 'chirpr'
});

export const Query = (query, values) => {
    return new Promise((resolve, reject) => {
        connection.query(query, values, (err, res) => {
            if (err) return reject(err);
            return resolve(res);
        })
    })
}

export default {
    Chirps
}