import { expect } from "chai";
import request from "supertest";
import getServer from "../src/test_server";
import { Request, Response } from "express";

const app = getServer();
import assert from "assert";
import faker from "faker";
import sinon from "sinon";
import * as UserService from "../src/services/user.service";
import { Coin, CoinAttributes } from "../src/models/coin.model";
import proxyquire from "proxyquire";
const { makeMockModels } = require("sequelize-test-helpers");

const mockModels = makeMockModels({ Coin: { findAll: sinon.stub() } });
const ServiceFunc = proxyquire("../src/services/user.service.ts", {
  "../models": mockModels,
});

describe("UserService -> DasboardData Function", () => {
  const data = [
    {
      id: faker.datatype.number(),
      chart_name: "Bitcoin",
      currency_code: "USD",
      currency_symbol: "$",
      currency_rate: "70",
      currency_description: "DESC",
      currency_float: 70.25,
      created_on: faker.date.past(),
      updated_on: faker.date.past(),
    },
  ];
  const resetStubs = () => {
    mockModels.Coin.findAll.resetHistory();
  };
  let result: any;
  const req = {};
  const res = {};


  context("coins does not exist (-V)", () => {
    before(async () => {
      mockModels.Coin.findAll.resolves([]);
      result = await ServiceFunc.dashboardData();
    });

    after(resetStubs);

    it("returned Blank", () => {
      expect(result).to.have.property('status');
      expect(result).to.have.property('message');
      expect(result).to.have.property('data');
      expect(result.data.length).to.equal(0);
    });
  });


  context("coins exists with response object (+v)", () => {
    before(async () => {
      mockModels.Coin.findAll.resolves(data);
      result = await ServiceFunc.dashboardData();
    });
    after(resetStubs);

    it('returned the coin', () => {
        expect(result).to.have.property('status');
        expect(result).to.have.property('message');
        expect(result).to.have.property('data');
        expect(result.data.length).to.not.equal(0);
    })
  });
});
