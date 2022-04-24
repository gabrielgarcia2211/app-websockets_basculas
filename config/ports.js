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
        const parser = puerto.pipe(new ReadlineParser("\n"))


        //temp.on('data', showPortOpen(temp));
        tempList.push({
            'puerto': puerto,
            'parser': parser,
        })


    }

    return tempList;
}


module.exports = {configPuerts};





