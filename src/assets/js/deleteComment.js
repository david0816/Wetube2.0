import axios from "axios";

const deleteCommentButton = document.querySelectorAll(".jsCommentDeleteButton");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");

const decreaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};

const handleDeleteComment = (commentId) => {
  const delbtn = document.getElementById(`${commentId}`);
  const removeDiv = delbtn.parentNode;
  commentList.removeChild(removeDiv);
  decreaseNumber();
};

const handleDelete = async (event) => {
  const commentId = event.target.id;
  console.log(commentId);
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/delete`,
    method: "DELETE",
    data: {
      commentId,
    },
  });
  if (response.status === 200) {
    handleDeleteComment(commentId);
  }
};

function init() {
  deleteCommentButton.forEach((x) => x.addEventListener("click", handleDelete));
}

if (deleteCommentButton) {
  init();
}
