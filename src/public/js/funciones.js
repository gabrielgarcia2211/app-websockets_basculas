var socket = io();

/** REGLAS DE ENTRADA DE LOS LED */


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

socket.on("port:error", function (error, ports) {
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

  //Segmentacion de substrings

  let part = error.value.split("\n");
  let segm = "";
  for (let i = 0; i < part.length; i++) {
    segm = part[i].split(":");

    let key = segm[0].substr(-1);

  }



  //let key = segm[0].substr(-1);
  //console.log(key)

  // 

  Toast.fire({
    icon: "warning",
    title: error.value,
  });
});

function map(arr) {
  //444 - > arr[0]
  //COM1 -> arra[1]
  let key = arr[1].substr(-1);
  let dispatch = true;
  switch (arr[1]) {
    case "COM1":
      var temp = document.getElementById("data-" + key);
      temp.value = arr[0];
      break;
    case "COM2":
      var temp = document.getElementById("data-" + key);
      temp.value = arr[0];
      break;
    case "COM3":
      var temp = document.getElementById("data-" + key);
      temp.value = arr[0];
      break;
    case "COM4":
      var temp = document.getElementById("data-" + key);
      temp.value = arr[0];
      break;
    case "COM5":
      var temp = document.getElementById("data-" + key);
      temp.value = arr[0];
      break;
    case "COM6":
      var temp = document.getElementById("data-" + key);
      temp.value = arr[0];
      break;
    case "COM7":
      var temp = document.getElementById("data-" + key);
      temp.value = arr[0];
      break;
    case "COM8":
      var temp = document.getElementById("data-" + key);
      temp.value = arr[0];
      break;
    default:
      dispatch = false;
      break;
  }

  captData(dispatch, "form-user-" + key, arr[0]);
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
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      if (data_3 != "") {
        $.ajax({
          type: "post",
          url: "/app/user/create",
          data: { nombre: data_1, bascula: data_2 },
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
      } else {
        Toast.fire({
          icon: "error",
          title:
            "Debe primero cargar el valor de la bascula " +
            arr[2] +
            " " +
            "antes de guardar.",
        });
      }
      Swal.fire("Saved!", "", "success");
    } else if (result.isDenied) {
      Toast.fire({
        icon: "info",
        title: "Los cambios no se guardaron",
      });
    }
  });
}

function captNombre(id) {
  let form = document.getElementById(id);
  var typeId = form.elements["form-select-name"].value;
  form.elements["nombre"].value = typeId;
}

function captData(start, id, data) {
  if (start) {
    //segmentacion del arreglo
    let form = document.getElementById(id);
    var vagoneta = form.elements["vagoneta"].value;
    let arr = id.split("-");

    if (vagoneta == "") {
      Swal.fire({
        title: "Primer Registro de la vagoneta " + arr[2],
        text: "Peso incial del proceso!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Guardar!",
      }).then((result) => {
        if (result.isConfirmed) {
          $.post(
            "../../../app/control/create",
            { registro: data, id_bascula: arr[2] },
            function (resp) {
              //aca hacemos validacion de vagoneta en back para que este encendida
              form.elements["data-" + arr[2]].value = "";
              form.elements["vagoneta"].value = data;
            }
          );

        } else {
          form.elements["data-" + arr[2]].value = "";
        }
      });
    } else {
      $.post(
        "../../../app/control/create",
        { registro: data, id_bascula: arr[2] },
        function (resp_post) {
          //aca hacemos validacion de vagoneta en back para que este encendida PENDIENTE (OJO)

          for (let index = 0; index < resp_post.total; index++) {
            resp_post.suma -= resp_post.registro;
          }

          form.elements["total"].value = resp_post.suma;
        }
      );
    }
  } else {
    console.log("Error");
  }
}
