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

let baseURL = "https://project-1-api.herokuapp.com";
let api_key = "?api_key=38d065a7-e5a0-442f-bd28-22ddfbc7f490";
let commentsEndpoint = "/comments";
let fullURL = `${baseURL}${commentsEndpoint}${api_key}`;
const sortComment = () => {
  axios
    .get(`${fullURL}`)
    .then((response) => {
      let sortedData = response.data.sort((a, b) => {
        return b.timestamp - a.timestamp;
      });
      renderComments(sortedData);
    })
    .catch((error) => {
      console.error("Fetch Error:", error);
    });
};

//This function creates each comment article
function createCommentCard(data) {
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
  heading.innerText = data.name;
  let unixTimeStamp = data.timestamp;
  let date = new Date(unixTimeStamp);
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let year = date.getFullYear();
  if (day < 10) day = "0" + day;
  if (month < 10) month = "0" + month;
  let dateString = `${month}/${day}/${year}`;
  //Comment - Date
  const dateEl = document.createElement("p");
  dateEl.classList.add("commentsPanel__date");
  dateEl.innerText = dateString;
  //Comment - Comment
  const commentEl = document.createElement("span");
  commentEl.classList.add("commentsPanel__personComment");
  commentEl.innerText = data.comment;

  const crudIcons = document.createElement("section");
  crudIcons.classList.add("commentsPanel__crudIcons");
  const likeButtonWrapper = document.createElement("div");
  likeButtonWrapper.classList.add("commentsPanel__likeButtonWrapper");
  const likeButton = document.createElement("img");
  likeButton.classList.add("commentsPanel__likeButton");
  likeButton.id = data.id;
  likeButton.src = "../assets/icons/icon-like.svg";
  crudIcons.appendChild(likeButtonWrapper);
  likeButtonWrapper.appendChild(likeButton);
  const commentLikes = document.createElement("span");
  commentLikes.classList.add("commentsPanel__commentLikes");
  commentLikes.innerText = data.likes;
  likeButtonWrapper.appendChild(commentLikes);

  likeButton.addEventListener("click", (event) => {
    let likeId = event.target.id;
    let fullURLPUT = `${baseURL}${commentsEndpoint}/${likeId}/like/${api_key}`;
    axios
      .put(`${fullURLPUT}`)
      .then((response) => {
        commentLikes.innerText = response.data.likes;
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const deleteButtonWrapper = document.createElement("div");
  deleteButtonWrapper.classList.add("commentsPanel__deleteButtonWrapper");
  crudIcons.appendChild(deleteButtonWrapper);
  const deleteButton = document.createElement("img");
  deleteButton.classList.add("commentsPanel__deleteButton");
  deleteButton.id = data.id;
  deleteButton.src = "../assets/icons/icon-delete.svg";
  deleteButtonWrapper.appendChild(deleteButton);

  deleteButton.addEventListener("click", (event) => {
    let deleteId = event.target.id;
    let fullURLDELETE = `${baseURL}${commentsEndpoint}/${deleteId}${api_key}`;
    axios
      .delete(`${fullURLDELETE}`)
      .then((response) => {
        sortComment();
      })
      .catch((error) => {
        console.log(error);
      });
  });
  //Appending all elements to parent elements as needed
  cardEl.appendChild(imageWrapperEl);
  imageWrapperEl.appendChild(image);
  cardEl.appendChild(commentsContentEl);
  commentsContentEl.appendChild(headingContent);
  headingContent.appendChild(heading);
  headingContent.appendChild(dateEl);
  commentsContentEl.appendChild(commentEl);
  commentsContentEl.appendChild(crudIcons);
  //Returning the comment card for each comment
  return cardEl;
}
//This function renders the Comments Panel Content
function renderComments(data) {
  //Comments Panel Content
  const commentsEl = document.querySelector(".commentsPanel__content");
  commentsEl.innerHTML = "";
  data.forEach((comment) => {
    const card = createCommentCard(comment);
    commentsEl.appendChild(card);
  });
  //Get the Name and Comment Inputs
  let nameInput = document.getElementById("name");
  let commentInput = document.getElementById("comment");
  //Empty them after rendering the comments panel data
  nameInput = "";
  commentInput = "";
}
sortComment();

//This function listens to the Submit Button on the Comments Form event
function handleFormSubmit(event) {
  event.preventDefault();
  let name = event.target.name.value;
  let comment = event.target.comment.value;
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
  const newCommentData = {
    name: name,
    comment: comment,
  };

  axios.post(`${fullURL}`, newCommentData).then((response) => {
    sortComment();
  });

  commentInput.style.border = "1px solid #E1E1E1";
  commentsForm.reset();
}

//Get the Element for the Comment Form
const commentsForm = document.getElementById("commentsForm__form");
//Event Listen on submit button click on Comments Form
commentsForm.addEventListener("submit", handleFormSubmit);
