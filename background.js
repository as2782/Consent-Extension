// The object that will be stored in local storage
// It will contain websites visited and dates of visit
var all_lst = {};


// The below will ensure that previous browsing history is not overwritten
// after ending and starting a new browsing session
try {
  chrome.storage.local.get('browse_info', function (result) {
    let obj = result.browse_info;
    all_lst = obj;
  });
}
catch(error) {
  // pass - do nothing here
}


var titles = {};


// This listens on every time a page is updated (refreshed or changed)
// Does not listen on whether a tab or browser is first opened
chrome.tabs.onUpdated.addListener(tab => {
  // This line looks at the active window
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
    // console.log(tabs[0].title); // just a test; .title can be used for watch words later
    // Looks like tabs[0] looks at the tab with tab id 0, which is the active tab
    let url = tabs[0].url;

    // The previous line takes the whole url. The next lines convert it to a URL object
    // And truncates the object to just to 'www.domain.whatever'
    // In instances where 'www' or '.whatever' is missing, just returns 'domain'
    let domain = new URL(url);
    domain = domain.hostname;

    // When any update happens, if a url exists, we take the current date and time
    // But only if the url is not for the extension itself, the extensions page, or a newly opened tab
    // update means: someone refreshes OR clicks on something on the page OR 
    // makes a search
    if (domain == chrome.runtime.id | domain == "newtab" | domain == "extensions") {
      // do nothing
    }
    else if (url) {
      let date = new Date();
      // Converting date to mm/dd/yy
      date = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
      // Checking if this site has already been accessed before
      // If it has, we do not add it to the object that has all accessed domains
      if (!(all_lst.hasOwnProperty(domain))) {
        // Converting the Date object to a string so it can be displayed properly
        all_lst[domain] = String(date);



        // Adding the website and date info to local storage
        chrome.storage.local.set({ 'browse_info': all_lst }, function () {
          // empty function call
        });
        // Adding the website title to local storage to match against watch words
        titles.hasOwnProperty(tabs[0].title);
        chrome.storage.local.set({ 'title': titles }, function () {
          // empty function call 
        });
      }
    }
  });
});


