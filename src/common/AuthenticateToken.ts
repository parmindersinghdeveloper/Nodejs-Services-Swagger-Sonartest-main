import { Request, Response, NextFunction } from "express";

const jwt = require('jsonwebtoken');

export function AuthenticateToken(req: any, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  let resp_: any = {
    status: "",
    message: "",
    data: {},
  };
  
  if (token == null) {
    resp_.status="fail";
    resp_.message="Unauthorised";

    return res.status(401).send(resp_);
  }

  jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
    console.log(err)

    if (err) return res.sendStatus(403)

    req.user = user

    next()
  })
}