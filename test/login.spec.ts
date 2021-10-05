import { expect } from "chai";
import request from "supertest";
import getServer from "../src/test_server";
import { Request, Response } from "express";

const app = getServer();
import assert from "assert";
import faker from "faker";
import sinon from "sinon";
import * as UserService from "../src/services/user.service";
import { User, UserAttributes } from "../src/models/user.model";
import proxyquire from "proxyquire";
const { makeMockModels } = require("sequelize-test-helpers");

const mockModels = makeMockModels({ User: { findAll: sinon.stub(), update: sinon.stub() } });

const ServiceFunc = proxyquire("../src/services/user.service.ts", {
  "../models": mockModels,
});

describe("UserService -> Login Function", () => {
  const data = [
    {
      user_id: faker.datatype.number(),
      username: "user",
      email: "admin@gmail.com",
      password: "123456",
      password_hint: "123456",
      access_token: "eyJhbGciOiJIUzI1NiJ9.YWRtaW5AZ21haWwuY29t.546546456456456456456456",
      created_on: faker.date.past(),
      updated_on: faker.date.past(),
    },
  ];
  const resetStubs = () => {
    mockModels.User.findAll.resetHistory();
    mockModels.User.update.resetHistory()

  };
  let result: any;
  const req = {};
  const res = {};

  const LoginDetails = {
      email: '********************',
      password: '********'
  }
  context("user does not exist (-V)", () => {
    before(async () => {
      mockModels.User.findAll.resolves([]);
      result = await ServiceFunc.login(LoginDetails);
    });

    after(resetStubs);

    it("returned Blank", () => {
      expect(result).to.have.property('status');
      expect(result).to.have.property('message');
      expect(result).to.have.property('data');
    //   expect(result.data.length).to.equal(0);
    });
  });


  context("User exists with response object (+v)", () => {
    before(async () => {
      mockModels.User.findAll.resolves(data);
      mockModels.User.update.resolves(data);

      result = await ServiceFunc.login(LoginDetails);
    });
    after(resetStubs);

    it('returned the user', () => {
        expect(result).to.have.property('status');
        expect(result).to.have.property('message');
        expect(result).to.have.property('data');
        // expect(result.data.length).to.not.equal(0);
    })
  });
});
