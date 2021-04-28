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

    // Create Text to add to each new cell
  	let new_text = document.createTextNode(key);
  	let text_date = document.createTextNode(lst[key]);

    // If the current website domain is not in our external file,
    // We display "Not Found" in the appopriate extension fields
    // Otherwise, we get that information and display it
    if (dummy[key] == undefined){
      var text_info = document.createTextNode("Not Found");
      var text_link = document.createTextNode("Not Found");
    }
    else {
      var text_info = document.createTextNode(dummy[key]["text"]);
      var text_link = document.createTextNode(dummy[key]["start_url"]);
    }

    // Add Text to new cells
  	new_cell.appendChild(new_text);
  	cell_date.appendChild(text_date);
    cell_info.appendChild(text_info);
    cell_link.appendChild(text_link);
  }
});

