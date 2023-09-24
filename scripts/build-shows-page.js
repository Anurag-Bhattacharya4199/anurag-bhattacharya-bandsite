/*
  Name: 
  Anurag Bhattacharya
  Project: 
  BandSite Project - Sprint 3
  Description: 
  This is the Build Shows Table JavaScript Functionalities
  Diving Deeper Notes:
  - All Diving Deeper From Sprint 1 Completed
  - Form Validation Diving Deeper From Sprint 2 Completed
  - Dynamic Timestamp Diving Deeper From Sprint 2 Not Completed
  - All Diving Deeper From Sprint 3 Completed
*/

//API Information - URL, api-key, endpoint
let baseURL = "https://project-1-api.herokuapp.com";
let api_key = "?api_key=7c2395bc-a9b1-4505-b5c5-0331ea11bff0";
let showsEndpoint = "/showdates";
let fullURL = `${baseURL}${showsEndpoint}${api_key}`;

/**
 * Displays Show Table Headers and Show Data
 * @param {Array} response
 */
axios
  .get(`${fullURL}`)
  .then((response) => {
    //Calls the function to display Show Data Headers on page
    displayShowHeaders();
    /**
     * Displays each Show Data Information
     * @param {Array} response.data
     */
    displayShowData(response.data);
  })
  //To Catch any errors during the GET Request to API
  .catch((error) => {
    console.error("Fetch Error:", error);
  });

/**
 * Displays the Show Table Headers
 */
function displayShowHeaders() {
  //Gets the Parent element for the Show Data Table
  const bandShowsEl = document.querySelector(".bandShows");

  //Show Data Table Main Title
  const bandShowsTitle = document.createElement("h2");
  bandShowsTitle.classList.add("bandShows__mainTitle");
  bandShowsTitle.innerText = "Shows";
  bandShowsEl.appendChild(bandShowsTitle);

  //Show Data Table Wrapper
  const bandShowsHeaderWrapper = document.createElement("div");
  bandShowsHeaderWrapper.classList.add("bandShows__headerWrapper");
  bandShowsEl.appendChild(bandShowsHeaderWrapper);

  //Show Data Table Content Wrapper
  const bandShowsHeaderContent = document.createElement("div");
  bandShowsHeaderContent.classList.add("bandShows__headerContent");
  bandShowsHeaderWrapper.appendChild(bandShowsHeaderContent);

  //Show Data Table Header - DATE
  const bandShowDateHeader = document.createElement("h3");
  bandShowDateHeader.classList.add("bandShows__headerContent-date");
  bandShowDateHeader.innerText = "DATE";
  bandShowsHeaderContent.appendChild(bandShowDateHeader);

  //Show Data Table Header - VENUE
  const bandShowVenueHeader = document.createElement("h3");
  bandShowVenueHeader.classList.add("bandShows__headerContent-venue");
  bandShowVenueHeader.innerText = "VENUE";
  bandShowsHeaderContent.appendChild(bandShowVenueHeader);

  //Show Data Table Header - LOCATION
  const bandShowLocationHeader = document.createElement("h3");
  bandShowLocationHeader.classList.add("bandShows__headerContent-location");
  bandShowLocationHeader.innerText = "LOCATION";
  bandShowsHeaderContent.appendChild(bandShowLocationHeader);

  //Show Data Table Hidden Element in Header, used for formatting Header Titles
  const hiddenEl = document.createElement("span");
  hiddenEl.classList.add("bandShows__hidden");
  hiddenEl.innerText = ".";
  bandShowsHeaderContent.appendChild(hiddenEl);
}

/**
 * Displays each Show Data on page
 * @param {Array} data
 */
function displayShowData(data) {
  //Gets the Parent element needed for the Shows Data
  let bandShowsHeaderWrapper = document.querySelector(
    ".bandShows__headerWrapper"
  );

  //For loop to get the Key of each Show Data, used to find each specific information for each Show Data
  for (let key in data) {
    //Gets the Parent element for the individual Shows Data
    const bandShowsParent = document.createElement("div");
    bandShowsParent.classList.add("bandShows__showData");
    bandShowsHeaderWrapper.appendChild(bandShowsParent);

    //Individual Shows Data Content
    const bandShowsContent = document.createElement("div");
    bandShowsContent.classList.add("bandShows__showContent");
    bandShowsParent.appendChild(bandShowsContent);

    //Individual Shows Data Title - DATE
    const dateTitle = document.createElement("h4");
    dateTitle.classList.add("bandShows__dateTitle");
    dateTitle.innerText = "DATE";
    bandShowsContent.appendChild(dateTitle);

    //Individual Shows Data - Date information
    const date = document.createElement("h3");
    date.classList.add("bandShows__date");
    let unixTimeStamp = data[key]["date"];
    let showsDate = new Date(unixTimeStamp);
    let dateString = showsDate.toDateString();
    date.innerText = dateString;
    bandShowsContent.appendChild(date);

    //Individual Shows Data Title - VENUE
    const venueTitle = document.createElement("h4");
    venueTitle.classList.add("bandShows__venueTitle");
    venueTitle.innerText = "VENUE";
    bandShowsContent.appendChild(venueTitle);

    //Individual Shows Data - Venue Information
    const venue = document.createElement("h3");
    venue.classList.add("bandShows__venue");
    venue.innerText = data[key]["place"];
    bandShowsContent.appendChild(venue);

    //Individual Shows Data Title - LOCATION
    const locationTitle = document.createElement("h4");
    locationTitle.classList.add("bandShows__locationTitle");
    locationTitle.innerText = "LOCATION";
    bandShowsContent.appendChild(locationTitle);

    //Indivudal Shows Data - Location Information
    const location = document.createElement("h3");
    location.classList.add("bandShows__location");
    location.innerText = data[key]["location"];
    bandShowsContent.appendChild(location);

    //Buy Tickets Button Wrapper
    const buyTicketsButtonWrapper = document.createElement("div");
    buyTicketsButtonWrapper.classList.add("bandShows__buttonWrapper");
    bandShowsContent.appendChild(buyTicketsButtonWrapper);

    //Buy Tickets Button
    const buyTicketsButton = document.createElement("button");
    buyTicketsButton.classList.add("bandShows__button");
    buyTicketsButton.innerText = "BUY TICKETS";
    buyTicketsButtonWrapper.appendChild(buyTicketsButton);
  }

  //Constant Variable to find all the rows of the Shows Data Table
  const showDataRow = document.querySelectorAll(".bandShows__showData");

  /**
   * Applying Selected Row Styles to the individual Shows Data row, that is clicked on (selected)
   * @param {Div Element} show
   */
  showDataRow.forEach((show) => {
    show.addEventListener("click", (event) => {
      showDataRow.forEach((show) => {
        show.classList.remove("bandShows__selectedRow");
        event.target.classList.add("bandShows__selectedRow");
      });
    });
  });
}
