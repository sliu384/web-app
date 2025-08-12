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
        let brand = data.records[i].fields["brand"];
        let price = data.records[i].fields["price"];
        let type_of_tablet = data.records[i].fields["type of tablet"];

        newHtml += `
        <div class="tablet-card">
          <div class="block">
            <div class="info">
              <h3>${name}</h3>
              <p>Brand: ${brand}</p>
              <p>Price: $${price}</p>
              <p>Type: ${type_of_tablet}</p>
            </div>
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

getAllRecords();
