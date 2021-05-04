/* Some code related to how to use Google login with Chrome Extensions is from:
https://github.com/an-object-is-a/google-openid-connect-chrome-extension/blob/master/background.js
*/

// The object that will be stored in local storage
// It will contain websites visited and dates of visit
var all_lst = {};


// The below will ensure that previous browsing history is not overwritten
// after ending and starting a new browsing session
// try {
//   chrome.storage.local.get('browse_info', function (result) {
//     let obj = result.browse_info;
//     all_lst = obj;
//   });
// }
// catch(error) {
//   // pass - do nothing here
// }


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
      // Converting date to mm/dd/yy hh:mm
      // any variable using slice() below is having a leading 0 added when needed
      let date_month = ('0' + String(date.getMonth() + 1)).slice(-2)
      let date_day = ('0' + String(date.getDate())).slice(-2)
      let date_year = String(date.getFullYear())
      let date_hour = String(date.getHours())
      let date_mins = ('0' + String(date.getMinutes())).slice(-2)
      date =  date_month + '/' + date_day + '/' + date_year + ', ' + date_hour + ':' + date_mins;
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
      } else if (all_lst===undefined) {
        // handling the bug that all
      }
    }
  });
});


const CLIENT_ID = encodeURIComponent('347250747253-foraleeguhfi6firnbdmnui92on325ig.apps.googleusercontent.com');
const RESPONSE_TYPE = encodeURIComponent('id_token');
const REDIRECT_URI = encodeURIComponent('https://hblldpopcbinajlabijfdmongpamgame.chromiumapp.org')
const SCOPE = encodeURIComponent('openid');
const STATE = encodeURIComponent('amao');
const PROMPT = encodeURIComponent('consent');

let user_signed_in = false;

function is_user_signed_in() {
    return user_signed_in;
}

function create_auth_endpoint() {
    let nonce = encodeURIComponent(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));

    let openId_endpoint_url =
        `https://accounts.google.com/o/oauth2/v2/auth
?client_id=${CLIENT_ID}
&response_type=${RESPONSE_TYPE}
&redirect_uri=${REDIRECT_URI}
&scope=${SCOPE}
&state=${STATE}
&nonce=${nonce}
&prompt=${PROMPT}`;

    return openId_endpoint_url;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'login') {
        if (user_signed_in) {
            console.log("User is already signed in.");
        } else {
            chrome.identity.launchWebAuthFlow({
                'url': create_auth_endpoint(),
                'interactive': true
            }, function (redirect_url) {
                if (chrome.runtime.lastError) {
                    // problem signing in
                } else {
                    let id_token = redirect_url.substring(redirect_url.indexOf('id_token=') + 9);
                    id_token = id_token.substring(0, id_token.indexOf('&'));
                    const user_info = KJUR.jws.JWS.readSafeJSONString(b64utoutf8(id_token.split(".")[1]));

                    if ((user_info.iss === 'https://accounts.google.com' || user_info.iss === 'accounts.google.com')
                        && user_info.aud === CLIENT_ID) {
                        console.log("User successfully signed in.");
                        user_signed_in = true;
                        chrome.browserAction.setPopup({ popup: './popup-signed-in.html' }, () => {
                            sendResponse('success');
                        });
                    } else {
                        // invalid credentials
                        console.log("Invalid credentials.");
                    }
                }
            });

            return true;
        }
    } else if (request.message === 'logout') {
        user_signed_in = false;
        chrome.browserAction.setPopup({ popup: './popup.html' }, () => {
            sendResponse('success');
        });

        return true;
    } else if (request.message === 'isUserSignedIn') {
        sendResponse(is_user_signed_in());
    }
});
