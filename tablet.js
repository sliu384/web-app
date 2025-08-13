"use strict";

async function getAllRecords() {
  let getResultElement = document.getElementById("tablets");

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer patPsa3lN4aBO5rmT.8274d0c9073a5d8e5136b0bfeaeefaeaaf14304444ff2a83fa1e7e3a7c561903`,
    },
  };

  await fetch(
    `https://api.airtable.com/v0/appnhz7Yte34rvqwW/tbl1wPbEpjEIvQewE`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      getResultElement.innerHTML = "";

      let newHtml = "";

      for (let i = 0; i < data.records.length; i++) {
        let name = data.records[i].fields["name"];
        let image = data.records[i].fields["what it looks like"];

        newHtml += `
        <div class="tablet-card">
          <div>
            <a href="tablets.html?id=${data.records[i].id}">
            <img class="card-img-top rounded" alt="${name}" src="${image[0].url}">
            <h3>${name}</h3>
          </div>
        </div>`;
      }

      getResultElement.innerHTML = newHtml;
    });
  new Masonry(document.getElementById("tablets"), {
    itemSelector: ".tablet-card",
    columnWidth: ".tablet-card",
    percentPosition: true,
    gutter: 10,
  });
}

async function getOneRecord(id) {
  let jobsResultElement = document.getElementById("tablets");

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer patPsa3lN4aBO5rmT.8274d0c9073a5d8e5136b0bfeaeefaeaaf14304444ff2a83fa1e7e3a7c561903`,
    },
  };

  await fetch(
    `https://api.airtable.com/v0/appnhz7Yte34rvqwW/tbl1wPbEpjEIvQewE/${id}`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // response is a single object

      let name = data.fields["name"];
      let brand = data.fields["brand"];
      let price = data.fields["price"];
      let type_of_tablet = data.fields["type of tablet"];
      let size = data.fields["size"];
      let sensitivity = data.fields["pen sensitivity"];
      let color = data.fields["color gamut (standard)"];
      let tilt = data.fields["tilt support"];
      let link = data.fields["link to item"];
      let image = data.fields["what it looks like"];

      /* 
        <div>
          <h3 class="row>${name}</h3>
          <div class="row">
            <div class="col-md-4">
              <img class="card-img-top rounded logo" alt="${name}" src="${image[0].url}">
            </div>
            <div class="col-md-6">
              <div class="brand container">${brand}</div>
              <div class="price container">${price}</div>
              <div class="type container">${type_of_tablet}</div>
              <div class="size container">${size}</div>
              <div class="sensitivity container>${sensitivity}</div>
              <div class = "color container">${color}</div>
              <div class="tilt container>${tilt}</div>
              <div class="link container">${link}</div>
            </div>
          </div>
        </div>
      */

      let newHtml = `
        <div class="row">
        <div class="col-md-4">
        <img class="card-img-top rounded logo" alt="${name}" src="${image[0].url}">
        </div>
        <div class="col-md-8">
        <h3>${name}</h3>
        <h5 class="brand container">${brand}</h5>
        <p class="price container">$${price}</p>
        <p class="type container">${type_of_tablet}</p>
        <p class="size container">Dimensions: ${size}</p>
        <p class="sensitivity container">${sensitivity}</p>
        <p class = "color container">Color gamut (standard): ${color}</p>
        <p class="tilt container">Support Tilt? ${tilt}</p>
        <a class="link container" target="_blank" href="${link}">Link to Official Website</a>
        </div>
        </div>
      `;

      jobsResultElement.innerHTML = newHtml;
    });
}

let idParams = window.location.search.split("?id=");
if (idParams.length >= 2) {
  getOneRecord(idParams[1]); // create detail view HTML w/ our id
} else {
  getAllRecords(); // no id given, fetch summaries
}
