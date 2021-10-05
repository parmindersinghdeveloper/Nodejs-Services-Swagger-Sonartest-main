import {expect} from "chai";
import request  from "supertest";
import getServer from "../src/test_server";
const app = getServer();


describe('Server checks', function(){
    it('server is created without error', function(done){
        request(app).get('/').expect(200, done);
    })
})  