const Usuario = require('../models/usuario.models');
const Ports = require('../../config/ports')


let dataUser = null;
let baudRate = 9600;
//lista predefindidad de puertos


let limiter = '\r\n'



exports.findAll = function (req, res) {

    activateProceso();
    Usuario.findAll(function (err, usuario) {
        if (err)
            res.send(err);

        dataUser = usuario;
        res.render("user/index", { dataUser });
    });

};

exports.create = function (req, res) {

   try {
    Usuario.findByBascula(req.body.bascula, function (err, usuario) {
        if (usuario.length === 0) {
            const new_user = new Usuario(req.body);
            //handles null error
            if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
                res.status(400).send({ error: true, message: 'Please provide all required field' });
            } else {
                Usuario.create(new_user, function (err, user) {
                    if (err)
                        res.send(err);
                    res.json({ error: false, message: 'Usuario successfully created' });
                });
            }
        } else {
            if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
                res.status(400).send({ error: true, message: 'Please provide all required field' });
            } else {
                Usuario.update(req.body.bascula, req.body.nombre, new Date(), function (err, usuario) {
                    if (err)
                        res.send(err);
                    res.json({ error: false, message: 'Usuario Actualizado' });
                });
            }

        }
    });
   } catch (error) {
       console.log(error)
   }

};

exports.findById = function (req, res) {
    Usuario.findById(req.params.id, function (err, usuario) {
        if (err)
            res.send(err);
        res.json(usuario);
    });
};

function activateProceso(req, res) {
    let listName = [
        'COM21',
        'COM22',
        'COM23',
        'COM24',
        'COM25',
        'COM26',
        'COM27',
        'COM28',
    ]
    Ports.configPuerts(listName, baudRate, limiter);
};

exports.restartServices = function (req, res) {
    let listName = [
        'COM21',
        'COM22',
        'COM23',
        'COM24',
        'COM25',
        'COM26',
        'COM27',
        'COM28',
    ]
    Ports.configPuerts(listName, baudRate, limiter);  
};







