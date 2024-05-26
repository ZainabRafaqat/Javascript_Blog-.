console.log(window.location.href)
const titleTemplate=document.getElementById("image-template")
console.log(titleTemplate)
const listNode=document.getElementById("image-list")
console.log(listNode)


let url = new URL( window.location.href);
let search_params = url.searchParams; 
let id=search_params.get('q')
console.log(search_params.get('q'));

function getAlbumById(){
    axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=${id}`).then((response)=>{
        response.data.map((val)=>{
            console.log(response.data)
        const titleNode=document.importNode(titleTemplate.content,true)
        const divId=titleNode.querySelector('li')
        divId.id=val.id
        console.log(divId.id)
        titleNode.querySelector('img').src=val.thumbnailUrl
        titleNode.querySelector('h').textContent=val.title
        listNode.appendChild(titleNode)
        console.log(titleNode)
        })
    })
}
getAlbumById();