chrome.tabs.onActivated.addListener(tab => {
  chrome.tabs.get(tab.tabId, current_tab_info => {
    // Only collect tab title if it is not "New Tab", there are probably other 
    //edge cases as well
    if (/[^New Tab]/.test(current_tab_info.title)) {
      chrome.storage.local.set({ "current_title": current_tab_info.title }, function () {
        //this is just to see that it's working in "background page" on extension page
        console.log('Title is set to ' + current_tab_info.title);
      });
    }

    // if (/^https:\/\/www\.google/.test(current_tab_info.url)) {
    //   chrome.tabs.insertCSS(null, { file: './mystyles.css' });
    //   chrome.tabs.executeScript(null, { file: './foreground.js' }, () => console.log('i injected'))
    // }
  });
});

