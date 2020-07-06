import _ from "lodash"

let config =
{
    mysql: {
        connectionLimit: 2,
        host: 'localhost',
        user: 'set user in private.config.js',
        password: 'set password in private.config.js',
        database: 'brsetran',
        debug: false,
        typeCast(field, next) {
            if(field.type == 'DATETIME') {
                return new Date(field.string() + 'Z');
            }
            return next();
        }
    },
    test: {
        connectionLimit: 2,
        host: '10.0.0.131',
        user: 'set user in private.config.js',
        password: 'set password in private.config.js',
        database: 'brtest',
        debug: false,
        typeCast(field, next) {
            if(field.type == 'DATETIME') {
                return new Date(field.string() + 'Z');
            }
            return next();
        }
    }

};

import privateconfig from "./private.config"

_.merge(config, privateconfig);
export default config;
