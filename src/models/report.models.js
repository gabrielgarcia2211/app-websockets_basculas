'use strict';
const dbConn = require('../../config/db.config');
//Employee object create

exports.findByControl = function (fecha_inicio, fecha_fin, id, result) {
    dbConn.query("select  c.fecha_registro , c.registro ,c.id_bascula , u.nombre , u.registro as guardado from usuario u inner join control c on c.id_bascula = u.id_bascula where u.id = ? and c.fecha_registro >= ? and c.fecha_registro <= ?", [id,fecha_inicio, fecha_fin], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

