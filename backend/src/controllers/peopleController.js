const Connection = require('../models/connection');

class PeopleController {
  index(request, response) {
    const query = 'SELECT * FROM pessoa';

    Connection.query(query, (err, result) => {
      if (err) {
        response.status(500).send('Erro ao obter alunos');
      }
      return response.json(result);
    });
  }

  getAll(request, response) {
    const query =
      'SELECT * FROM pessoa INNER JOIN formacao WHERE pessoa.id = formacao.idpessoa';

    Connection.query(query, (err, result) => {
      if (err) {
        response.status(500).send('Erro ao obter alunos');
      }
      return response.json(result);
    });
  }

  create(request, response) {
    console.log(request.body);
    response.send({ status: 'SUCCESS' });
  }
}

module.exports = PeopleController;
