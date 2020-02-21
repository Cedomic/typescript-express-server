// Packages
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";

// Setup
import logSetup from "../setup/serverLog";
import helmetSetup from "../setup/helmet";
import controllersSetup from "../setup/controllers";

// Utils
import logger from "../utils/logger";
import { Server } from "http";

export const start = (services: Services, port: number): Promise<Server> => {
  return new Promise((resolve, reject) => {
    const app: express.Application = express();

    app.use(logSetup);
    app.use(helmetSetup);
    app.use(cors());
    app.use(express.json());

    app.use((err, req: Request, res: Response, next: NextFunction) => {
      logger.log("error", err, { route: req.originalUrl });
      return res.status(err.httpStatusCode || 500).json(err);
    });

    controllersSetup(app, services);

    // finally we start the server, and return the newly created server
    const server: Server = app.listen(port, () => resolve(server));
  });
};
