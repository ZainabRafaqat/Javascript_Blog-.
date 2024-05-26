const postBtn = document.getElementById("fetch-btn");
const navBtn = document.getElementById("nav-btn");
const templateEl = document.getElementById("post-template");
const postList = document.querySelector(".post-items");
const dialog = [...document.querySelectorAll("dialog")][0];
const postBox = [...document.querySelectorAll("dialog")][1];
const postSection = document.getElementById("posts");
const sideBar = document.querySelector(".flex div");
const sideBarIcon = document.querySelector("svg");
const icon = document.getElementById("icon-id");
const titleInputEl = dialog.querySelector("div").querySelector("input");
const contentInputEl = dialog.children[0].children[4].querySelector("input");
const posttitleEl = postBox.querySelector("div").querySelector("input");
const postcontentEl = postBox.children[0].children[4].querySelector("input");
const postButton = document.getElementById("post-data").querySelector("button");
console.log(postButton);

console.log(postBox);
let posts = [];
let users = [];
//const postButton = document.querySelector("form button");
//console.log(postButton);
postButton.addEventListener("click", (event) => {
  event.preventDefault();
  const title = posttitleEl.value;
  const text = postcontentEl.value;
  const data = {
    title,
    text,
  };
  axios
    .post(`https://jsonplaceholder.typicode.com/posts/`)
    .then((response) => {
      console.log(response);
      console.log("response");
    })
    .catch((err) => alert(err));

  renderNewListItem(title, text);
  postBox.style.display = "none";
  console.log(posts);
});

const renderNewListItem = (title, body) => {
  console.log(title, body); //only recent added changes recieved
  const newlistItem = document.createElement("li");
  newlistItem.innerHTML = `
    <div class="box-border border-2 border-grey-200 bg-white p-10 rounded-lg m-4">
    <h2 class="text-indigo-800 text-2xl font-bold font-sans">${title}</h2>
        <p class="text-black text-sm font-medium">${body}</p>
        <div class="flex justify-end pt-10">
          <button
            class="flex-row rounded-md w-24 bg-gradient-to-tr from-blue-800 to-purple-700 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Delete
          </button>
          <button class="flex-row w-24">
            <a id="nav-btn" class="text-base font-semibold leading-7 text-black"
              >Details<span aria-hidden="true">→</span></a
            >
          </button>
        </div>
    
    </div>
    `;

  postList.prepend(newlistItem);
};

async function fetchPosts() {
  await axios
    .get("https://jsonplaceholder.typicode.com/posts")
    .then((response) => {
      posts.push(...response.data);
      posts.map((post) => {
        users.push(post.id);
        const newPostNode = document.importNode(templateEl.content, true);
        const icons = newPostNode.getElementById("icons");
        const iconEdit = icons.firstElementChild;
        const iconDelete = icons.lastElementChild;
        console.log(iconEdit);
        newPostNode.querySelector("h2").textContent = post.title;
        newPostNode.querySelector("p").textContent = post.body;
        const listItem = newPostNode.querySelector("li");
        const previewButtonItem =
          listItem.lastElementChild.querySelector("button");
        newPostNode.querySelector("li").querySelector("a").href = `#${post.id}`;
        listItem.id = post.id;
        previewButtonItem.id = post.id;
        postList.appendChild(newPostNode);
        iconEdit.addEventListener("click", (event) => {
          postBox.id = post.id;
          onEdit(event);
        });
        iconDelete.addEventListener("click", () => {
          onDelete(post.id);
        });
        previewButtonItem.addEventListener("click", (event) => {
          onPreview(event);
        });
        // deleteButtonItem.addEventListener("click", (event) => {
        // onDelete(event.target.id);
        //});
      });
    })
    .catch((error) => alert(error));
}
fetchPosts();
postBtn.addEventListener("click", () => {
  postBox.style.display = "block";
  //postSection.style.display = "none";
  postSection.className = "backdrop-opacity-100 ";
});
function onEdit(event) {
  const editBtnEl = dialog.lastElementChild.querySelector("button");
  const titleInput = event.target.closest("li").querySelector("h2");
  const contentInput = event.target.closest("li").querySelector("p");
  titleInputEl.defaultValue = titleInput.textContent;
  contentInputEl.defaultValue = contentInput.textContent;
  console.log(postBox);
  dialog.style.display = "block";
  postSection.className = "blur-[2px] ";
  editBtnEl.textContent = "Edit";
  editBtnEl.addEventListener("click", () => {
    const body = {
      title: titleInputEl.value,
      text: contentInputEl.value,
    };
    axios
      .put(`https://jsonplaceholder.typicode.com/posts/${postBox.id}`, body)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => alert(err));
    // dialog.style.display = "none";
    // postSection.className = "blur-none ";
  });
}
function onPreview(event) {
  const postId = event.target.closest("li").id;
  if (event.target.closest("a")) {
    event.target.closest("a").href = "commentsPage.html" + "?q=" + postId;
  }
}
function onDelete(id) {
  console.log(id);
  axios
    .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => console.log(err));
}
/*postList.addEventListener("click", (event) => {
  const postId = event.target.closest("li").id;
  const button = event.target.closest("li").querySelector("button");
  const titleInputEl = dialog.querySelector("div").querySelector("input");
  const contentInputEl = dialog.children[0].children[4].querySelector("input");
  const titleInput = event.target.closest("li").querySelector("h2");
  const contentInput = event.target.closest("li").querySelector("p");

  button.addEventListener("click", () => {
    titleInputEl.defaultValue = titleInput.textContent;
    contentInputEl.defaultValue = contentInput.textContent;
    dialog.style.display = "block";
    postSection.className = "backdrop-blur-3xl bg-white/30";
  });
  console.log(postId);
  console.log(event.target.closest("a"));
  axios
    .delete(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => alert(err));
  if (event.target.closest("a")) {
    event.target.closest("a").href = "commentsPage.html" + "?q=" + postId;
  }
});*/

icon.addEventListener("click", () => {
  sideBar.style.display = "block";
  console.log(document.querySelector(".flex :nth-child(1)"));
  //document.querySelector(".flex :nth-child(1)").remove("fixed");
});
sideBarIcon.addEventListener("click", () => {
  sideBar.style.display = "none";
  console.log("&");
});
