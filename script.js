const input = document.querySelector("input");
const button = document.querySelector("button");
const result = document.querySelector("#result");
const favList = document.querySelector("#favorites-list");
const renderFavorites = function () {
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  favList.innerHTML = favorites
    .map(function (name) {
      return `<li>${name}</li>`;
    })
    .join("");
};
renderFavorites();
let username = "";

const saveFavorite = function (username) {
  let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  if (!favorites.includes(username)) {
    favorites.push(username);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderFavorites();
  }
};

const fetchData = async function fetchUserData(username) {
  const response = await fetch(`https://api.github.com/users/${username}`);
  const data = await response.json();
  if (data.message === "Not Found") {
    result.innerHTML = `<p>User not found</p>`;
    console.log("user not found");
  } else {
    console.log(data);
    result.innerHTML = `
  <div class="card">
    <img src="${data.avatar_url}">
    <button id="save-btn">★ Save</button>
    <h2>${data.login}</h2>
    <p>${data.bio}</p>
    <p>Repos: ${data.public_repos}</p>
    <P>followers: ${data.followers}</P>
    <P>following: ${data.following}</P>
  </div>
`;
    const saveBtn = document.querySelector("#save-btn");
    saveBtn.addEventListener("click", function () {
      saveFavorite(data.login);
    });
  }
};

//click listener on the button

const loading = function () {
  result.innerHTML = `<p>loading...</p>`;
  fetchData(input.value);
};

button.addEventListener("click", function () {
  loading();
});

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    loading();
  }
});
