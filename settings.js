function save_options (e) {
  e.preventDefault();
  browser.storage.sync.set({
    instance: document.querySelector("#instance").value
  });
}

function restore_options () {

  function set_current_choice (result) {
    document.querySelector("#instance").value = result.instance;
  }

  function on_error (error) {
    console.log(`Error: ${error}`);
    document.querySelector("#instance").value = "mastodon.social";
  }

  let getting = browser.storage.sync.get("instance");
  getting.then(set_current_choice, on_error);
}

document.addEventListener("DOMContentLoaded", restore_options);
document.querySelector("form").addEventListener("submit", save_options);

