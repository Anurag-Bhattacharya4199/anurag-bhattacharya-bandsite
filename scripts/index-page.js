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

function createCommentCard(commentsList) {
  const imageWrapperEl = document.createElement("div");
  imageWrapperEl.classList.add("commentsPanel__avaterWrapper");

  const image = document.createElement("img");
  image.classList.add("commentsPanel__avater");

  const cardEl = document.createElement("article");
  cardEl.classList.add("commentsPanel__comment");

  const commentsContentEl = document.createElement("div");
  commentsContentEl.classList.add("commentsPanel__commentContent");

  const headingContent = document.createElement("div");
  headingContent.classList.add("commentsPanel__headingContent");

  const heading = document.createElement("h3");
  heading.classList.add("commentsPanel__title");
  heading.innerText = commentsList.name;

  const date = document.createElement("p");
  date.classList.add("commentsPanel__date");
  date.innerText = commentsList.date;

  const commentEl = document.createElement("span");
  commentEl.classList.add("commentsPanel__personComment");
  commentEl.innerText = commentsList.comment;

  cardEl.appendChild(imageWrapperEl);
  imageWrapperEl.appendChild(image);
  cardEl.appendChild(commentsContentEl);
  commentsContentEl.appendChild(headingContent);
  headingContent.appendChild(heading);
  headingContent.appendChild(date);
  commentsContentEl.appendChild(commentEl);

  return cardEl;
}

function renderComments() {
  const commentsEl = document.querySelector(".commentsPanel__content");

  commentsEl.innerHTML = "";

  for (let i = 0; i < commentsList.length; i++) {
    const card = createCommentCard(commentsList[i]);
    commentsEl.appendChild(card);
  }
  let nameInput = document.getElementById("name");
  let commentInput = document.getElementById("comment");
  nameInput = "";
  commentInput = "";
}

function handleFormSubmit(event) {
  event.preventDefault();
  let name = event.target.name.value;
  let comment = event.target.comment.value;
  let dateObject = new Date();
  let month = dateObject.getMonth() + 1;
  let day = dateObject.getDate();
  let year = dateObject.getFullYear();
  if (day < 10) day = "0" + day;
  if (month < 10) month = "0" + month;
  let date = `${month}/${day}/${year}`;
  if (name === "" && comment === "") {
    let nameInput = document.getElementById("name");
    let commentInput = document.getElementById("comment");
    nameInput.style.border = "1px solid #D22D2D";
    commentInput.style.border = "1px solid #D22D2D";
    return;
  } else if (name === "") {
    let nameInput = document.getElementById("name");
    nameInput.style.border = "1px solid #D22D2D";
    return;
  } else if (comment === "") {
    let commentInput = document.getElementById("comment");
    commentInput.style.border = "1px solid #D22D2D";
    return;
  }
  const newComment = {
    name,
    comment,
    date,
  };
  commentsList.unshift(newComment);
  renderComments();
  commentsForm.reset();
}

const commentsForm = document.getElementById("commentsForm__form");
commentsForm.addEventListener("submit", handleFormSubmit);

renderComments();
