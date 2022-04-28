const Usuario = require('../models/usuario.models');
const Ports = require('../../config/ports')


let dataUser = null;

activateProceso();
exports.findAll = function (req, res) {

    
    Usuario.findAll(function (err, usuario) {
        if (err)
            res.send(err);

        dataUser = usuario;
        res.render("user/index", { dataUser });
    });

};

exports.create = function (req, res) {

    Usuario.findByBascula(req.body.bascula , function (err, usuario) {
        if (usuario.length === 0) {
            const new_user = new Usuario(req.body);
            //handles null error
            if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
                res.status(400).send({ error: true, message: 'Please provide all required field' });
            } else {
                Usuario.create(new_user,function (err, user) {
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
                    res.json({ error: false, message: 'Usuaerio successfully updated' });
                });
            }

        }
    });

};

exports.findById = function (req, res) {
    Usuario.findById(req.params.id, function (err, usuario) {
        if (err)
            res.send(err);
        res.json(usuario);
    });
};

function activateProceso(req, res) {

    let baudRate = 9600;
    //lista predefindidad de puertos
    let listName = [
        'COM1',
        'COM2',
        'COM3',
        'COM4',
    ]

    let limiter = '\r\n'

    //lista de salida de conversion
    let listPorts = [];
    let listErrors = '';


    Ports.configPuerts(listName, baudRate, limiter);
   

    /*if(listPorts.length > 0){
        

        for (var i = 0; i < listPorts.length; i++) {
         
            let pu = listPorts[i].puerto;
            let pa = listPorts[i].parser;

              
            pa.on('data', (data) => {
                console.log(data.toString());
               /* io.emit('port:data', {
                    value: data + "/" + pu.path
                });
            })
    
           /* pu.on('error', function (err) {
                listErrors += err.message + "\n";
                if (true) {
                    setTimeout(() => {
                        io.emit('port:error', {
                            value: listErrors,
                            ports: true
                        });
                    }, 1500)
                }

               // console.log(err.message)
    
            })
    
    
        }
    }else{
        console.log('nada')
        setTimeout(() => {
            io.emit('port:error', {
                value: 'No hay puertos disponibles!.',
                ports: false
            });
        }, 1500)
    }*/

};







