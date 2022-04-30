'use strict';
const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')

function configPuerts(listName, baudRate, limiter) {


    let listErrors = "";
    let cont = 0;

    for (let i = 0; i < listName.length; i++) {


        //se crea variable temporal
        let temp = listName[i];
        //se instancia la conexion
        let puerto = new SerialPort({
            path: temp, baudRate: baudRate
        })
        //parseamos los datos de entrada
        const parser = puerto.pipe(new ReadlineParser())


        puerto.on('open', function (data) {

        })

        parser.on('data', function (data) {
            let capData = 0;
            let temp = data.trim().split(':');
            if (temp[0] === 'Net') {
                capData = temp[1];
                io.emit('port:data', {
                    value: capData.replace('Kg', '') + "/" + puerto.path
                });

            }
        })

        puerto.on('error', function (err) {
            listErrors += err.message + "\n";
            if (true) {
                setTimeout(() => {
                    io.emit('port:error', {
                        value: listErrors,
                        ports: [1,2,3,4,5,6,7,8]
                    });
                }, 1500)
            }
        })


    }


}

module.exports = { configPuerts };





