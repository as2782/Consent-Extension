// Hardcoding the list of websites and privacy policy information for now. 
// Calling it 'dummy'. Will pull from server in final implementation
const dummy = {
  "www.google.com":
  {
    "start_url": "Privacy Policy Link",
    "final_url": "Google Privacy Policy Link",
    "clauses": "This is Google's Privacy Policy Info"
  },
  "www.reddit.com":
  {
    "start_url": "Privacy Policy Link",
    "final_url": "Reddit Privacy Policy Link",
    "clauses": "This is Reddit's Privacy Policy Info"
  },
  "www.youtube.com":
  {
    "start_url": "Privacy Policy Link",
    "final_url": "Youtube Privacy Policy Link",
    "clauses": "This is YouTube's Privacy Policy Info"
  },
  "www.facebook.com":
  {
    "start_url": "Privacy Policy Link",
    "final_url": "Facebook Privacy Policy Link",
    "clauses": "This is Facebook's Privacy Policy Info"
  },
  "www.tumblr.com":
  {
    "start_url": "Privacy Policy Link",
    "final_url": "Tumblr Privacy Policy Link",
    "clauses": "This is Tumblr's Privacy Policy Info"
  }
}


// list of alert words to check the titles against
var alerts = ["porn", "drug", "weed", "pot", "suicide", "Drug", "sex", "cannabis",
  "hashish", "hemp", "herb", "tea", "help", "ganja", "hash", "joint", "reefer",
  "doobie", "loco weed", "Porno", "raunchy", "steamy", "sexy", "X-rated", "xxx",
  "self mutilation", "self-mutilation", "guns", "qanon", "Qanon", "self-injury"];

// Will use the fetch api to pull info from server.
var fetch_file = "https://privacypandapolicies.s3.us-east-2.amazonaws.com/coppa_policies_converted.json"


// fetch(fetch_file)
// .then(response => response.json())
// .then(data => console.log(data));

function print_table(array, obj, table) {
  for (let i = 0; i < array.length; i++) {
    let info = array[i];
    let info_site = info[1];
    let info_date = info[0];

    // Insert new empty row
    let new_row = table.insertRow(-1);

    // Insert new cells for each relevant field
    let cell_site = new_row.insertCell(0);
    let cell_date = new_row.insertCell(1);
    let cell_clause = new_row.insertCell(2);
    let cell_link = new_row.insertCell(3);
    let cell_alert = new_row.insertCell(4);

    // Create Text to add to each new cell
    let text_site = document.createTextNode(info[1]);
    let text_date = document.createTextNode(info[0]);

    // If the current website domain is not in our external file,
    // We display "Not Found" in the appopriate extension fields
    // Otherwise, we get that information and display it

    if (obj[info_site] == undefined) {
      var text_clause = document.createTextNode("Not Found");
      var text_link = document.createTextNode("Not Found");
    }
    else {
      var text_clause = document.createTextNode(obj[info_site]["clauses"]);
      var text_link = document.createTextNode(obj[info_site]["start_url"]);
    }


    //check if the title contains any alert words
    // curr_title = info_site;
    // if (alerts.some(function (v) { return curr_title.indexOf(v) >= 0; })) {
    //   // There's at least one
    //   // console.log("found at v " + v);
    //   var text_alert = document.createTextNode("An alert was found on this site");
    // }
    // else {
    //   var text_alert = document.createTextNode("None");
    // }

    // var text_alert = "dummy for now"
    // Add Text to new cells
    cell_site.appendChild(text_site);
    cell_date.appendChild(text_date);
    cell_clause.appendChild(text_clause);
    cell_link.appendChild(text_link);
    // cell_alert.appendChild(text_alert);
  }
}

// The below will take get the information currently in local storage
// We are storing everything in an object called 'browse_info'
// And pulling that out of the argument we name 'result' below
chrome.storage.local.get('browse_info', function (result) {
  chrome.storage.local.get('title', function (result2) {
    var title_lst = result2.title;
    var lst = result.browse_info;

    // This section adds browsing history to a list, to sort by time accessed
    var sort_lst = []
    for (obj in lst){
      sort_lst.push([lst[obj], obj])
    }
    sort_lst.sort()
    //console.log(sort_lst)

    // In index.html, the table has id "table". 
    // The code below creates new rows there.
    let table_ref = document.getElementById("table");


    fetch(fetch_file)
    .then(response => response.json())
    .then(data => print_table(sort_lst, data, table_ref))


    // 'sort_lst' is a list of info from 'browse_info', sorted by date
    // for each entry, which we call 'info' we add a row

    /////////
    // for (let i  = 0; i < sort_lst.length; i++) {

    //   let info = sort_lst[i];
    //   let info_site = info[1];
    //   let info_date = info[0];

    //   // Insert new empty row
    //   let new_row = table_ref.insertRow(-1);

    //   // Insert new cells for each relevant field
    //   let cell_site = new_row.insertCell(0);
    //   let cell_date = new_row.insertCell(1);
    //   let cell_clause = new_row.insertCell(2);
    //   let cell_link = new_row.insertCell(3);
    //   let cell_alert = new_row.insertCell(4);

    //   // Create Text to add to each new cell
    //   let text_site = document.createTextNode(info[1]);
    //   let text_date = document.createTextNode(info[0]);

    //   // If the current website domain is not in our external file,
    //   // We display "Not Found" in the appopriate extension fields
    //   // Otherwise, we get that information and display it

    //   if (dummy[info_site] == undefined) {
    //     var text_clause = document.createTextNode("Not Found");
    //     var text_link = document.createTextNode("Not Found");
    //   }
    //   else {
    //     var text_clause = document.createTextNode(dummy[info_site]["text"]);
    //     var text_link = document.createTextNode(dummy[info_site]["start_url"]);
    //   }


    //   //check if the title contains any alert words
    //   // curr_title = info_site;
    //   // if (alerts.some(function (v) { return curr_title.indexOf(v) >= 0; })) {
    //   //   // There's at least one
    //   //   // console.log("found at v " + v);
    //   //   var text_alert = document.createTextNode("An alert was found on this site");
    //   // }
    //   // else {
    //   //   var text_alert = document.createTextNode("None");
    //   // }

    //   // var text_alert = "dummy for now"
    //   // Add Text to new cells
    //   cell_site.appendChild(text_site);
    //   cell_date.appendChild(text_date);
    //   cell_clause.appendChild(text_clause);
    //   cell_link.appendChild(text_link);
    //   // cell_alert.appendChild(text_alert);
    // }
    ////////
  });

});

