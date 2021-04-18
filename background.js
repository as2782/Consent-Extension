var history_lst = [];
var urls_lst = [];
// The object that will be stored in local storage
// Eventually will need to not overwrite this with each update of extension
var all_lst = {};

// chrome.tabs.onActivated.addListener(tab => {
//   chrome.tabs.get(tab.tabId, current_tab_info => {
//     // Only collect tab title if it is not "New Tab", there are probably other 
//     //edge cases as well
//     if (/[^New Tab]/.test(current_tab_info.title)) {
//       history_lst.push(current_tab_info.title);
//       chrome.storage.local.set({ "title_list": history_lst }, function () {
//         //this is just to see that it's working in "background page" on extension page
//         console.log('Title is set to ' + current_tab_info.title);
//         console.log('title list is: ' + history_lst);
//       });
//     }

//     // if (/^https:\/\/www\.google/.test(current_tab_info.url)) {
//     //   chrome.tabs.insertCSS(null, { file: './mystyles.css' });
//     //   chrome.tabs.executeScript(null, { file: './foreground.js' }, () => console.log('i injected'))
//     // }
//   });
// });

// This will update every time a page is updated (refreshed, or changes in some way)
// Does not listen on whether a tab or browser is first opened
chrome.tabs.onUpdated.addListener(tab => {
  // This line looks at the active window
  chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    // console.log(tabs[0].title); // just a test; .title can be used for watch words later
    // Looks like tabs[0] looks at the tab with tab id 0, which is the active tab?
    let url = tabs[0].url;
    // The previous line takes the whole url. These lines convert it to a URL object
    // And truncates the object to just to 'www.domain.whatever'
    // In instances where 'www' or '.whatever' is missing, just returns 'domain'
    let domain = new URL(url);
    domain = domain.hostname;
    // When any update happens, if a url exists, we take the current date and time
    if (url) {
      let date = new Date();
      // Converting date to mm/dd/yy
      date = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
      // Checking if this site has already been accessed before
      // If it has, we do not add it to the object that has all accessed domains
      if (!(all_lst.hasOwnProperty(domain))) {
        all_lst[domain] = String(date); //it seems we have to convert these to string to print out to console after getting from local storage
        //console.log(all_lst);
        // Adding this info to local storage
        chrome.storage.local.set({'browse_info': all_lst}, function() {
          //console.log(all_lst);
        });
      }
    }

    // urls_lst.push(domain);
    

    
  });
  // Just for testing purposes
  // chrome.storage.local.get('browse_info', function (result) {
  //   var lst = result.browse_info;
  //   console.log(lst);
  // });
});