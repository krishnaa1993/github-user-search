const input = document.querySelector("input");
const button = document.querySelector("button");
const result = document.querySelector("#result");
let username = "";

//click listener on the button

button.addEventListener("click", function () {
  async function fetchUserData(username) {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    console.log(data);
    result.innerHTML = `
    <img src="${data.avatar_url}">
    <h2>${data.login}</h2>;
    <p>${data.bio}</p>;
    <p>Repos: ${data.public_repos}</p>
    <P>followers: ${data.following}</P>
    <P>following: ${data.following}</P>`;
  }
  fetchUserData(input.value);
});
