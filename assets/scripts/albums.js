const titleTemplate=document.getElementById("title-template")
console.log(titleTemplate)
const listNode=document.getElementById("title-list")
console.log(listNode)


function getAlbums(){
    axios.get('https://jsonplaceholder.typicode.com/albums').then((response)=>
    {
        console.log(response.data),
        response.data?.map((val)=>{
        const titleNode=document.importNode(titleTemplate.content,true)
        const divId=titleNode.querySelector('li')
        divId.id=val.id
        console.log(divId.id)
        titleNode.querySelector('h').textContent=val.title
        listNode.appendChild(titleNode)
        console.log(titleNode)
    })

    }).catch((err)=>alert(err))
}
listNode.addEventListener("click",(event)=>{
    const btnId=event.target.closest('li').id
    event.target.closest('a').href = 'albumById.html' + "?q=" + btnId;
    

})
getAlbums();

