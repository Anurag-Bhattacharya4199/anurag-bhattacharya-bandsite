/*
    Name: Anurag Bhattacharya
    Project Name: BandSite Project - Sprint 2
    Document Description: This is the Index Page JavaScript File
    
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

//Comments List Array
const commentsList = [
  {
    name: "Conner Walton",
    comment:
      "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
    date: "02/17/2021",
  },
  {
    name: "Emilie Beach",
    comment:
      "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
    date: "01/19/2021",
  },
  {
    name: "Miles Acosta",
    comment:
      "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
    date: "12/20/2020",
  },
];

//This function creates each comment article
function createCommentCard(commentsList) {
  //Image Wrapper
  const imageWrapperEl = document.createElement("div");
  imageWrapperEl.classList.add("commentsPanel__avatarWrapper");
  //Image
  const image = document.createElement("img");
  image.classList.add("commentsPanel__avatar");
  //Comment Article
  const cardEl = document.createElement("article");
  cardEl.classList.add("commentsPanel__comment");
  //Comment Content
  const commentsContentEl = document.createElement("div");
  commentsContentEl.classList.add("commentsPanel__commentContent");
  //Comment Header Content
  const headingContent = document.createElement("div");
  headingContent.classList.add("commentsPanel__headingContent");
  //Comment Header - Name
  const heading = document.createElement("h3");
  heading.classList.add("commentsPanel__title");
  heading.innerText = commentsList.name;
  //Comment - Date
  const date = document.createElement("p");
  date.classList.add("commentsPanel__date");
  date.innerText = commentsList.date;
  //Comment - Comment
  const commentEl = document.createElement("span");
  commentEl.classList.add("commentsPanel__personComment");
  commentEl.innerText = commentsList.comment;
  //Appending all elements to parent elements as needed
  cardEl.appendChild(imageWrapperEl);
  imageWrapperEl.appendChild(image);
  cardEl.appendChild(commentsContentEl);
  commentsContentEl.appendChild(headingContent);
  headingContent.appendChild(heading);
  headingContent.appendChild(date);
  commentsContentEl.appendChild(commentEl);
  //Returning the comment card for each comment
  return cardEl;
}
//This function renders the Comments Panel Content
function renderComments() {
  //Comments Panel Content
  const commentsEl = document.querySelector(".commentsPanel__content");
  commentsEl.innerHTML = "";

  //For Loop through Comments Array to get Comments Data
  for (let i = 0; i < commentsList.length; i++) {
    //Create a Comment Card for a Comment Data
    const card = createCommentCard(commentsList[i]);
    //Append the Comment to the Array
    commentsEl.appendChild(card);
  }
  //Get the Name and Comment Inputs
  let nameInput = document.getElementById("name");
  let commentInput = document.getElementById("comment");
  //Empty them after rendering the comments panel data
  nameInput = "";
  commentInput = "";
}

//This function listens to the Submit Button on the Comments Form event
function handleFormSubmit(event) {
  //Prevents Form Submission Default Behaviour
  event.preventDefault();
  //Gets the Name and Comment Input values
  let name = event.target.name.value;
  let comment = event.target.comment.value;
  //Creating the Date in correct format
  let dateObject = new Date();
  //Month
  let month = dateObject.getMonth() + 1;
  //Day
  let day = dateObject.getDate();
  //Year
  let year = dateObject.getFullYear();
  //If statements to make sure to add a 0 in front of day/month value, if needed
  if (day < 10) day = "0" + day;
  if (month < 10) month = "0" + month;
  //Correct Date Format
  let date = `${month}/${day}/${year}`;
  //Form Validation Steps
  //If Both Name and Comment Input empty, surround with red border
  if (name === "" && comment === "") {
    let nameInput = document.getElementById("name");
    let commentInput = document.getElementById("comment");
    nameInput.style.border = "1px solid #D22D2D";
    commentInput.style.border = "1px solid #D22D2D";
    return;
    //If Name Input empty, surround with red border
  } else if (name === "") {
    let nameInput = document.getElementById("name");
    nameInput.style.border = "1px solid #D22D2D";
    return;
    //If Comment Input empty, surround with red border
  } else if (comment === "") {
    let commentInput = document.getElementById("comment");
    commentInput.style.border = "1px solid #D22D2D";
    return;
  }
  //Create the new comment
  const newComment = {
    name,
    comment,
    date,
  };
  //Append the new comment to the end of the array
  commentsList.unshift(newComment);
  //Call the renderComments Function
  renderComments();
  //Reset the Comments Form upon submission
  commentsForm.reset();
}
//Get the Element for the Comment Form
const commentsForm = document.getElementById("commentsForm__form");
//Event Listen on submit button click on Comments Form
commentsForm.addEventListener("submit", handleFormSubmit);
//Call the renderComments Function
renderComments();
