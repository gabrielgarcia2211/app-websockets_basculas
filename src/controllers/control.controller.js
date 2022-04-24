const Control = require('../models/control.models');


exports.create = function (req, res) {

    const new_control = new Control(req.body);

    //handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
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
        
  
};












