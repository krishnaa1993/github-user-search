const input = document.querySelector("input");
const button = document.querySelector("button");
const result = document.querySelector("#result");
let username = "";

//click listener on the button

button.addEventListener("click", function () {
  async function fetchUserData(username) {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    if (data.message === "Not Found") {
      result.innerHTML = `<p>User not found</p>`;
      console.log("user not found");
    } else {
      console.log(data);
      result.innerHTML = `
    <img src="${data.avatar_url}">
    <h2>${data.login}</h2>;
    <p>${data.bio}</p>;
    <p>Repos: ${data.public_repos}</p>
    <P>followers: ${data.followers}</P>
    <P>following: ${data.following}</P>`;
    }
  }
  fetchUserData(input.value);
});
