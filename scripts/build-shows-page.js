/*
    Name: Anurag Bhattacharya
    Project Name: BandSite Project - Sprint 2
    Document Description: This is the Build Shows JavaScript File
    
    Diving Deeper:
    - Unable to figure out Dynamic timestamp with Comments form
    - For Comments Form, there is Form Validations
    - If there are any errors:
        - Prevents form from submitting
        - Shows the error state as mentioned on the Style Guide
    - If there are no errors:
        - Clears any error states from form
        - Submits the form
*/

let baseURL = "https://project-1-api.herokuapp.com";
let api_key = "?api_key=7c2395bc-a9b1-4505-b5c5-0331ea11bff0";
let showsEndpoint = "/showdates";
let fullURL = `${baseURL}${showsEndpoint}${api_key}`;

axios
  .get(`${fullURL}`)
  .then((response) => {
    displayShowHeaders();
    displayShowData(response.data);
  })
  .catch((error) => {
    console.error("Fetch Error:", error);
  });

//This Function Displays the Show Data
function displayShowHeaders() {
  //Getting the element to store the show data
  const bandShowsEl = document.querySelector(".bandShows");
  //Band Show Data Main Title
  const bandShowsTitle = document.createElement("h2");
  bandShowsTitle.classList.add("bandShows__mainTitle");
  bandShowsTitle.innerText = "Shows";
  bandShowsEl.appendChild(bandShowsTitle);
  //Band Show Data Header Wrapper
  const bandShowsHeaderWrapper = document.createElement("div");
  bandShowsHeaderWrapper.classList.add("bandShows__headerWrapper");
  bandShowsEl.appendChild(bandShowsHeaderWrapper);
  //Band Show Header Content
  const bandShowsHeaderContent = document.createElement("div");
  bandShowsHeaderContent.classList.add("bandShows__headerContent");
  bandShowsHeaderWrapper.appendChild(bandShowsHeaderContent);
  //Band Show Date Header
  const bandShowDateHeader = document.createElement("h3");
  bandShowDateHeader.classList.add("bandShows__headerContent-date");
  bandShowDateHeader.innerText = "DATE";
  bandShowsHeaderContent.appendChild(bandShowDateHeader);
  //Band Show Venue Header
  const bandShowVenueHeader = document.createElement("h3");
  bandShowVenueHeader.classList.add("bandShows__headerContent-venue");
  bandShowVenueHeader.innerText = "VENUE";
  bandShowsHeaderContent.appendChild(bandShowVenueHeader);
  //Band Show Location Header
  const bandShowLocationHeader = document.createElement("h3");
  bandShowLocationHeader.classList.add("bandShows__headerContent-location");
  bandShowLocationHeader.innerText = "LOCATION";
  bandShowsHeaderContent.appendChild(bandShowLocationHeader);
  //Band Show Hidden Data - needed to format Table Headers
  const hiddenEl = document.createElement("span");
  hiddenEl.classList.add("bandShows__hidden");
  hiddenEl.innerText = ".";
  bandShowsHeaderContent.appendChild(hiddenEl);
}

function displayShowData(data) {
  let bandShowsHeaderWrapper = document.querySelector(
    ".bandShows__headerWrapper"
  );
  //For Loop to go through each Band Shows Data in Array
  for (let key in data) {
    //Band Shows Parent
    const bandShowsParent = document.createElement("div");
    bandShowsParent.classList.add("bandShows__showData");
    bandShowsHeaderWrapper.appendChild(bandShowsParent);
    //Band Shows Content
    const bandShowsContent = document.createElement("div");
    bandShowsContent.classList.add("bandShows__showContent");
    bandShowsParent.appendChild(bandShowsContent);
    //Band Shows Date Title
    const dateTitle = document.createElement("h4");
    dateTitle.classList.add("bandShows__dateTitle");
    dateTitle.innerText = "DATE";
    bandShowsContent.appendChild(dateTitle);
    //Band Shows Date
    const date = document.createElement("h3");
    date.classList.add("bandShows__date");
    let unixTimeStamp = data[key]["date"];
    let showsDate = new Date(unixTimeStamp);
    let dateString = showsDate.toDateString();
    date.innerText = dateString;
    bandShowsContent.appendChild(date);
    //Band Shows Venue Title
    const venueTitle = document.createElement("h4");
    venueTitle.classList.add("bandShows__venueTitle");
    venueTitle.innerText = "VENUE";
    bandShowsContent.appendChild(venueTitle);
    //Band Shows Venue
    const venue = document.createElement("h3");
    venue.classList.add("bandShows__venue");
    venue.innerText = data[key]["place"];
    bandShowsContent.appendChild(venue);
    //Band Shows Location Title
    const locationTitle = document.createElement("h4");
    locationTitle.classList.add("bandShows__locationTitle");
    locationTitle.innerText = "LOCATION";
    bandShowsContent.appendChild(locationTitle);
    //Band Shows Location
    const location = document.createElement("h3");
    location.classList.add("bandShows__location");
    location.innerText = data[key]["location"];
    bandShowsContent.appendChild(location);
    //Band Shows Buy Tickets Button Wrapper
    const buyTicketsButtonWrapper = document.createElement("div");
    buyTicketsButtonWrapper.classList.add("bandShows__buttonWrapper");
    bandShowsContent.appendChild(buyTicketsButtonWrapper);
    //Band Shows Buy Tickets Button
    const buyTicketsButton = document.createElement("button");
    buyTicketsButton.classList.add("bandShows__button");
    buyTicketsButton.innerText = "BUY TICKETS";
    buyTicketsButtonWrapper.appendChild(buyTicketsButton);
  }
  const showDataRow = document.querySelectorAll(".bandShows__showData");
  showDataRow.forEach((show) => {
    show.addEventListener("click", (event) => {
      showDataRow.forEach((show) => {
        show.classList.remove("bandShows__selectedRow");
        event.target.classList.add("bandShows__selectedRow");
      });
    });
  });
}
