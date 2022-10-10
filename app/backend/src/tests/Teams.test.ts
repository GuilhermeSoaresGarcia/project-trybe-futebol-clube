import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
// import Token from '../helpers/Token'

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('/teams', () => {
  describe('GET', () => {
    it('retorna todos os times corretamente', async () => {
      // const token = await Token.generateToken(data)
      const response = await chai.request(app).get('/teams');
      expect(response.status).to.be.eq(200);
      expect(response.body).to.be.an('array');
      expect(response.body).with.lengthOf(16);
    });
    it('retornar dados de um time específico', async () => {
      // const token = await Token.generateToken(data)
      const response = await chai.request(app).get('/teams/8');
      expect(response.status).to.be.eq(200);
      expect(response.body).to.have.a.property('teamName', 'Grêmio');      
    });
  });
})
