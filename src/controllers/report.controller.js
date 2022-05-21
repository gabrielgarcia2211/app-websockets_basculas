const Usuario = require("../models/usuario.models");
const Report = require("../models/report.models");
const pdf = require('html-pdf');
var excel = require('excel4node');



let wb = new excel.Workbook();
let ws = wb.addWorksheet("inventario");


exports.findAll = function (req, res) {

    Usuario.findAll(function (err, usuario) {
        if (err)
            res.send(err);

        let dataUser = usuario;
        res.render("user/report", { dataUser });
    });

};

function formatoFecha(hoy) {
    return hoy.toISOString().slice(0, 19).replace('T', ' ');
}

exports.generatePDF = function (req, response) {
 
    try {
        Report.findByControl(req.body.fecha_inicio, req.body.fecha_fin, req.body.id, function (err, query) {
            if (err)
                response.send(err);

            if (query.length > 0) {

                let now = new Date();
                let template = "";

                for (let i = 0; i < query.length; i++) {
                    let temp1 = formatoFecha(query[i].fecha_registro)
                    let temp2 = formatoFecha(query[i].guardado)
                    template += `<tr>
                    <td >${query[i].nombre}</td>
                    <td >${query[i].registro}</td>
                    <td >${query[i].id_bascula}</td>
                    <td >${temp1}</td>
                    <td >${temp2}</td>
                
                    </tr>`
                }

                const content = `
                <!doctype html>
                    <html>
                        <head>
                            <meta charset="utf-8">
                            <title>PDF Result Template</title>
                            <style type="text/css">
                                .tftable {font-size:12px;color:#333333;width:80%;border-width: 1px;border-color: #729ea5;border-collapse: collapse;  margin: auto;}
                                .tftable th {font-size:12px;background-color:#acc8cc;border-width: 1px;padding: 8px;border-style: solid;border-color: #729ea5;text-align:left;}
                                .tftable tr {background-color:#ffffff;}
                                .tftable td {font-size:12px;border-width: 1px;padding: 8px;border-style: solid;border-color: #729ea5;}
                                .tftable tr:hover {background-color:#ffff99;}
                            </style>
                            <style>
                                h1 {
                                    -webkit-user-select: none !important;
                                    -moz-user-select: none !important;
                                    -ms-user-select: none !important;
                                    user-select: none !important;
                                    color: rgb(00, 00, 00);
                                    font-family: cursive;
                                    text-align: center;
                                }
                            </style>
                        </head>
                        <body>
                            <nav class="navbar navbar-light bg">
                                 <a class="navbar-brand" href="index.html">
                                    <img src="https://us.123rf.com/450wm/ylivdesign/ylivdesign1709/ylivdesign170903085/85533345-icono-de-carro-de-carb%C3%B3n-ilustraci%C3%B3n-de-dibujos-animados-de-icono-de-vector-de-carro-de-carb%C3%B3n-para-.jpg" alt="" width="100" height="50">
                                 </a>
                             </nav>
                            <h1>Resultado de PDF</h1>
                            <table class="tftable">
                              <tr>
                                <th>Nombre</th>
                                <th>Registro - Kg</th>
                                <th>Bascula</th>
                                <th>Fecha de registro del dato</th>
                                <th>Fecha de registro del cierre</th>
                              </tr>
                              <tr id="unico">
                                 ${template}
                              </tr>
                            </table>
                             <div id="pageFooter" style="border-top: 1px solid #ddd; padding-top: 5px;">
                                <p style="color: #666; margin: 0; padding-bottom: 5px; text-align: right; font-family: sans-serif; font-size: .65em">Página {{page}} de {{pages}}</p>
                             </div>
                        </body>
                    </html>`;


                pdf.create(content).toFile('./reportes/' + now.getTime() + '.pdf', function (err, res) {
                    if (err) {
                        response.send(err);
                    }
                });

                response.json({ error: false, message: 'Reporte PDF Generado' });

            } else {
                response.json({ error: false, message: 'No hay datos asociados en PDF' });
            }

        });
    } catch (e) {
        response.json({ error: true, message: 'Error en generar el PDF' });
    }


};

exports.generateExcel = function (req, response) {
    let name = 'inventario';

    try {
        Report.findByControl(req.body.fecha_inicio, req.body.fecha_fin, req.body.id, function (err, query) {
            if (err)
                response.send(err);

            if (query.length > 0) {


                //header
                let data = [
                    'FECHA DE REGISTRO',
                    'REGISTRO - Kg',
                    'BASCULA',
                    'NOMBRE',
                    'GUARDADO'
                ]

                for (let i = 1; i <= data.length; i++) {
                    ws.cell(1, i).string(data[i - 1]);
                }


                for (let i = 2; i <= (query.length + 1); i++) {

                    query[i - 2].fecha_registro = formatoFecha(query[i - 2].fecha_registro);
                    query[i - 2].guardado = formatoFecha(query[i - 2].guardado);
                
                    for (let j = 1; j <= Object.values(query[0]).length; j++) {
                        let data = Object.values(query[i - 2])[j - 1];
                
                        if (j == 1 || j == 3) {
                            ws.cell(i, j).string(data.toString());
                        }
                        else if (typeof data === "string") {
                            ws.cell(i, j).string(data);
                        } else {
                            ws.cell(i, j).number(data);
                        }
                    }
                
                }

                wb.write(`${name}.xlsx`, response);

               // response.json({ error: false, message: 'Reporte EXCEL Generado' });

            } else {
                console.log('aca')
                response.json({ error: true, message: 'No hay datos asociados en EXCEL' });
            }

        });
    } catch (e) {
        response.json({ error: true, message: 'Error en generar el EXCEL' });
    }
}




















