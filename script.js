const main = document.querySelector("main");
const apodEl = document.querySelector(".apod");
const roverList = document.querySelector(".rover-list");
const errorMsg = document.querySelector(".error-msg");
const dateInput = document.querySelector("#date-input");
const submitButton = document.querySelector("#submit-button");

const NASA_API_KEY = "l95b8INrChDhdCi3ZGtuakCK9lkQ0taWdRcDUYrP";

const apodURL = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`;

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
    const photos = data.photos
      .map((photo) => `<li><img src="${photo.img_src}" alt="Rover photo"></li>`)
      .join("");
    roverList.insertAdjacentHTML("beforeend", photos);
  }
}

// Fetch and displat APOD
fetchData(apodURL, handleApodData);

submitButton.addEventListener("click", function () {
  const date = dateInput.value;
  const roverURL = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&api_key=${NASA_API_KEY}`;

  fetchData(roverURL, handleRoverData);
});
