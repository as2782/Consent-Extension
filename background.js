chrome.tabs.onActivated.addListener(tab => {
  chrome.tabs.get(tab.tabId, current_tab_info => {
    // This would just show you which url in the background
    // console.log(current_tab_info.url)
    if (/^https:\/\/www\.google/.test(current_tab_info.url)) {
      chrome.tabs.insertCSS(null, { file: './mystyles.css' });
      chrome.tabs.executeScript(null, { file: './foreground.js' }, () => console.log('i injected'))
    }
  });
});

