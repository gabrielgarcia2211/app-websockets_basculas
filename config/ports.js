'use strict';
const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')

function configPuerts (listName, baudRate, limiter) {


    let tempList = [];

    for (let i = 0; i < listName.length; i++) {


        //se crea variable temporal
        let temp = listName[i];
        //se instancia la conexion
        let puerto = new SerialPort({
            path: temp, baudRate: baudRate
        })
        //parseamos los datos de entrada
        const parser = puerto.pipe(new ReadlineParser())

        /*tempList.push({
            'puerto': puerto,
            'parser': parser,
        })*/

        parser.on('data', function(data){
            console.log('serial:' + puerto.path + ":   " + data)
        })
        puerto.on('error', console.log)


    }

   
}


module.exports = {configPuerts};





