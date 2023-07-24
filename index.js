import data from "./data.json" assert {type: "json"}
let wrapper = document.getElementById("content")
let currentUser = data.currentUser.username

function comments() {
    
    

for(let i = 0; i < data.comments.length; i++){

    let li = document.createElement('li')
    li.classList.add('container')
    li.innerHTML = `
    <div id="info">
    <img src="${data.comments[i].user.image.png}" >
    <p id="username">${data.comments[i].user.username}</p>
    <p id="createdAt">${data.comments[i].createdAt}</p>
    </div>

    <div id="comment"><P>${data.comments[i].content}</P></div>
    <div id="last">
    <div id="score"><img src="./images/icon-plus.svg"><p>${data.comments[i].score}</p><img src = "./images/icon-minus.svg"></div>
    <div class="reply"><img src="./images/icon-reply.svg"><p>Reply</p></div>
    </div>

    `
    wrapper.append(li)
    
    

    if(data.comments[i].replies.length > 0){

        const replyUl = document.createElement('ul')
        replyUl.classList.add('replyUl')
        

        for(let j = 0; j < data.comments[i].replies.length; j++){

            
           

            const replyLi = document.createElement('li')
            replyLi.classList.add("replyLi")

            replyLi.innerHTML = `

        
    ${data.comments[i].replies[j].user.username === currentUser?`<div id="replyInfoUser">
    <img src="${data.comments[i].replies[j].user.image.png}" >
    <p id="username">${data.comments[i].replies[j].user.username}</p><p id="you">you</p><p id="createdAt">${data.comments[i].replies[j].createdAt}</p>
    </div>`:`<div id="replyInfo">
    <img src="${data.comments[i].replies[j].user.image.png}" >
    <p id="username">${data.comments[i].replies[j].user.username}</p><p id="createdAt">${data.comments[i].replies[j].createdAt}</p>
    </div>`
                
    }
    

    <div id="comment"><P><span id="replying">@${data.comments[i].replies[j].replyingTo}</span> ${data.comments[i].replies[j].content}</P></div>
    <div id="last">
    <div id="score"><img src="./images/icon-plus.svg"><p>${data.comments[i].replies[j].score}</p><img src = "./images/icon-minus.svg"></div>
    
    ${data.comments[i].replies[j].user.username === currentUser?`<div id="buttons"><button id="deleteComment"><img src="./images/icon-delete.svg"> Delete</button><button><img src="./images/icon-edit.svg">Edit</button></div>`:`<div class="reply"><img src="./images/icon-reply.svg"><p>Reply</p></div>`
                
    }
    </div>

    
            

            `

           

            replyUl.append(replyLi)
            wrapper.append(replyUl)
            


            


        }


    
    }


}




}


function commentAndDelete() {
   

    let userCommentSection = document.createElement('div')
    userCommentSection.classList.add('writeComment')
    userCommentSection.innerHTML = `
    <textarea id="theTextArea" placeholder="Add a comment..."></textarea>
    <img src="${data.currentUser.image.png}">
    <button id="sendComment">SEND</button>
    `
    document.body.append(userCommentSection)
   
    const newCommentSection = document.createElement('ul');
newCommentSection.classList.add('newCommentSection');

const send = document.getElementById("sendComment");

send.addEventListener("click", () => {
    let textareaValue = document.getElementById('theTextArea').value;

    const newLi = document.createElement('li');
    newLi.classList.add('newLi');
    newLi.innerHTML = `
    <div id="userCommentInfo">
        <img src="${data.currentUser.image.png}">
        <p id="commenterUsername">${data.currentUser.username}</p>
        <p id="spotlight">you</p>
        <p id="user-created-at">seconds ago</p>
    </div>
    <div id="userCommentDiv"><p class="commented">${textareaValue}</p></div>
    <div id="plus-minus"><img src="./images/icon-plus.svg"> 0 <img src="./images/icon-minus.svg"></div>
    <button class="deleteButton"><img   src="./images/icon-delete.svg">Delete</button>
    <button class="editButton"><img src="./images/icon-edit.svg">Edit</button>
    `;

    wrapper.append(newCommentSection);
    newCommentSection.append(newLi);
    

    
    document.getElementById('theTextArea').value = "";
   

});


newCommentSection.addEventListener("click", (event) => {
    if (event.target.classList.contains("deleteButton")) {
        
        let popUp = document.createElement('div')
        popUp.classList.add('popUp')
        popUp.innerHTML = `
        <p>Delete comment</p>
        <p>Are you sure you want to delete this comment? This will remove the comment and can’t be undone.</p>
        <div>
        <button class="yes">Yes, DELETE</button>
        <button class="no">No, CANCEL</button>
        </div>
        `
        wrapper.style.filter = "blur(8px)"
        userCommentSection.style.filter = "blur(8px)"
        userCommentSection.style.pointerEvents = "none"
        newCommentSection.style.pointerEvents = "none"
        popUp.style.top = window.pageYOffset + 300 + "px"
        document.body.style.overflow = "hidden"
        document.body.append(popUp)
        popUp.addEventListener("click", (e) => {
            if(e.target.classList.contains("yes")){
                event.target.parentElement.remove()
                e.target.parentElement.parentElement.remove()
                wrapper.style.filter = "none"
                userCommentSection.style.filter = "none"
                document.body.style.overflow = "unset"
                userCommentSection.style.pointerEvents = "unset"
                newCommentSection.style.pointerEvents = "unset"
            } else if(e.target.classList.contains("no")) {
                e.target.parentElement.parentElement.remove()
                wrapper.style.filter = "none"
                document.body.style.overflow = "unset"
                userCommentSection.style.filter = "none"
                userCommentSection.style.pointerEvents = "unset"
                newCommentSection.style.pointerEvents = "unset"
            }
        })
    } 

    
});


newCommentSection.addEventListener("click", (eventTwo) => {
    if(eventTwo.target.classList.contains("editButton")){
        const oldText = eventTwo.target.parentElement.querySelector('.commented')
        const newText = document.createElement('textarea')
        newText.classList.add('newText')
        newText.textContent = oldText.textContent
        oldText.replaceWith(newText)
        const save = document.createElement('button')
        save.classList.add('save')
        save.classList.add('save')
        save.textContent = "UPDATE"
        eventTwo.target.parentElement.querySelector("#userCommentDiv").append(save)
        eventTwo.target.parentElement.querySelector("#userCommentDiv").classList.add('biggerDiv')
        save.addEventListener("click", () => {
            oldText.textContent = newText.value
            newText.replaceWith(oldText)
            save.remove()
            eventTwo.target.parentElement.querySelector("#userCommentDiv").classList.remove('biggerDiv')
        })
    }
})


    


}

    
wrapper.addEventListener('click', (e) => {
    if(e.target.parentElement.classList.contains('reply')) {
        const som = {
            "id": 5,
            "content": "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
            "createdAt": "2 days ago",
            "score": 2,
            "replyingTo": "ramsesmiron",
            "user": {
              "image": { 
                "png": "./images/avatars/image-juliusomo.png",
                "webp": "./images/avatars/image-juliusomo.webp"
              },
              "username": "juliusomo"
            }
          }
        data.comments[0].replies.push(som)
        console.log(data.comments[0].replies);
        return;
    }
    
})





comments()
commentAndDelete()











