import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import Token from '../helpers/Token'

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('/login/validate', () => {
  describe('GET', () => {
    it('retorne os dados corretamente no front-end', async () => {
      const data = {
        id: 1,
        username: 'user@user.com'
      }
      const token = await Token.generateToken(data)
      const response = await chai.request(app).get('/login/validate').set('Authorization', token);
      expect(response.status).to.be.eq(200);
      expect(response.body).to.have.a.key('role');
    });
  });
})
