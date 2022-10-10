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
    it(`filtrar a classificação geral dos times na tela de 
    classificação do frontend com os dados iniciais do banco de dados`, async () => {
      const response = await chai.request(app).get('/leaderboard');
      expect(response.status).to.be.eq(200);
      expect(response.body).to.be.an('array');
      expect(response.body).with.lengthOf(16)
    });
    it(`filtrar a classificações dos times quando mandantes na tela de
    classificação do frontend com os dados iniciais do banco de dados`, async () => {
      const response = await chai.request(app).get('/leaderboard/home');
      expect(response.status).to.be.eq(200);
      expect(response.body).to.be.an('array');
      expect(response.body).with.lengthOf(16)
    });
    it(`filtrar a classificações dos times quando visitantes na tela de 
    classificação do frontend com os dados iniciais do banco de dados`, async () => {
      const response = await chai.request(app).get('/leaderboard/away');
      expect(response.status).to.be.eq(200);
      expect(response.body).to.be.an('array');
      expect(response.body).with.lengthOf(16)
    });
  });
})
