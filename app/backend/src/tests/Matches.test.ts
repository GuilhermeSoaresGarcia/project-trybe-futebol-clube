import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
// import Token from '../helpers/Token'

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('/leaderboard', () => {
  describe('GET', () => {
    it('os dados apareçam corretamente na tela de partidas no frontend', async () => {
      // const token = await Token.generateToken(data)
      const response = await chai.request(app).get('/matches');
      expect(response.status).to.be.eq(200);
      expect(response.body).to.be.an('array');
    });
  });
})
