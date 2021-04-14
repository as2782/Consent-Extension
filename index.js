// function n_lst() {
//   var lst = chrome.storage.local.get('title_list', function (result) {
//     console.log("hi" + lst);
//   });
//   return lst;
// }

chrome.storage.local.get('title_list', function (result) {
  var lst = result.title_list;
  document.write(lst)
  // alert('result.peek() ' + result.title_list.length)
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