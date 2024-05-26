const commentList = document.querySelector(".comment-items");
const postData = document.querySelector(".post-data");
const postCmntData = document.querySelector(".post-cmnt-data");
const templateEl = document.getElementById("comment-template");
const templatePostEl = document.getElementById("post-template");
const templateReplyEl = document.getElementById("reply-template");
const templatePostCmnt = document.getElementById("comment-post");
const commentTemplateSection = document.getElementById("comments-div");
const postsDiv = document.querySelector("section div");
console.log(postsDiv);
const post = document.importNode(templatePostEl.content, true);
const postCmnt = document.importNode(templatePostCmnt.content, true);
const postCmntForm = postCmnt.querySelector("form");
console.log(templatePostCmnt);
const commentBtn = post.getElementById("cmnt-btn");
console.log(window.location.href);
let url_str = window.location.href;

let url = new URL(url_str);
let search_params = url.searchParams;
let id = search_params.get("q");
console.log(search_params.get("q"));
async function getPostById() {
  await getData().then((data) => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${id} `)
      .then((response) => {
        post.querySelector("h1").textContent = data.name;
        post.querySelector("p").textContent = response.data.body;
        postData.appendChild(post);
      })
      .catch((error) => alert(error));
  });
}
console.log(commentBtn);
commentBtn.addEventListener("click", () => {
  postCmntForm.style.display = "block";

  console.log(postCmntForm);

  console.log(postCmnt.querySelector("button"));
  const postCmntBtn = postCmnt.querySelector("button");

  postCmntData.appendChild(postCmnt);
  postCmntBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const cmntInput = postCmnt.querySelector("input");
    console.log(cmntInput);
    postnewComment(cmntInput, postCmntForm);
  });
  console.log(postCmnt);
});
function postnewComment(inputData, form) {
  const body = {
    inputData,
  };
  axios
    .post(`https://jsonplaceholder.typicode.com/comments `, body)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  form.style.display = "none";
}
function getData() {
  return axios
    .get(`https://jsonplaceholder.typicode.com/users/${id} `)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

async function getCommentById() {
  await axios
    .get(` https://jsonplaceholder.typicode.com/comments?postId=${id} `)
    .then((response) => {
      response.data.map((comment) => {
        console.log(comment);
        const newCommentNode = document.importNode(templateEl.content, true);
        console.log(newCommentNode);
        const listItem = newCommentNode.querySelector("li");
        listItem.id = comment.id;
        //newCommentNode.querySelector("h3").textContent = comment.name;
        newCommentNode.querySelector("h2").textContent = comment.email;
        newCommentNode.querySelector("p").textContent = comment.body;
        const btn = newCommentNode.querySelector("li");
        btn.id = comment.id;
        console.log(newCommentNode.querySelectorAll("button"));
        commentList.appendChild(newCommentNode);
      });
      console.log(templateEl);

      console.log(response.data);
    })
    .catch((error) => alert(error));
}

commentList.addEventListener("click", (event) => {
  const replyBtn = event.target.closest("button");
  const replylist = event.target.closest("li");
  console.log(replyBtn);
  console.log(replylist);
  const replyNode = document.importNode(templateReplyEl.content, true);
  if (![...replylist.children].includes(replylist.querySelector("form"))) {
    replylist.appendChild(replyNode);
    console.log("node works");
  }

  /*else if (
    [...replylist.children].includes(replylist.querySelector("form"))
  ) {
    replylist.querySelector("form").remove();
    console.log("this works");
  }*/
});

getCommentById();
getPostById();
