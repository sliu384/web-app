"use strict";

async function getAllRecords() {
  const tabletsElement = document.getElementById("tablets");
  const resultsElement = document.getElementById("results");

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
      let records = data.records;
      resultsElement.innerHTML = "";

      let buttonsHTML = `
      <section class="my-buttons">
      <form>
      <div class="input-group">
        <div class="input-group-text">
          <input name = "filter" id = "all" class="form-check-input mt-0" type="radio" value="all" aria-label="Radio button for following text input" checked/>
          <label for="all">All</label>
          <input name = "filter" id="tablet-btn" class="form-check-input mt-0" type="radio" value="Pen Tablet" aria-label="Radio button for following text input">
          <label for="tablet-btn">Pen Tablet</label>
          <input name = "filter" id="monitor-btn" class="form-check-input mt-0" type="radio" value="Pen Display" aria-label="Radio button for following text input">
          <label for="monitor-btn">Pen Display</label>
        </div>
      </div>
      </form>
      </section>`;

      resultsElement.innerHTML = buttonsHTML;

      const radioButtons = document.querySelectorAll('input[name="filter"]');

      for (const radioButton of radioButtons) {
        radioButton.addEventListener("change", function () {
          if (this.checked) {
            console.log(`Selected value: ${this.value}`);
            filterRecords(this.value);
          }
        });
      }

      function filterRecords(type) {
        let filteredRecords = records;
        if (type === "all") {
          renderItems(filteredRecords);
          return;
        }
        filteredRecords = records.filter((record) => {
          return record.fields["type of tablet"] === type;
        });
        renderItems(filteredRecords);
      }

      filterRecords("all");
    });
}

function renderItems(records) {
  const tabletsElement = document.getElementById("tablets");
  let newHtml = "";

  for (let i = 0; i < records.length; i++) {
    let name = records[i].fields["name"];
    let image = records[i].fields["what it looks like"];

    newHtml += `
        <div class="tablet-card card rounded-lg">
          <div>
            <a href="tablets.html?id=${records[i].id}">
            <img class="card-img-top rounded" alt="${name}" src="${image[0].url}">
            <h3>${name}</h3>
          </div>
        </div>`;
  }

  tabletsElement.innerHTML = newHtml;

  new Masonry(tabletsElement, {
    itemSelector: ".tablet-card",
    columnWidth: ".tablet-card",
    percentPosition: true,
    gutter: 15,
  });
}

async function getOneRecord(id) {
  let jobsResultElement = document.getElementById("detailed-view");

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

      let newHtml = `
        <div class="container detailed">
        <div class="row justify-content-around">
        <div class="col-md-4">
        <img class="card-img-top rounded logo" alt="${name}" src="${image[0].url}">
        </div>
        <div class="col-md-4 px-6">
        <h3>${name}</h3>
        <h5 class="brand container">${brand}</h5>
        <p class="price container">$${price}</p>
        <p class="type container">Type of tablet: ${type_of_tablet}</p>
        <p class="size container">Dimensions: ${size}</p>
        <p class="sensitivity container">${sensitivity}</p>
        <p class = "color container">Color gamut (standard): ${color}</p>
        <p class="tilt container">Support Tilt? ${tilt}</p>
        <a class="link container" target="_blank" href="${link}">Click Here to Buy</a>
        </div>
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
