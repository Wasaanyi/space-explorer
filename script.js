const main = document.querySelector("main");
const apodEl = document.querySelector(".apod");
const roverList = document.querySelector(".rover-list");
const errorMsg = document.querySelector(".error-msg");
const dateInput = document.querySelector("#date-input");
const submitButton = document.querySelector("#submit-button");

const apodURL = `https://cheerful-twilight-c1399d.netlify.app/.netlify/functions/apodAPI`;

async function fetchData(url, handleData) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    handleData(data);
  } catch (error) {
    errorMsg.style.display = "block";
    errorMsg.innerHTML = "There is a problem with your fetch: " + error;
  }
}

function handleApodData(data) {
  const html = `
    <img src="${data.url}" alt="apod">
    <p>${data.title}</p>
  `;
  apodEl.insertAdjacentHTML("beforeend", html);
}

function handleRoverData(data) {
  if (!data.photos.length) {
    roverList.innerHTML =
      "<li>No photos were taken on this date. Please select another date.</li>";
  } else {
    roverList.innerHTML = "";
    const photos = data.photos
      .map((photo) => `<li><img src="${photo.img_src}" alt="Rover photo"></li>`)
      .join("");
    roverList.insertAdjacentHTML("beforeend", photos);
  }
}

// Fetch and display APOD
fetchData(apodURL, handleApodData);

submitButton.addEventListener("click", function () {
  const date = dateInput.value
    ? dateInput.value
    : new Date().toString().slice(0, 10);

  const roverURL = `https://cheerful-twilight-c1399d.netlify.app/.netlify/functions/roverAPI?date=${date}`;

  fetchData(roverURL, handleRoverData);
});
