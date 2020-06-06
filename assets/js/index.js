$(document).ready(function () {
  getAll();
});

const getAll = () => {
  fetch("http://" + window.location.hostname + ":5000/api/services/getAll", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((allData) => {
      console.log(allData);
      if (allData.message) {
        throw allData.message;
      }

      new Tabulator("#allData", {
        data: allData,
        columns: [
          //Define Table Columns
          { title: "Username", field: "username" },
          { title: "Name", field: "name" },
          { title: "Lastname", field: "lastname" },
          { title: "Email", field: "email" },
        ],
        layout: "fitColumns",
        // autoColumns:true,
      });
      
    })
    .catch((err) => {
      console.log(err);
    });
};
