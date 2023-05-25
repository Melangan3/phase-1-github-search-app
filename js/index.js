const form = document.getElementById("github-form")
form.addEventListeneer("submit", (event)=> {
    event.preventDefault()
    //console.log ("event",event)
    //data we want to pass from the form
    event.target[0].value
    fetch(`https://api.github.com/search/users?q=${event.target[0].value}`)
    .then(response=>response.json())
    .then(response=> {
        //login, avatar_url, url
        const userList = document.querySelector("#user-list")
        const reposList = document.getElementById("repos-list")
        reposList.innerHTML= ""
        userList.innerHTML= ""
        response.items.map(item=>{
            //could use a for each here
            const li = document.createElement("li")
            const h2 = document.createElement("h2")
            h2.textContent = item.login

            h2.addEvenetListener("click", e => showUserRepos(item.login))

            const img = document.createElement ("img")
            img.src = item.avatar_url

            li.append(h2, img,)
            userList.append(li)
        })
    })
    
    form.reset() 
})

function showUserRepos(username, e){
    const reposList = document.getElementById("repos-list")
    reposList.innerHTML = ""
    e.preventDefault()
    fetch(`https://api.github.com/users/${username}/repos`)
    .then(response=>response.json())
    .then(response=>response.map(repo=>{
        const li=document.createElement("li")
        const h1 = document.createElement("h1")
        h1.textConent=repo.name
        li.append(h1)
        reposList.append(li)
    })
)}