
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

function generatePDF(){
    let start_day = document.getElementById("start-day").value;
    let end_day = document.getElementById("end-day").value;
    let name = document.getElementById("form-select-name").value;
    if(name==="Selecciona el nombre"){
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Debe seleccionar un usuario',
            showConfirmButton: false,
            timer: 1500
        })
        return;
    }
    console.log(start_day)
    console.log(end_day)
    console.log(name)
    $.post(
        "../../../app/report/pdf",
        {fecha_inicio: start_day,fecha_fin: end_day, nombre: name},
        function (resp) {
            if (!resp.error) {
                Toast.fire({
                    icon: "warning",
                    title: resp.message,
                });
            }else{
                Toast.fire({
                    icon: "error",
                    title: resp.message,
                });
            }
        }
    );

}