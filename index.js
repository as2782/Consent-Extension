// Hardcoding the list of websites and privacy policy information for now. 
// Calling it 'dummy'. Will pull from server in final implementation
const dummy = {
  "www.google.com":
  {
    "start_url": "Privacy Policy Link",
    "final_url": "Google Privacy Policy Link",
    "text": "This is Google's Privacy Policy Info"
  },
  "www.reddit.com":
  {
    "start_url": "Privacy Policy Link",
    "final_url": "Reddit Privacy Policy Link",
    "text": "This is Reddit's Privacy Policy Info"
  },
  "www.youtube.com":
  {
    "start_url": "Privacy Policy Link",
    "final_url": "Youtube Privacy Policy Link",
    "text": "This is YouTube's Privacy Policy Info"
  },
  "www.facebook.com":
  {
    "start_url": "Privacy Policy Link",
    "final_url": "Facebook Privacy Policy Link",
    "text": "This is Facebook's Privacy Policy Info"
  },
  "www.tumblr.com":
  {
    "start_url": "Privacy Policy Link",
    "final_url": "Tumblr Privacy Policy Link",
    "text": "This is Tumblr's Privacy Policy Info"
  }
}
// const coppa_policies = require('./coppa_policies.json');
fetch("./employees.json")
  .then(response => {
    return response.json();
  })

// list of alert words to check the titles against
var alerts = ["porn", "drug", "weed", "pot", "suicide", "Drug", "sex", "cannabis",
  "hashish", "hemp", "herb", "tea", "help", "ganja", "hash", "joint", "reefer",
  "doobie", "loco weed", "Porno", "raunchy", "steamy", "sexy", "X-rated", "xxx",
  "self mutilation", "self-mutilation", "guns", "qanon", "Qanon", "self-injury"];

// Will use the fetch api to pull info from server.
// Code is commented out, but will be the following:
// fetch('http://server.com/file.json')
//     .then(response => response.json())
//     .then(data => console.log(data));
// No need to console.log the data in the previous line.

// The below will take get the information currently in local storage
// We are storing everything in an object called 'browse_info'
// And pulling that out of the argument we name 'result' below
chrome.storage.local.get('browse_info', function (result) {
  chrome.storage.local.get('title', function (result2) {
    var title_lst = result2.title;
    var lst = result.browse_info;
    // In index.html, the table has id "table". 
    // The code below creates new rows there.
    let table_ref = document.getElementById("table");
    // 'lst' is the 'browse_info' object from before
    // for each entry, which we call 'key' we add a row
    for (const key in lst) {
      // Insert new empty row
      let new_row = table_ref.insertRow(-1);

      // Insert new cells for each relevant field
      let new_cell = new_row.insertCell(0);
      let cell_date = new_row.insertCell(1);
      let cell_info = new_row.insertCell(2);
      let cell_link = new_row.insertCell(3);
      let cell_alert = new_row.insertCell(4);

      // Create Text to add to each new cell
      let new_text = document.createTextNode(key);
      let text_date = document.createTextNode(lst[key]);

      // If the current website domain is not in our external file,
      // We display "Not Found" in the appopriate extension fields
      // Otherwise, we get that information and display it

      if (dummy[key] == undefined) {
        var text_info = document.createTextNode("Not Found");
        var text_link = document.createTextNode("Not Found");
      }
      else {
        var text_info = document.createTextNode(dummy[key]["text"]);
        var text_link = document.createTextNode(dummy[key]["start_url"]);
      }

      // make a map of the json file so that its faster to search through it
      // var policyMap = {};
      // var i = null;
      // for (i = 0; coppa_policies.length > i; i += 1) {
      //   policyMap[coppa_policies[i].start_url] = coppa_policies[i];
      // }

      // var hasPolicy = function (curr_url) {
      //   return policyMap[curr_url];
      // };

      // if (hasPolicy(key) != null) {
      //   var text_info = document.createTextNode(hasPolicy(key).text);
      //   var text_link = document.createTextNode(hasPolicy(key).final_url);
      // }
      // else {
      //   var text_info = document.createTextNode("Not Found");
      //   var text_link = document.createTextNode("Not Found");
      // }

      //check if the title contains any alert words
      curr_title = key;
      if (alerts.some(function (v) { return curr_title.indexOf(v) >= 0; })) {
        // There's at least one
        // console.log("found at v " + v);
        var text_alert = document.createTextNode("An alert was found on this site");
      }
      else {
        var text_alert = document.createTextNode("None");
      }

      // var text_alert = "dummy for now"
      // Add Text to new cells
      new_cell.appendChild(new_text);
      cell_date.appendChild(text_date);
      cell_info.appendChild(text_info);
      cell_link.appendChild(text_link);
      cell_alert.appendChild(text_alert);
    }
  });

});

