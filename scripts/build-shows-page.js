const bandShowsArray = [
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
  {
    date: "Fri Oct 15 2021",
    venue: "View Lounge",
    location: "San Francisco, CA",
  },
  {
    date: "Sat Nov 06 2021",
    venue: "Hyatt Agency",
    location: "San Francisco, CA",
  },
  {
    date: "Fri Nov 26 2021",
    venue: "Moscow Center",
    location: "San Francisco, CA",
  },
  {
    date: "Wed Dec 15 2021",
    venue: "Press Club",
    location: "San Francisco, CA",
  },
];

function displayShows(bandShowsArray) {
  const bandShowsEl = document.querySelector(".bandShows");

  const bandShowsTitle = document.createElement("h2");
  bandShowsTitle.classList.add("bandShows__mainTitle");
  bandShowsTitle.innerText = "Shows";
  bandShowsEl.appendChild(bandShowsTitle);

  const bandShowsHeaderWrapper = document.createElement("div");
  bandShowsHeaderWrapper.classList.add("bandShows__headerWrapper");
  bandShowsEl.appendChild(bandShowsHeaderWrapper);

  const bandShowsHeaderContent = document.createElement("div");
  bandShowsHeaderContent.classList.add("bandShows__headerContent");
  bandShowsHeaderWrapper.appendChild(bandShowsHeaderContent);

  const bandShowDateHeader = document.createElement("h3");
  bandShowDateHeader.classList.add("bandShows__headerContent-date");
  bandShowDateHeader.innerText = "DATE";
  bandShowsHeaderContent.appendChild(bandShowDateHeader);

  const bandShowVenueHeader = document.createElement("h3");
  bandShowVenueHeader.classList.add("bandShows__headerContent-venue");
  bandShowVenueHeader.innerText = "VENUE";
  bandShowsHeaderContent.appendChild(bandShowVenueHeader);

  const bandShowLocationHeader = document.createElement("h3");
  bandShowLocationHeader.classList.add("bandShows__headerContent-location");
  bandShowLocationHeader.innerText = "LOCATION";
  bandShowsHeaderContent.appendChild(bandShowLocationHeader);

  const hiddenEl = document.createElement("span");
  hiddenEl.classList.add("bandShows__hidden");
  hiddenEl.innerText = ".";
  bandShowsHeaderContent.appendChild(hiddenEl);

  for (let key in bandShowsArray) {
    const bandShowsParent = document.createElement("div");
    bandShowsParent.classList.add("bandShows__showData");
    bandShowsHeaderWrapper.appendChild(bandShowsParent);

    const bandShowsContent = document.createElement("div");
    bandShowsContent.classList.add("bandShows__showContent");
    bandShowsParent.appendChild(bandShowsContent);

    const dateTitle = document.createElement("h4");
    dateTitle.classList.add("bandShows__dateTitle");
    dateTitle.innerText = "DATE";
    bandShowsContent.appendChild(dateTitle);

    const date = document.createElement("h3");
    date.classList.add("bandShows__date");
    date.innerText = bandShowsArray[key]["date"];
    bandShowsContent.appendChild(date);

    const venueTitle = document.createElement("h4");
    venueTitle.classList.add("bandShows__venueTitle");
    venueTitle.innerText = "VENUE";
    bandShowsContent.appendChild(venueTitle);

    const venue = document.createElement("h3");
    venue.classList.add("bandShows__venue");
    venue.innerText = bandShowsArray[key]["venue"];
    bandShowsContent.appendChild(venue);

    const locationTitle = document.createElement("h4");
    locationTitle.classList.add("bandShows__locationTitle");
    locationTitle.innerText = "LOCATION";
    bandShowsContent.appendChild(locationTitle);

    const location = document.createElement("h3");
    location.classList.add("bandShows__location");
    location.innerText = bandShowsArray[key]["location"];
    bandShowsContent.appendChild(location);

    const buyTicketsButtonWrapper = document.createElement("div");
    buyTicketsButtonWrapper.classList.add("bandShows__buttonWrapper");
    bandShowsContent.appendChild(buyTicketsButtonWrapper);

    const buyTicketsButton = document.createElement("button");
    buyTicketsButton.classList.add("bandShows__button");
    buyTicketsButton.innerText = "BUY TICKETS";
    buyTicketsButtonWrapper.appendChild(buyTicketsButton);
  }
}

displayShows(bandShowsArray);
