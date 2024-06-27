document.addEventListener("DOMContentLoaded", function () {
  const accessKey = "vXOkxXWRK9pfBCu62ce6sZLXHBv0GVO8DMVmzvDPKGRcIvm9i7nTAZRv";

  const formElm = document.querySelector("form");
  const inputElm = document.querySelector("#input-search");
  const searchResults = document.querySelector(".search-results");

  let page = 1;

  formElm.addEventListener("submit", (event) => {
    event.preventDefault();
    const inputData = inputElm.value; // Retrieve input field value
    page = 1;
    searchImages(inputData); // Pass inputData to searchImages
  });

  async function searchVideos(inputData) {
    const perPage = 10; // Set the number of videos per page
    const url = `https://api.pexels.com/videos/search?query=${inputData}&per_page=${perPage}&page=${page}`;

    const response = await fetch(url, {
      headers: {
        Authorization: accessKey,
      },
    });
    const data = await response.json();

    const results = data.videos;

    // Clear previous search results
    searchResults.innerHTML = "";

    results.forEach((result) => {
      const videoWrapper = document.createElement("div");
      videoWrapper.classList.add("video-box");

      const video = document.createElement("video");
      video.src = result.video_files[0].link;
      video.setAttribute("loop", true);
      video.setAttribute("muted", true);

      // Add event listeners to play/pause video
      video.addEventListener("mouseenter", () => {
        video.play();
      });

      video.addEventListener("mouseleave", () => {
        video.pause();
      });

      videoWrapper.appendChild(video);
      searchResults.appendChild(videoWrapper);
    });

    page++;
  }

  async function searchImages(inputData) {
    const perPage = 10; // Set the number of images per page
    const url = `https://api.pexels.com/v1/search?query=${inputData}&per_page=${perPage}&page=${page}`;

    const response = await fetch(url, {
      headers: {
        Authorization: accessKey,
      },
    });

    const data = await response.json();

    const results = data.photos;

    // Clear previous search results
    searchResults.innerHTML = "";

    results.forEach((result) => {
      const imageWrapper = document.createElement("div");
      imageWrapper.classList.add("img-box");

      const image = document.createElement("img");
      image.src = result.src.small;

      imageWrapper.appendChild(image);
      searchResults.appendChild(imageWrapper);
    });

    page++;
  }

  const images = document.querySelector(".images");
  images.addEventListener("click", () => {
    const inputData = inputElm.value; // Retrieve input field value
    searchImages(inputData); // Pass inputData to searchImages
  });

  const videos = document.querySelector(".videos");
  videos.addEventListener("click", () => {
    const inputData = inputElm.value; // Retrieve input field value
    searchVideos(inputData); // Pass inputData to searchVideos
  });
});
