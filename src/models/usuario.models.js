'use strict';
const dbConn = require('./../../config/db.config');
//Employee object create

const Usuario = function (user) {

    this.nombre = user.nombre;
    this.id_bascula = user.bascula;
    this.registro = new Date()

};

Usuario.create = function (newEmp, result) {
    dbConn.query("INSERT INTO usuario set ?", newEmp, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

Usuario.findById = function (id, result) {
    dbConn.query("Select * from usuario where id = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

Usuario.findAll = function (result) {
    dbConn.query("Select * from usuario Order by id_bascula Asc", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};

Usuario.update = function (id_bascula, nombre, fecha_registro, result) {
    dbConn.query("UPDATE usuario SET nombre=?, registro=? WHERE id_bascula = ?", [nombre,fecha_registro,id_bascula], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

Usuario.delete = function (id, result) {
    dbConn.query("DELETE FROM usuario WHERE id = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};

Usuario.findByBascula = function (id_bascula, result) {
    dbConn.query("Select * from usuario where id_bascula = ? ", [id_bascula], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

module.exports = Usuario;