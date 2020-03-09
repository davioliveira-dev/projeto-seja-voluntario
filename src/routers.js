const db = require('./db');
const express = require('express');
var router = express.Router();


router.get('/',(req,res,next) => {
    const query = /*sql*/ `
        SELECT id,email,description,title,city
        FROM anuncios
        ORDER BY id DESC
        LIMIT 10;
    `
    db.all(query, (err, vagas) => {
        if(err) {
            console.log(err.message);
            return next(err);
        }
        res.render('index', { vagas });
    });
    
});

router.get('/busca',(req,res) => res.render('busca'));

router.get('/cadastro',(req,res) => res.render('cadastro'));

router.post('/cadastro',(req,res) => {
    const query = /*sql*/ `
        INSERT INTO anuncios (email,description,title,city)
        VALUES (?, ?, ?, ?);
    `;
    db.run(query, [req.body.email ,req.body.description, req.body.title, req.body.city], err => {
        if(err) {
            console.log(err.message);
            return next(err);
        }
        res.redirect('/');
    });
});

router.get('/anuncio/:id',(req,res) => {
    const query = /*sql*/ `
        SELECT id,email,description,title,city
        FROM anuncios
        WHERE id = ?
    `;
    if(req.params.id) {
        db.get(query, [req.params.id], (err, vaga) => {
            if(err) {
            console.log(err.message);
            return next(err);
        }
        res.render('anuncio', { vaga });
        });
    }
});

module.exports = router;