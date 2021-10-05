/**
 * Required External Modules and Interfaces
 */
 import express, { Request, Response, NextFunction } from "express";

/**
 * Router Definition
 */
 

export const mainRouter = express.Router();

/**
 * Controller Definitions
 */

// GET items

mainRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).send('OK');
    } catch (e) {
      res.status(500).send(e.message);
    }
  });
  
  
