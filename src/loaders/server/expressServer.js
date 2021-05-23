const express = require("express");
const config = require("../../config");
const morgan = require('morgan');

class ExpressServer {
    constructor() {
        this.app = express();
        this.port = config.port;
        this.basePath = config.api.prefix;

        this._middlewares();
        this._routes();
    }

    /* va con _ porque es una funcion privada */
    _middlewares() {
        this.app.use(express.json());
        this.app.use(morgan('tiny'))
    }

    _routes() {
        //request para testear desde produccion si la aplicacion esta viva
        this.app.head("/status", (req, res) => {
            res.status(200).end();
        });
        this.app.use(`${this.basePath}/users`, require("../../routes/users"));
    }

    async start() {
        this.app.listen(this.port, (error) => {
            //valido si el puerto esta libre o esta en uso
            if (error) {
                console.log(error);
                process.exit(1);
                return;
            }
        });
    }
}

module.exports = ExpressServer;
