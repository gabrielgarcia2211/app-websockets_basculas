var socket = io();

let listName = [
  'COM21',
  'COM22',
  'COM23',
  'COM24',
  'COM25',
  'COM26',
  'COM27',
  'COM28',
]



$(document).ready(function () {
    init();

})

function init() {
    for (let i = 0; i < listName.length; i++) {
        let key = listName[i].substr(-1);
        document.getElementById("led-" + key).style.background = '#5FFF23';
        document.getElementById("guardar-" + key).disabled = false;
    }
}

function sesion() {
    var user = document.getElementById('user').value;
    var password = document.getElementById('password').value;
    if (user === "admin" && password === "prominerq123") {
        window.location.href = "../app/user/all/";
    } else {
        window.alert("error");
    }
}

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    width: 500,
    timer: 4000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
});

socket.on("port:data", function (dataSerial) {
    let arr = dataSerial.value.split("/");
    map(arr);
});

socket.on("port:error", function (error) {
    init();
    let part = error.value.split("\n");
    let segm = "";
    let key = "";

    for (let i = 0; i < 8; i++) {

        try {
            segm = part[i].split(":");
            key = segm[0].substr(-1);

            if (segm[1] === " File not found") {
                document.getElementById("led-" + key).style.background = '#FF4F23';
                document.getElementById("guardar-" + key).disabled = true;
            }
        } catch (error) {
            //console.log(error);
        }

    }

    Toast.fire({
        icon: "warning",
        title: error.value,
    });


});

socket.on("port:disconnect", function (error) {
    let key = error.port.substr(-1);
    if (error.value.disconnected) {
        document.getElementById("led-" + key).style.background = '#FF4F23';
        Toast.fire({
            icon: "error",
            title: "Vagoneta #" + key + ",asociada al puerto: " + error.port + ". Ha sido desconectada",
        });
    }
});

function map(arr) {
    let key = arr[1].substr(-1);
    let dispatch = true;
    let temp;
    switch (arr[1]) {
        case "COM1":
            temp = document.getElementById("data-" + key);
            temp.value = arr[0];
            break;
        case "COM2":
            temp = document.getElementById("data-" + key);
            temp.value = arr[0];
            break;
        case "COM3":
            temp = document.getElementById("data-" + key);
            temp.value = arr[0];
            break;
        case "COM4":
            temp = document.getElementById("data-" + key);
            temp.value = arr[0];
            break;
        case "COM5":
            temp = document.getElementById("data-" + key);
            temp.value = arr[0];
            break;
        case "COM6":
            temp = document.getElementById("data-" + key);
            temp.value = arr[0];
            break;
        case "COM7":
            temp = document.getElementById("data-" + key);
            temp.value = arr[0];
            break;
        case "COM8":
            temp = document.getElementById("data-" + key);
            temp.value = arr[0];
            break;
        default:
            dispatch = false;
            break;
    }

    captData(dispatch, "form-user-" + key, arr[0]);
}

function captData(start, id, data) {

    if (start) {
        //segmentation del arreglo
        let form = document.getElementById(id);
        var vagoneta = form.elements["vagoneta"].value;
        let arr = id.split("-");

        if (vagoneta === "") {
            Toast.fire({
                icon: "warning",
                title: "Primer Registro de la vagoneta " + arr[2],
            });

            form.elements["data-" + arr[2]].value = "";
            form.elements["vagoneta"].value = data;

        } else {

            if (!form.elements["vagoneta"].readOnly) {

                $.post(
                    "../../../app/control/create",
                    {registro: vagoneta, id_bascula: arr[2]},
                    function (resp) {
                        if (!resp.error) {

                        } else {
                            Toast.fire({
                                icon: "warning",
                                title: resp.message,
                            });
                        }
                    }
                );

            }

            form.elements["vagoneta"].readOnly = true;


            $.post(
                "../../../app/control/create",
                {registro: data, id_bascula: arr[2]},
                function (resp_post) {

                    for (let index = 0; index < resp_post.total; index++) {
                        resp_post.suma -= resp_post.registro;
                    }

                    form.elements["total"].value = resp_post.suma;
                }
            );
        }
    } else {
        Toast.fire({
            icon: "error",
            title: "Numero del Puerto de Serial no Establecido.",
        });
    }
}

function enviarData(id) {
    event.preventDefault();

    let form = document.getElementById(id);
    let data_1 = form.elements["nombre"].value;
    let data_2 = form.elements["bascula"].value;
    let data_3 = form.elements["vagoneta"].value;


    let arr = id.split("-");
    Swal.fire({
        title: "Esta seguro que desea cerrar la bascula?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Guardar",
        denyButtonText: `No Guardar`,
    }).then((result) => {
        if (result.isConfirmed) {
            if (data_3 === "" || data_3 === null) {
                Toast.fire({
                    icon: "error",
                    title:
                        "Debe primero cargar el valor de la bascula " +
                        arr[2] +
                        " " +
                        "antes de guardar.",
                });
            } else {
                $.ajax({
                    type: "post",
                    url: "/app/user/create",
                    data: {nombre: data_1, bascula: data_2},
                    dataType: "text",
                    success: function () {
                        form.elements["data"].value = "";
                        form.elements["total"].value = "";
                        form.elements["vagoneta"].value = "";

                        Toast.fire({
                            icon: "success",
                            title: "Registro Guardado!",
                        });
                    },
                });
            }
        } else if (result.isDenied) {
            Toast.fire({
                icon: "info",
                title: "Los cambios no se guardaron",
            });
        }
    });
}

function restartServices() {
    $.get("../../../app/user/restart", function (data) {
    });
}


