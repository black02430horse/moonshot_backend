import express, { Express } from "express";
import cors from "cors";
import bodyParser, { json as bodyParserJSON } from "body-parser";
import { ROUTE_VERSION } from "config";
import { MESSAGES } from "consts";
import appRoutes from 'routes';
import { requestLoggerMiddleware, errorHandlerMiddleware } from "middlewares";
import fileUpload from "express-fileupload";

const port = process.env.PORT || 8000;

const backendSetup = (app: Express) => {
  app.use(express.json());
  app.use(cors());
  app.use(bodyParserJSON());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(requestLoggerMiddleware);
  app.use(fileUpload({
    createParentPath: true,
    abortOnLimit: true,
    limits: {fileSize: 1000*1024*1024},
    useTempFiles: true,
    tempFileDir: '/tmp/',
    safeFileNames: true,
    preserveExtension: true
  }));
  app.use(`/api/${ROUTE_VERSION}`, appRoutes);
  app.use(errorHandlerMiddleware);
  const server = app.listen(port, () => {
    console.info(MESSAGES.SERVER_RUN_SUCCESS);
  })
}

export default backendSetup;