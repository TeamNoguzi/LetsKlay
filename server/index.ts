import express from "express";
import bodyParser from "body-parser";
import { RegisterRoutes } from "./build/routes";
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from './build/swagger.json';


export const app = express();

// Use body parser to read sent json payloads
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

RegisterRoutes(app);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));