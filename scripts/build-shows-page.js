const bandShowEl = document.querySelector(".bandShows");

const bandShowInfo = [
  {
    date: "Mon Sept 06 2021",
    venue: "Ronald Lane",
    location: "San Francisco, CA",
  },
  {
    date: "Tue Sept 21 2021",
    venue: "Pier 3 East",
    location: "San Francisco, CA",
  },
];

function displayBandShows(bandShowInfo) {
  const bandShowsEl = document.querySelector("bandShows");

  const bandShowsTitle = document.createElement("h2");
  bandShowsTitle.classList.add("bandShows__mainTitle");
  bandShowsTitle.innerText = "Shows";
  bandShowEl.appendChild(bandShowsTitle);
}

displayBandShows(bandShowInfo);
