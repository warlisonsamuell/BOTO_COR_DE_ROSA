const express = require('express');
const Connection = require('./models/connection');

const router = express.Router();


router.get("/pessoa", (req, res) => {
    const query = "SELECT * FROM pessoa";

    Connection.query(query,(err, result) => {
        if(err){
            res.status(500).send("Erro ao obter alunos");
        } else {
            res.json(result);
        }
    });
});


module.exports = router;