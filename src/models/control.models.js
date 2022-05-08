'use strict';
const dbConn = require('../../config/db.config');
//Employee object create



const Control = function (control) {

    this.registro = control.registro;
    this.id_bascula = control.id_bascula;
    this.fecha_registro = new Date();
  

};

function formatoFecha(hoy) {
    return hoy.toISOString().slice(0, 19).replace('T', ' ');
}

Control.create = function (newControl, result) {
    dbConn.query("INSERT INTO control set ?", newControl, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

Control.findById = function (id_bascula, result) {
    dbConn.query("Select SUM(registro) as suma, count(id) as total,  registro ,id from control where id_bascula  = ? and left(fecha_registro , 10) = LEFT(now(),10) order by fecha_registro asc ", [id_bascula], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

Control.findAll = function (result) {
    dbConn.query("Select * from control", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};

Control.findByControl = function (id, result) {
    dbConn.query("Select * from control where id = ? ", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

module.exports = Control;