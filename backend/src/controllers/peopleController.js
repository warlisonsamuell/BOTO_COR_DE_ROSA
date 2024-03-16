const Connection = require('../models/connection');
const extractText = require('../utils/getInformationsFromPDF');

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
    const { nome, fullText } = request.body;
    const { email, tempo_experiencia, escolaridade } = extractText(fullText);
    const query = `INSERT INTO pessoa (nome, email, linkedin, cidade, estado, pais, tempo) VALUES ('${nome}', '${email}', 'pedro@linkedin.com', 'Manaus', 'Amazonas', 'Brazil', '${tempo_experiencia}')`;

    Connection.query(query, (err, result) => {
      if (err) {
        response.status(500).send('Erro ao obter alunos');
      }
      response.status(203);
    });
    return response.json('ok');
  }
}

module.exports = PeopleController;
