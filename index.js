// function n_lst() {
//   var lst = chrome.storage.local.get('title_list', function (result) {
//     console.log("hi" + lst);
//   });
//   return lst;
// }

chrome.storage.local.get('browse_info', function (result) {
  var lst = result.browse_info;
  // document.getElementById("table").innerHTML = result.browse_info['extensions'];
  let table_ref = document.getElementById("table");
  for (const key in lst) {
  	let new_row = table_ref.insertRow(-1);

  	let new_cell = new_row.insertCell(0);
  	let cell_date = new_row.insertCell(1);

  	let new_text = document.createTextNode(key);
  	let text_date = document.createTextNode(lst[key]);

  	new_cell.appendChild(new_text);
  	cell_date.appendChild(text_date);
  }
});

// chrome.storage.local.get('title_list', function (result) {
//   
//   // console.log('All Titles ' + result); 
// });

// let mountains = [
//   { name: "Monte Falco", height: 1658, place: "Parco Foreste Casentinesi" },
//   { name: "Monte Falterona", height: 1654, place: "Parco Foreste Casentinesi" },
//   { name: "Poggio Scali", height: 1520, place: "Parco Foreste Casentinesi" },
//   { name: "Pratomagno", height: 1592, place: "Parco Foreste Casentinesi" },
//   { name: "Monte Amiata", height: 1738, place: "Siena" }
// ];

// function generateTableHead(table, data) {
//   let thead = table.createTHead();
//   let row = thead.insertRow();
//   for (let key of data) {
//     let th = document.createElement("th");
//     let text = document.createTextNode(key);
//     th.appendChild(text);
//     row.appendChild(th);
//   }
// }

// function generateTable(table, data) {
//   for (let element of data) {
//     let row = table.insertRow();
//     for (key in element) {
//       let cell = row.insertCell();
//       let text = document.createTextNode(element[key]);
//       cell.appendChild(text);
//     }
//   }
// }

// let table = document.querySelector("table");
// let data = Object.keys(mountains[0]);
// generateTableHead(table, data);
// generateTable(table, mountains);