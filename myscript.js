"use strict";

// function for our list view
async function getAllRecords() {
  let getResultElement = document.getElementById("tablets");

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer pateG7pBF1CkfmcW7.2c666498dc7818660958fea1c0bb95e5e1d33bbdb4871fed8ee5696394e05ce5`, //need to add own api key
    },
  };

  await fetch(
    `https://api.airtable.com/appnhz7Yte34rvqwW/tbl1wPbEpjEIvQewE`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // response is an object w/ .records array

      getResultElement.innerHTML = ""; // clear data that is on the div if there is any

      let newHtml = "";

      for (let i = 0; i < data.records.length; i++) {
        let name = data.records[i].fields["fldj21gch6UFmkbKh"]; // here we are getting column values
        let brand = data.records[i].fields["fld9FX08bXf5eGID7"]; //here we are using the Field ID to fecth the name property
        let price = data.records[i].fields["fld3szhMHgFoTzYOE"];
        let type_of_tablet = data.records[i].fields["flduSkczlbuuP0NTe"];

        newHtml += `
         <div class="col-xl-4 cardImageText">
          <div class="card list move border-dark mb-5" style="width: 20rem;">
          <a href="breweries.html?id=${data.records[i].id}">
          </a>
          </div>
          </div>
        </div>
        `;
      }

      getResultElement.innerHTML = newHtml;
    });
}
