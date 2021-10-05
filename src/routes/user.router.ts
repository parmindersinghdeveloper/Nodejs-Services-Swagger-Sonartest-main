/**
 * Required External Modules and Interfaces
 */
 var should = require("chai").should();
 import express, { Request, Response, NextFunction } from "express";
 import * as UserService from "../services/user.service";
 import { AuthenticateToken } from "../common/AuthenticateToken";
 /**
  * Router Definition
  */
 
 export const userRouter = express.Router();
 
 /**
  * Controller Definitions
  */
 
 // GET items
 
 userRouter.post(
   "/login",
   async (req: Request, res: Response, next: NextFunction) => {
     try {
       const resp_data: any = await UserService.login(req.body);
       console.log(resp_data, 'resp_data')
       if(resp_data && resp_data.status=='success'){
         res.send(resp_data);
       }else{
         res.status(500).send(resp_data);
       }
     } catch (e) {
       res.status(500).send({
         status: 'fail',
         message: e.message
       });
     }
   }
 );
 
 //authenticated API for dashboard
 userRouter.get(
   "/dashboard",
   AuthenticateToken,
   async (req: Request, res: Response, next: NextFunction) => {
     try {
       const resp_data: any = await UserService.dashboardData();
 
       if(resp_data && resp_data.status=='success'){
         res.send(resp_data);
       }else{
         res.status(500).send(resp_data);
       }
     } catch (e) {
       res.status(500).send({
         status: 'fail',
         message: e.message
       });
     }
   }
 );
 