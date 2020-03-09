const db = require('./db');
const express = require('express');
var router = express.Router();

router.get('/busca',(req,res,next) => {
    const query = /*sql*/ `
        SELECT *
        FROM anuncios
        WHERE LIKE (?, LOWER(city || description || title))
        ORDER BY id DESC;
    `;
    if(req.query.key) {
        db.all(query, [`%${req.query.key}%`], (err, vagas) => {
            if(err) {
                console.log(err.message);
                return next(err);
            }
            console.log(res.json(vagas));
        });
    }   else {
            res.status(500).json('O key deve ser informado');
    }
});

module.exports = router;