const express = require("express");
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const config = require("../../config");
const logger = require('../logger')
// const swagger = require('../')

class ExpressServer {
    constructor() {
        this.app = express();
        this.port = config.port;
        this.basePath = config.api.prefix;

        this._middlewares();
        this._swaggerConfig();
        this._routes();
        this._notFound();
        this._errorHandler();
    }

    /* va con _ porque es una funcion privada */
    _middlewares() {
        this.app.use(express.json());
        this.app.use(morgan("tiny"));
    }

    _routes() {
        //request para testear desde produccion si la aplicacion esta viva
        this.app.head("/status", (req, res) => {
            res.status(200).end();
        });
        this.app.use(`${this.basePath}/users`, require("../../routes/users"));
    }

    _notFound() {
        this.app.use((req, res, next) => {
            const error = new Error("Not Found");
            error.code = 404;
            next(error);
        });
    }

    _errorHandler() {
        this.app.use((err, req, res, next) => {
            const code = err.code || 500;
            logger.error(
                `${code} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
            );
            logger.error(err.stack);
            const body = {
                error: {
                    code,
                    message: err.message,
                },
            };
            res.status(code).json(body);
        });
    }

    _swaggerConfig() {
        this.app.use(
            config.swagger.path,
            swaggerUi.serve,
            swaggerUi.setup(require('../swagger/suagger.json'))
        );
    }

    async start() {
        this.app.listen(this.port, (error) => {
            //valido si el puerto esta libre o esta en uso
            if (error) {
                logger.error(error);
                process.exit(1);
                return;
            }
        });
    }
}

module.exports = ExpressServer;