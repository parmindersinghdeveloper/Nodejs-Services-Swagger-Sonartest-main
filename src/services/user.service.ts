// src/items/items.service.ts
import { GenerateAccessToken } from "../common/generate-access-token";
import express, { Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
/**
 * Data Model Interfaces
 */
import { Coin, User } from "../models/index";

interface loginAttr {
  email: string;
  password: string;
}

//function for login
export const login = (req_data: loginAttr) => {
  let resp_ = {
    status: "",
    message: "",
    data: {},
  };

  //handles null error
  if (!req_data.email || req_data.email == "") {
    resp_.status = "fail";
    resp_.message = "Email is required";
    return resp_;
  }

  if (!req_data.password || req_data.password == "") {
    resp_.status = "fail";
    resp_.message = "Password is required";
    return resp_;
  }

  // Retrieve all RestrictionFields from the database.

  var condition = {
    email: req_data.email,
    password_hint: req_data.password,
  };

  return User.findAll({ where: condition })
    .then((data: any) => {
      if (data.length == 0) {
        resp_.status = "fail";
        resp_.message = "User not found";
        return resp_;
      } else {
        let user = data[0];
        resp_.status = "success";
        resp_.message = "Login Success";
        resp_.data = data[0];
        const access_token: string = GenerateAccessToken(req_data.email);
        user.access_token = access_token;
        return User.update(
          {
            access_token: access_token,
          },
          {
            where: { user_id: user.user_id },
          }
        ).then((reps) => {
          return resp_;
        });
      }
    })
    .catch((err) => {
      resp_.status = "fail";
      resp_.message = err.message || "Some error occurred";
      return resp_;
    });
};

//function for dashbobar
export const dashboardData = () => {
  //handles null error

  let resp_ = {
    status: "",
    message: "",
    data: {},
  };

  return Coin.findAll({
    order: [["id", "DESC"]],
  })
    .then(function (data) {
      //only difference is that you get users list limited to 1
      resp_.status = "success";
      if (data.length == 0) {
        resp_.message = "No data found";
        resp_.data = data;
      } else {
        resp_.data = data;
      }
      return resp_;
    })
    .catch((err) => {
      resp_.status = "fail";
      resp_.message = err.message || "Some error occurred";
      return resp_;
    });
};
