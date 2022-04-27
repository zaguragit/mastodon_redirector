const user_regex = /\/@[A-Za-z0-9_]*/;

function get_current_user () {
  return window.location.href.match(user_regex)[0].substring(2)
}

const follow_link = `/users/${get_current_user()}/remote_follow`;
var my_instance = "mastodon.social"

function get_redirect_url () {
  let current_url = window.location.href;
  
  let instance = current_url.replace(/^[a-z]*:\/\//, "").replace(user_regex, "");
  let user = current_url.match(user_regex)[0].substring(2);
  let new_url = `https://${my_instance}/web/@${user}@${instance}`;
  
  return new_url;
}

function on_load (callback) {
  if (document.readyState !== 'loading')
    callback();
  else document.addEventListener('DOMContentLoaded', () => {
    callback();
  });
}

function replace_button () {
  let button = document.querySelector(`a[href*="${follow_link}"]`);
  button.innerText = `See @${my_instance}`;
  button.href = get_redirect_url();
  button.target = "_self";
  button.classList.remove("modal-button");
}

let getting = browser.storage.sync.get("instance");
getting.then((item) => {
  if (item.instance)
    my_instance = item.instance;
  on_load(replace_button);
}, (error) => {
  console.log(error);
  on_load(replace_button);
});
