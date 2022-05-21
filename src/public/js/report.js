//var fileDownload = fileDownload();

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

function generatePDF() {
    let start_day = document.getElementById("start-day").value;
    let end_day = document.getElementById("end-day").value;
    let id = document.getElementById("form-select-name").value;
    if (id === "Selecciona la bascula") {
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Debe seleccionar una bascula',
            showConfirmButton: false,
            timer: 1500
        })
        return;
    }
    $.post(
        "../../../app/report/pdf",
        { fecha_inicio: start_day, fecha_fin: end_day, id: id },
        function (resp) {
            if (!resp.error) {
                Toast.fire({
                    icon: "warning",
                    title: resp.message,
                });
                //setTimeout(function () { location.reload() }, 3000)
            } else {
                Toast.fire({
                    icon: "error",
                    title: resp.message,
                });
            }
        }
    );

}

function generateExcel() {
    let start_day = document.getElementById("start-day").value;
    let end_day = document.getElementById("end-day").value;
    let id = document.getElementById("form-select-name").value;
    if (id === "Selecciona la bascula") {
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Debe seleccionar una bascula',
            showConfirmButton: false,
            timer: 1500
        })
        return;
    }

    let postConfig = {
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        },
        responseType: 'blob',
    }
    let formData = { fecha_inicio: start_day, fecha_fin: end_day, id: id };
    axios.post("../../../app/report/excel", formData, postConfig).then((response) => {

        const jsonMimeType = 'application/json';
        const dataType = response.data.type;
        const isBlob = response.data instanceof Blob && dataType !== jsonMimeType;




        if (isBlob) {
            Toast.fire({
                icon: "warning",
                title: 'Reporte EXCEL Generado',
            });
            var fileURL = window.URL.createObjectURL(new Blob([response.data]));
            var fileLink = document.createElement('a');
    
            fileLink.href = fileURL;
            fileLink.setAttribute('download', 'file.xlsx');
            document.body.appendChild(fileLink);
    
            fileLink.click();
            //setTimeout(function () {location.reload()}, 4000)
        } else {
            response.data.text().then(text => {
                const res = JSON.parse(text);
                
                Toast.fire({
                    icon: "error",
                    title: res.message,
                });



            });

        }

        });


    }