// console.log('from foreground')
const first = document.createElement('button');
first.innerText = "SET DATA";
first.id = "first";

// const second = document.createElement('button');
// second.innerText = "SHOUTOUT";
// second.id = "second";

// document.querySelector('body').appendChild(first)
// document.querySelector('body').appendChild(second)

document.querySelector('body').appendChild(first);

first.addEventListener('click', () => {
  // you can store by doing .sync, but that syncs so that you have to login 
  // whereas local stores it on their device basically
  chrome.storage.local.set({ "password": "123" });
  console.log("I SET DATA");
})

document.querySelector('#go-to-options').addEventListener(function () {
  console.log("openned")
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('options.html'));
  }
});