import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");

const decreaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};

const handleDeleteComment = (event) => {
  const delbtn = event.target;
  const removeDiv = delbtn.parentNode;
  commentList.removeChild(removeDiv);
  decreaseNumber();
};

const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

const addComment = (comment) => {
  const div = document.createElement("div");
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("span");
  div.className = "comment-list__wrapper";
  span.innerHTML = comment;
  delBtn.innerHTML = "❌";
  delBtn.addEventListener("click", handleDeleteComment);
  li.appendChild(span);
  div.appendChild(li);
  div.appendChild(delBtn);
  commentList.prepend(div);
  increaseNumber();
};

const sendComment = async (comment) => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: "POST",
    data: {
      comment,
    },
  });
  if (response.status === 200) {
    addComment(comment);
  }
};

const handleSubmit = (event) => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
};

function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
}

if (addCommentForm) {
  init();
}
