const tableHeader = document.querySelector(".table-header ");
const userTemplateEl = document.getElementById("user-template");
/*async function getUsers(){

    await axios.get("https://jsonplaceholder.typicode.com/users").then((response)=>{
        console.log(response.data)
        response.data.map((data)=>{
        const userNode=document.importNode(userTemplateEl.content,true)
        const companyNode= userNode.getElementById('company')
        const addressNode= userNode.getElementById('address')
        userNode.getElementById('title').textContent=data.username
        userNode.querySelector('h2').textContent=data.name
        userNode.querySelector('p').textContent=data.email
       // userNode.querySelector('a').href=`${data.website}`
       const listEl=userNode.querySelector('li')
       listEl.id=data.id
        userList.appendChild(userNode)
        console.log(companyNode.querySelector('h3'))
        companyNode.querySelector('h3').textContent=data.company.name
        companyNode.querySelector('h2').textContent=data.company.catchPhrase
        companyNode.querySelector('p').textContent=data.company.bs
       // userNode.querySelector('p').appendChild(companyNode)
        addressNode.querySelector('p').textContent=data.address.street+"  street - "+data.address.city

        })
        

   
    
})

}

userList.addEventListener('click',(event)=>{
    const id=event.target.closest('li').id
    event.target.closest('a').href="userById.html"+"?q="+id
    
})
getUsers();*/

async function getUsers() {
  await fetchData().then((response) => {
    console.log(response);
    response.map((data) => {
      const userNode = document.importNode(userTemplateEl.content, true);
      console.log(userNode);
      const tableRows = userNode.querySelector("tr");
      console.log(tableRows);
      const rowData = [...tableRows.children];
      console.log(rowData);
      tableRows.id = data.id;
      const dataRow = [
        data.id,
        data.name,
        data.username,
        data.email,
        data.phone,
        data.website,
        data.company.name,
        data.address.street + "-" + data.address.city,
      ];
      for (let i = 0; i < [...tableRows.children].length - 1; i++) {
        rowData[i].textContent = dataRow[i];
      }
      console.log(tableRows);
      tableHeader.appendChild(tableRows);
    });
  });
}
async function fetchData() {
  return axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

tableHeader.addEventListener("click", (event) => {
  const id = event.target.closest("tr").id;
  onDelete(id);
  console.log(id);
  event.target.closest("a").href = "userById.html" + "?q=" + id;
});
function onDelete(id) {
  fetchData().then((data) => {
    console.log(data);
    const newData = data.filter((val) => {
      val.id != id;
    });
  });
  axios
    .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
}
getUsers();
