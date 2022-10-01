import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
// import UserModel from '../database/models/UserModel';

// import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('/login', () => {
  describe('POST', () => {
    it('permita o acesso com dados válidos no front-end', async () => {
      const response = await chai.request(app).post('/login').send({
        email: 'user@user.com',
        password: 'secret_user'
      });
      expect(response.status).to.be.eq(200);
      expect(response.body.token).to.be.an('string')
    });

    it('não permita o acesso sem informar um email no front-end', async () => {
      const response = await chai.request(app).post('/login').send({
        email: '',
        password: 'secret_user'
      });
      expect(response.status).to.be.eq(400);
      expect(response.body.message).to.be.eq('All fields must be filled')
    });

    it('não permita o acesso sem informar uma senha no front-end', async () => {
      const response = await chai.request(app).post('/login').send({
        email: 'user@user.com',
        password: ''
      });
      expect(response.status).to.be.eq(400);
      expect(response.body.message).to.be.eq('All fields must be filled')
    });

    it('não permita o acesso com um email inválido no front-end', async () => {
      const response = await chai.request(app).post('/login').send({
        email: 'email@invalido.com',
        password: 'secret_user'
      });
      expect(response.status).to.be.eq(401);
      expect(response.body.message).to.be.eq('Incorrect email or password')
    });

    it('não permita o acesso com uma senha inválida no front-end', async () => {
      const response = await chai.request(app).post('/login').send({
        email: 'user@user.com',
        password: '9876543210'
      });
      expect(response.status).to.be.eq(401);
      expect(response.body.message).to.be.eq('Incorrect email or password')
    });

  })
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

});
