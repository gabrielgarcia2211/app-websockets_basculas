const Control = require('../models/control.models');


exports.create = function (req, res) {

    try {
        const new_control = new Control(req.body);

        //handles null error
        if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
            res.status(400).send({ error: true, message: 'Por favor llena todos los campos' });
        } else {
            Control.create(new_control, function (err, control) {
                if (err)
                    res.send(err);


                Control.findById(req.body.id_bascula, function (err, control) {
                    if (err)
                        res.send(err);


                    res.json(control[0]);
                });


            });
        }
    } catch (error) {
        res.json({ error: true, message: 'Ah ocurrido un error, 500 Server' });
    }


};












