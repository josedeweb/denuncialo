'use strict';

//var users = require('../models/users');
var moment = require('moment');

module.exports = function (req, res){     
    res.render('index', {
        title: "Concurso - Escuela Mozart",
        user: req.user,
    });
}
