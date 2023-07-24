import data from "./data.json" assert {type: "json"}
let wrapper = document.getElementById("content")
let currentUser = data.currentUser.username
wrapper.classList.add('wrapper')



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

    



function renderComments(commentsArray) {
    wrapper.innerHTML = ''; 
  
    for(let i = 0; i < commentsArray.length; i++){

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
        <div id="score"><img src="./images/icon-plus.svg" class="plus"><p>${data.comments[i].score}</p><img src = "./images/icon-minus.svg" class="minus"></div>
        ${data.comments[i].user.username === "maxblagun"?`<div class="replyMax"><img src="./images/icon-reply.svg"><p>Reply</p></div>`:`<div class="reply"><img src="./images/icon-reply.svg"><p>Reply</p></div>`
                    
        }
        
        </div>
    
        `
        wrapper.append(li)
        
        
    
        if(commentsArray[i].replies.length > 0){
    
            const replyUl = document.createElement('ul')
            replyUl.classList.add('replyUl')
            
    
            for(let j = 0; j < commentsArray[i].replies.length; j++){
    
                
               
    
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
        
    
        <div id="comment"><P id="commented"><span id="replying">@${data.comments[i].replies[j].replyingTo}</span> ${data.comments[i].replies[j].content}</P></div>
        <div id="last">
        <div id="score"><img src="./images/icon-plus.svg"><p>${data.comments[i].replies[j].score}</p><img src = "./images/icon-minus.svg"></div>
        
        ${data.comments[i].replies[j].user.username === currentUser?`<div id="buttons"><button class="deleteComment"><img src="./images/icon-delete.svg"> Delete</button><button class="editButtonReply"><img src="./images/icon-edit.svg">Edit</button></div>`:`<div class="replyRamses"><img src="./images/icon-reply.svg"><p>Reply</p></div>`
                    
        }
        </div>
    
        
                
    
                `
    
               
    
                replyUl.append(replyLi)
                wrapper.append(replyUl)
                
                
    
                
    
    
            }
    
    
        
        }
    
    
    }
    
  }

  

  function comments() {
    
    renderComments(data.comments);

}



wrapper.addEventListener('click', (e) => {
    if(e.target.parentElement.classList.contains('reply')) {
        let replyComment = document.createElement('div')
        replyComment.classList.add('replyComment')
        replyComment.innerHTML = `
        <textarea id="replyTextArea" placeholder="@${e.target.parentElement.parentElement.parentElement.querySelector('#username').textContent}"></textarea>
        <img src="${data.currentUser.image.png}">
        <button id="replyCommentSection">REPLY</button>
        `
        let som = e.target.parentElement.parentElement.parentElement
        wrapper.insertBefore(replyComment, som.nextSibling)
        
        const replyCommentFor = document.getElementById("replyCommentSection")
        e.target.parentElement.style.pointerEvents = "none"
replyCommentFor.addEventListener('click', (event) => {

   const username = event.target.parentElement.previousSibling.querySelector('#username').textContent;
    const replyTextArea = document.getElementById('replyTextArea').value
    let replyArray = {
        "id": 4,
        "content":  replyTextArea ,
        "createdAt": "2 days ago",
        "score": 2,
        "replyingTo": username,
        "user": {
          "image": { 
            "png": "./images/avatars/image-juliusomo.png",
            "webp": "./images/avatars/image-juliusomo.webp"
          },
          "username": "juliusomo"
        }
      }
      
      data.comments[0].replies.push(replyArray)
      e.target.parentElement.style.pointerEvents = "unset"
      renderComments(data.comments);
})
    } else if(e.target.parentElement.classList.contains('replyMax')) {
        let replyComment = document.createElement('div')
        replyComment.classList.add('replyComment')
        replyComment.innerHTML = `
        <textarea id="replyTextArea" placeholder="@${e.target.parentElement.parentElement.parentElement.querySelector('#username').textContent}"></textarea>
        <img src="${data.currentUser.image.png}">
        <button id="replyCommentSection">REPLY</button>
        `
        let som = e.target.parentElement.parentElement.parentElement
        wrapper.insertBefore(replyComment, som.nextSibling)
        
        const replyCommentFor = document.getElementById("replyCommentSection")
        e.target.parentElement.style.pointerEvents = "none"
replyCommentFor.addEventListener('click', (event) => {
   const username = event.target.parentElement.previousSibling.querySelector('#username').textContent;
    const replyTextArea = document.getElementById('replyTextArea').value
    let replyArray = {
        "id": 4,
        "content":  replyTextArea ,
        "createdAt": "2 days ago",
        "score": 2,
        "replyingTo": username,
        "user": {
          "image": { 
            "png": "./images/avatars/image-juliusomo.png",
            "webp": "./images/avatars/image-juliusomo.webp"
          },
          "username": "juliusomo"
        }
      }
      e.target.parentElement.style.pointerEvents = "usnet"
      data.comments[1].replies.push(replyArray)
      renderComments(data.comments);
})
    }else if(e.target.parentElement.classList.contains('replyRamses')) {
        let replyComment = document.createElement('div')
        replyComment.classList.add('replyCommentrams')
        replyComment.innerHTML = `
        <textarea id="replyTextArea" placeholder="@${e.target.parentElement.parentElement.parentElement.querySelector('#username').textContent}"></textarea>
        <img src="${data.currentUser.image.png}">
        <button id="replyCommentSection">REPLY</button>
        `
        let som = e.target.parentElement.parentElement.parentElement
        let container = e.target.parentElement.parentElement.parentElement.parentElement
        container.insertBefore(replyComment, som.nextSibling)
        
        const replyCommentFor = document.getElementById("replyCommentSection")
        e.target.parentElement.style.pointerEvents = "none"
replyCommentFor.addEventListener('click', (event) => {
   const username = event.target.parentElement.previousSibling.querySelector('#username').textContent;
    const replyTextArea = document.getElementById('replyTextArea').value
    let replyArray = {
        "id": 4,
        "content":  replyTextArea ,
        "createdAt": "2 days ago",
        "score": 2,
        "replyingTo": username,
        "user": {
          "image": { 
            "png": "./images/avatars/image-juliusomo.png",
            "webp": "./images/avatars/image-juliusomo.webp"
          },
          "username": "juliusomo"
        }
      }
      e.target.parentElement.style.pointerEvents = "usnet"
      data.comments[1].replies.push(replyArray)
      renderComments(data.comments);
})
    } else if(e.target.classList.contains('deleteComment')) {
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
        
        document.querySelector('.writeComment').style.filter = "blur(8px)"
        document.querySelector('.writeComment').style.pointerEvents = "none"
        wrapper.style.filter = "blur(8px)"
        wrapper.style.pointerEvents = "none"
        document.body.style.overflow = "hidden"
        document.body.append(popUp)
        popUp.style.top = window.pageYOffset + 300 + "px"
        popUp.addEventListener("click", (a) => {
            if(a.target.classList.contains("yes")){
                e.target.parentElement.parentElement.parentElement.remove()
                a.target.parentElement.parentElement.remove()
                document.querySelector('.writeComment').style.filter = "unset"
        document.querySelector('.writeComment').style.pointerEvents = "unset"
        wrapper.style.filter = "unset"
        wrapper.style.pointerEvents = "unset"
        document.body.style.overflow = "unset"
            } else if(a.target.classList.contains("no")) {
                a.target.parentElement.parentElement.remove()
                document.querySelector('.writeComment').style.filter = "unset"
        document.querySelector('.writeComment').style.pointerEvents = "unset"
        wrapper.style.filter = "unset"
        wrapper.style.pointerEvents = "unset"
        document.body.style.overflow = "unset"
            }
        })
        
    } else if(e.target.classList.contains('editButtonReply')){
      const oldText = e.target.parentElement.parentElement.parentElement.querySelector('#commented')
      const newText = document.createElement('textarea')
        newText.classList.add('newText')
        newText.textContent = oldText.textContent
        oldText.replaceWith(newText)
        const save = document.createElement('button')
        save.classList.add('saveReply')
        save.textContent = "UPDATE"
        e.target.parentElement.parentElement.parentElement.querySelector('#comment').append(save)
        save.addEventListener('click', () => {
            oldText.textContent =  newText.value
            newText.replaceWith(oldText)
            save.remove()
        })
    }
})



wrapper.addEventListener('click', (a) => {
    if (a.target.classList.contains('plus')) {
        const pTag = a.target.parentElement.querySelector('#score p')
        const currentNumber = parseInt(pTag.textContent, 10);
        pTag.textContent = (currentNumber + 1).toString();
        document.querySelector('.plus').style.pointerEvents = "none"
        document.querySelector('.minus').style.pointerEvents = "unset"
        document.querySelector('.minus').style.cursor = "pointer"
    } else if (a.target.classList.contains('minus')) {
        const pTag = a.target.parentElement.querySelector('#score p')
        const currentNumber = parseInt(pTag.textContent, 10);
        pTag.textContent = (currentNumber - 1).toString();
        document.querySelector('.minus').style.pointerEvents = "none"
        document.querySelector('.plus').style.pointerEvents = "unset"
        document.querySelector('.plus').style.cursor = "pointer"
    }
})


comments()
commentAndDelete()











