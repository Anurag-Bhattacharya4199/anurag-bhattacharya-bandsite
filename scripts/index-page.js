/*
  Name: 
  Anurag Bhattacharya
  Project: 
  BandSite Project - Sprint 3
  Description: 
  This is the Index Page / Band Bio Page JavaScript Functionalities
  Diving Deeper Notes:
  - All Diving Deeper From Sprint 1 Completed
  - Form Validation Diving Deeper From Sprint 2 Completed
  - Dynamic Timestamp Diving Deeper From Sprint 2 Not Completed
  - All Diving Deeper From Sprint 3 Completed
*/

//API Information - URL, api-key, endpoint
let baseURL = "https://project-1-api.herokuapp.com";
let api_key = "?api_key=38d065a7-e5a0-442f-bd28-22ddfbc7f490";
let commentsEndpoint = "/comments";
let fullURL = `${baseURL}${commentsEndpoint}${api_key}`;

/**
 * Sorts the Comments Data in ascending order based on timestamp
 * @param {Array} response
 */
const sortComment = () => {
  axios
    .get(`${fullURL}`)
    .then((response) => {
      /**
       * Compares and Sorts individual Comments Data based on timestamp
       * @param {Object} a
       * @param {Object} b
       */
      let sortedData = response.data.sort((a, b) => {
        return b.timestamp - a.timestamp;
      });
      //Calls the Function to render the comments on the page
      renderComments(sortedData);
    })
    //Catches any errors, if errors found during GET Request to API
    .catch((error) => {
      console.error("Fetch Error:", error);
    });
};

/**
 * Displays each individual comments data information
 * @param {Array} data
 * @returns Individual Comments Card Element
 */
const displayComment = (data) => {
  //Individual Comment Avatar Image Wrapper
  const imageWrapperEl = document.createElement("div");
  imageWrapperEl.classList.add("commentsPanel__avatarWrapper");

  //Individual Comment Avatar Image
  const image = document.createElement("img");
  image.classList.add("commentsPanel__avatar");

  //Individual Comment Parent Article
  const cardEl = document.createElement("article");
  cardEl.classList.add("commentsPanel__comment");

  //Individual Comment Content Wrapper
  const commentsContentEl = document.createElement("div");
  commentsContentEl.classList.add("commentsPanel__commentContent");

  //Individual Comment Heading Content Wrapper
  const headingContent = document.createElement("div");
  headingContent.classList.add("commentsPanel__headingContent");

  //Individual Comment Header Title - Name
  const heading = document.createElement("h3");
  heading.classList.add("commentsPanel__title");
  heading.innerText = data.name;

  //Individual Comment Information - Date
  let unixTimeStamp = data.timestamp;
  let date = new Date(unixTimeStamp);
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let year = date.getFullYear();
  if (day < 10) day = "0" + day;
  if (month < 10) month = "0" + month;
  let dateString = `${month}/${day}/${year}`;
  const dateEl = document.createElement("p");
  dateEl.classList.add("commentsPanel__date");
  dateEl.innerText = dateString;

  //Individual Comment Information - Comment
  const commentEl = document.createElement("span");
  commentEl.classList.add("commentsPanel__personComment");
  commentEl.innerText = data.comment;

  //Likes, # of Likes and Delete Button Icons Wrapper
  const crudIcons = document.createElement("section");
  crudIcons.classList.add("commentsPanel__crudIcons");

  //Like Button Wrapper
  const likeButtonWrapper = document.createElement("div");
  likeButtonWrapper.classList.add("commentsPanel__likeButtonWrapper");

  //Like Button Image
  const likeButton = document.createElement("img");
  likeButton.classList.add("commentsPanel__likeButton");
  //Assigns ID of Like Button element to the ID of the individual comment
  likeButton.id = data.id;
  likeButton.src = "../assets/icons/icon-like.svg";

  //# of Likes Information
  const commentLikes = document.createElement("span");
  commentLikes.classList.add("commentsPanel__commentLikes");
  commentLikes.innerText = data.likes;

  //Appends the LikeButton and # of Likes Information to Parent Element
  crudIcons.appendChild(likeButtonWrapper);
  likeButtonWrapper.appendChild(likeButton);
  likeButtonWrapper.appendChild(commentLikes);

  /**
   * Click Event Lister Function to update the # of Likes for an individual Comment
   * @param {String} event
   */
  likeButton.addEventListener("click", (event) => {
    //Gets the ID of the individual comment
    let likeId = event.target.id;
    //PUT Request URL
    let fullURLPUT = `${baseURL}${commentsEndpoint}/${likeId}/like/${api_key}`;
    axios
      .put(`${fullURLPUT}`)
      /**
       * Updates the # of Likes Information by 1, as a User clicks the Like Button
       * @param {Array} response
       */
      .then((response) => {
        commentLikes.innerText = response.data.likes;
      })
      //To catch any errors in the PUT Request to API
      .catch((error) => {
        console.log(error);
      });
  });

  //Delete Button Wrapper
  const deleteButtonWrapper = document.createElement("div");
  deleteButtonWrapper.classList.add("commentsPanel__deleteButtonWrapper");

  //Delete Button Image
  const deleteButton = document.createElement("img");
  deleteButton.classList.add("commentsPanel__deleteButton");

  //Assigns ID of Delete Button to the ID of the individual comment
  deleteButton.id = data.id;
  deleteButton.src = "../assets/icons/icon-delete.svg";

  //Appends Delete Button Image to Delete Button Wrapper
  deleteButtonWrapper.appendChild(deleteButton);
  //Appends Delete Button Wrapper to Parent element
  crudIcons.appendChild(deleteButtonWrapper);

  /**
   * Click Event Listener to delete the individual comment that is clicked
   * @param {String} event
   */
  deleteButton.addEventListener("click", (event) => {
    //Gets the Individual Comment ID
    let deleteId = event.target.id;
    //Full DELETE Request to API
    let fullURLDELETE = `${baseURL}${commentsEndpoint}/${deleteId}${api_key}`;

    //Pop-up message to confirm User wants to delete selected individual comment
    let confirmDelete = confirm("Are you sure you want to delete?");

    //If true, User wants to delete selected individual comment, go ahead with the DELETE Request to API
    if (confirmDelete) {
      axios
        .delete(`${fullURLDELETE}`)
        /**
         * Deletes the individual comment and then sort latest Comments Array by calling the Sorting Function
         * @param {Array} response
         */
        .then((response) => {
          //Calls the sortComment Function to sort the latest Comments by timestamp
          sortComment();
        })
        //To catch any errors on the DELETE Request on API
        .catch((error) => {
          console.log(error);
        });
    }
  });

  //Appending Comments Image Wrapper to Parent element
  cardEl.appendChild(imageWrapperEl);

  //Appends Comments Image to Parent element
  imageWrapperEl.appendChild(image);

  //Appends Comments Content Element to Parent element
  cardEl.appendChild(commentsContentEl);

  //Appends Comments Header Content to Parent element
  commentsContentEl.appendChild(headingContent);

  //Appends Header Content to Parent element
  headingContent.appendChild(heading);
  headingContent.appendChild(dateEl);

  //Appends Full Comment Element to Parent Element
  commentsContentEl.appendChild(commentEl);

  //Appends CRUD Icons Wrapper to Parent Element
  commentsContentEl.appendChild(crudIcons);

  //Returns Individual Comments Card Element
  return cardEl;
};

/**
 * Renders the Full Comments Panel
 * @param {Array} data
 */
const renderComments = (data) => {
  //Comments Panel Content Wrapper
  const commentsEl = document.querySelector(".commentsPanel__content");
  //On Page Load, empty the Parent element HTML
  commentsEl.innerHTML = "";

  /**
   * A For Each Loop to get each individual Comments
   * @param {Array} comment
   */
  data.forEach((comment) => {
    //Gets the Individual Comment Card
    const card = displayComment(comment);
    //Appends the Individual Comments Card to Parent element
    commentsEl.appendChild(card);
  });

  //Names and Comment Input from Form
  let nameInput = document.getElementById("name");
  let commentInput = document.getElementById("comment");

  //Once, Comments are rendered on page, Empty the Name and Comments Input on the Comments Form
  nameInput = "";
  commentInput = "";
};

//Calling sortComment Function on page load, sorts and renders the Comments presented in API on page load
sortComment();

/**
 * Comments Form Submit Form Functionality, appends Created Comment to API with POST Request
 * @param {String} event
 */
function handleFormSubmit(event) {
  //Prevents event default behavior, in this case, on Form Submit Click event, Page will not refresh
  event.preventDefault();

  //Gets the Name and Comment values from User inputs on Name and Comment Input Fields
  let name = event.target.name.value;
  let comment = event.target.comment.value;

  //Gets the Name and Comment Input Fields of Comments Form
  let nameInput = document.getElementById("name");
  let commentInput = document.getElementById("comment");

  //Form Validation, making sure, there are no errors prior to functionalities on Form submission
  //If both Name and Comments Input is empty, both Input Elements will have an Error styles
  if (name === "" && comment === "") {
    nameInput.classList.remove("default-border");
    commentInput.classList.remove("default-border");
    nameInput.classList.add("error-border");
    commentInput.classList.add("error-border");
    return;

    //Else if Name Input is empty, Name Input Element will have Error styles
  } else if (name === "") {
    nameInput.classList.remove("default-border");
    nameInput.classList.add("error-border");
    return;

    //Else if Comments Input is empty, Comments Input Element will have Error styles
  } else if (comment === "") {
    commentInput.classList.remove("default-border");
    commentInput.classList.add("error-border");
    return;

    //Else No errors, Default Styles applied to Both Input Elements
  } else {
    nameInput.classList.remove("error-border");
    nameInput.classList.add("default-border");
    commentInput.classList.remove("error-border");
    commentInput.classList.add("default-border");
  }

  //Creates a new Comment Data Object
  const newCommentData = {
    name: name,
    comment: comment,
  };

  /**
   * This Function calls POST Request on API, and then adds to the API,
   * calls sortComment Function to sort Comments and render onto page with other helper functions
   * @param {Array} response
   */
  axios.post(`${fullURL}`, newCommentData).then((response) => {
    //Calls sortComment function, which sorts the Latest Comments array by timestamp
    sortComment();
  });

  //Removes Error Styles to Input Elements and on page load, Default Styling applied to Input Elements
  nameInput.classList.remove("error-border");
  commentInput.classList.remove("error-border");
  nameInput.classList.add("default-border");
  commentInput.classList.add("default-border");

  //Resets the Comment Form
  commentsForm.reset();
}

//Gets the Comment Form Element
const commentsForm = document.getElementById("commentsForm__form");

/*
Event Listener on Comments Form Element, calls handleFormSubmit, 
which handles the addition of a new Comments to the Comments Array in API
*/
commentsForm.addEventListener("submit", handleFormSubmit);
