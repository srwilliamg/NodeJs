let tabulator;

$(document).ready(function () {
  tabulator = new Tabulator("#allData", {
    ajaxURL: "http://" + window.location.hostname + ":5000/api/services/getAll",
    ajaxProgressiveLoad: "scroll",
    // autoColumns:true,
    height:"15em",
    paginationButtonCount:3,
    paginationSize: 20,
    paginationSizeSelector:true,
    placeholder: "No se ha obtenido datos",
    layout: "fitColumns",
    columns: [
      { title: "Username", field: "username" },
      { title: "Name", field: "name" },
      { title: "Lastname", field: "lastname" },
      { title: "Email", field: "email" },
    ],
    rowClick: (e, row) => {
      let dataElement = row.getData();

      Swal.fire({
        title: "Eliminar elemento?",
        text: "Esta acción no se podrá revertir",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, bórralo!",
      }).then((result) => {
        if (result.value) {
          deleteRegister(dataElement.idUser).then((response) => {
            console.log(response);
            Swal.fire("Borrado!", "Elemento borrado exitosamente.", "success");
            row.delete();
          })
          .catch((err) =>{
            Swal.fire("Error!", err, "error");
          });
        }
      });
    },
  });
});

let deleteRegister = (idUser) =>{
  return new Promise((resolve, reject) => {
    fetch("http://" + window.location.hostname + ":5000/api/services/", {
      method: "DELETE",
      body: JSON.stringify({ idUser }),
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.error) {
          throw response.message;
        }
        resolve(response);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};
