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


        //puerto.open();

        parser.on('data', function (data) {
            let capData = "";
            //let temp = data.trim().split(':');
            let temp = data.trim().replace(' ', '').split(':');
            //se crea variableconsole.log(temp)
            if (temp[0] === 'Net') {
                capData = temp[1];
                
                let aux = capData.trim();
                
                io.emit('port:data', {
                    value: aux.replace('Kg', '') + "/" + puerto.path
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

        puerto.on('close', function (data) {
            io.emit('port:disconnect', {
                value: data,
                port:  puerto.path
            });
        });



    }


}

module.exports = { configPuerts };





