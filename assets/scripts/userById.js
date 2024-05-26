const headerTemplate = document.getElementById("header-section");
const personalInfoTemplate = document.getElementById("personal-info");
const headerDiv = document.getElementById("header");
const navDiv = document.getElementById("nav-bar");
const personalInfoDiv = document.getElementById("info-section");
const postsInfoDiv = document.getElementById("posts-section");
const albumsInfoDiv = document.getElementById("albums-section");
const taskUpdateTemplate = document.getElementById("task-update");
const taskUpdateDiv = document.getElementById("tasksUpdate-section");
const taskcompletedTemplate = document.getElementById("completed-tasks");
const taskcompletedDiv = document.getElementById("completed");
const taskUnfinishedTemplate = document.getElementById("unfinished-tasks");
const taskUnfinishedDiv = document.getElementById("unfinished");
const postInfoTemplate = document.getElementById("posts-info");
const infoDiv = document.getElementById("info-div");
const postsDiv = document.getElementById("posts-div");
const albumsDiv = document.getElementById("albums-div");
const sectionDiv = document.getElementById("top-sec").children[3];
const editDialog = [...document.querySelectorAll("dialog")][0];

console.log(sectionDiv);
let url = new URL(window.location.href);
let search_params = url.searchParams;
let id = search_params.get("q");
console.log(search_params.get("q"));

const albumbtn = navDiv.lastElementChild;
const aboutbtn = navDiv.firstElementChild;
const postbtn = navDiv.querySelectorAll("li")[1];

function getUserInfoById() {
  addHeaderNode();
  addSideNode();
}

function getInfoById() {
  return axios
    .get(`https://jsonplaceholder.typicode.com/users?id=${id}`)
    .then((response) => {
      console.log(response.data);

      return response.data;
    })
    .catch((err) => console.log(err));
}

async function addHeaderNode() {
  await getInfoById().then((val) => {
    console.log(val);
    const header = document.importNode(headerTemplate.content, true);

    console.log(header);
    const dltBtn = header.querySelector("button");
    const editBtn = header.lastElementChild.lastElementChild.lastElementChild;
    val.map((val) => {
      header.querySelector("img").src =
        "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/user-profile-icon.png";
      const headerName = header.querySelector(".header-name");
      headerName.querySelector("h1").textContent = val.name;
      headerName.querySelector("h3").textContent = val.username;
      const headerCompanyName = header.querySelector(".headerCompany-name");
      headerCompanyName.querySelector("h1").textContent = val.company.name;
      headerCompanyName.querySelector("h3").textContent =
        val.company.catchPhrase;
      dltBtn.addEventListener("click", () => {
        onDelete(val.id);
      });
      editBtn.addEventListener("click", (event) => {
        onEdit(val.id);
      });
    });
    headerDiv.appendChild(header);
  });
}
function onEdit(id) {
  const name = editDialog.querySelector("div").firstElementChild;
  const companyName = editDialog.querySelector("form")[1];
  const tagline = editDialog.querySelector("div").lastElementChild;
  console.log(name);
  const btn = editDialog.querySelector("button");
  console.log(id);
  editDialog.style.display = "block";

  btn.addEventListener("click", (event) => {
    const body = {
      name: name.value,
      tagline: tagline.value,
      companyName: companyName.value,
    };
    console.log(body);
    event.preventDefault();
    axios
      .put(`https://jsonplaceholder.typicode.com/users/${id}`, body)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
    editDialog.style.display = "none";
  });
}
function onDelete(id) {
  axios
    .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => alert(err));
}

async function addSideNode() {
  await getInfoById().then((val) => {
    const info = document.importNode(personalInfoTemplate.content, true);
    const liElements = info.querySelectorAll("li");
    let listEl = liElements[0].lastElementChild.lastElementChild;
    val.map((val) => {
      listEl.textContent = val.name;
      listEl = liElements[1].lastElementChild.lastElementChild;
      listEl.textContent = val.website;
      listEl = liElements[2].lastElementChild.lastElementChild;
      listEl.textContent = val.phone;
      listEl = liElements[3].lastElementChild.lastElementChild;
      listEl.textContent = val.email;
      listEl = liElements[4].lastElementChild.lastElementChild;
      listEl.textContent =
        val.address.suite + val.address.street + val.address.city;
      console.log(postsDiv.style.display);
      if (
        ![...personalInfoDiv.children].includes(
          personalInfoDiv.querySelector("div")
        )
      ) {
        personalInfoDiv.appendChild(info);
      }

      console.log(info);
    });
  });
}

function getAlbumById() {
  axios
    .get(`https://jsonplaceholder.typicode.com/albums?userId=${id}`)
    .then((response) => {
      const divNodeLength = response.data.length;
      response.data.map((val) => {
        const album = document.importNode(postInfoTemplate.content, true);
        album.querySelector("h1").textContent = val.title;
        if (
          ![...albumsInfoDiv.children].includes(
            albumsInfoDiv.querySelector("div")
          ) &&
          [...albumsInfoDiv.children].length < divNodeLength
        ) {
          albumsInfoDiv.appendChild(album);
        }
      });
    });
}
function getTodosById() {
  axios
    .get(`https://jsonplaceholder.typicode.com/todos?userId=${id}`)
    .then((response) => {
      console.log(response.data);
      const completedTasks = response.data.filter(
        (data) => data.completed === true
      );
      const unfinishedTasks = response.data.filter(
        (data) => data.completed !== true
      );
      console.log(unfinishedTasks);
      const completedPercentage = Math.round(
        (Object.keys(completedTasks).length /
          Object.keys(response.data).length) *
          100
      );
      const task = document.importNode(taskUpdateTemplate.content, true);
      const taskProgressBar =
        task.lastElementChild.lastElementChild.lastElementChild
          .lastElementChild;
      const taskProgress =
        task.lastElementChild.querySelector("li div").lastElementChild;

      console.log(taskProgress);
      taskProgress.textContent = completedPercentage + "%";
      taskProgressBar.style.width = completedPercentage + "%";
      taskUpdateDiv.appendChild(task);
      console.log(taskProgressBar.style.width);

      completedTasks.map((val) => {
        const completedTask = document.importNode(
          taskcompletedTemplate.content,
          true
        );
        completedTask.querySelector("h3").textContent = val.title;
        console.log(completedTask);
        taskcompletedDiv.appendChild(completedTask);
      });
      unfinishedTasks.map((val) => {
        const unfinishedTask = document.importNode(
          taskUnfinishedTemplate.content,
          true
        );
        console.log(unfinishedTask.querySelector("h3"));
        unfinishedTask.querySelector("h3").textContent = val.title;
        taskUnfinishedDiv.appendChild(unfinishedTask);
      });
    });
}
function getPostsById() {
  console.log(...postsInfoDiv.children);
  axios
    .get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
    .then((response) => {
      console.log(response.data);

      response.data.map((val) => {
        const divNodeLength = response.data.length;
        const post = document.importNode(postInfoTemplate.content, true);
        console.log(post);
        post.querySelector("h1").textContent = val.title;
        console.log(personalInfoDiv.style.display);
        console.log(personalInfoDiv.style.display);
        if (
          ![...postsInfoDiv.children].includes(
            postsInfoDiv.querySelector("div")
          ) &&
          [...postsInfoDiv.children].length < divNodeLength
        ) {
          postsInfoDiv.appendChild(post);
        }

        console.log([...postsInfoDiv.children].length);
      });
    });
}
getUserInfoById();
getTodosById();
postbtn.addEventListener("click", () => {
  updateUI(infoDiv, albumsDiv, postsDiv);
  getPostsById();
});
aboutbtn.addEventListener("click", () => {
  updateUI(postsDiv, albumsDiv, infoDiv);
  getAlbumById();
});
albumbtn.addEventListener("click", () => {
  updateUI(postsDiv, infoDiv, albumsDiv);
  getAlbumById();
});

function updateUI(prevNode, prevNodeSecond, currentNode) {
  prevNode.style.display = "none";
  prevNodeSecond.style.display = "none";
  if (currentNode.style.display == "none") {
    currentNode.style.display = "block";
  }
}
