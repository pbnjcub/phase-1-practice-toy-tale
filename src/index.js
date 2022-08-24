//variables
let addToy = false;
let toyArray = []
let newToyArray = []

//node getters
const toyCollectionDiv = document.getElementById('toy-collection')
const form = document.querySelector('.add-toy-form')
const likeToyBtn = () => document.querySelectorAll('.like-btn')
const foundToyId = []


//event-helpers
const createToyCards = (toyArray) => {
  for(let toy of toyArray) {
    createToyCard(toy)
  }
}

const createToyCard = (toy) => {
  const toyCard = document.createElement('div')
  toyCard.className = 'card'

  const toyH2 = document.createElement('h2')
  toyH2.innerText = toy.name

  const toyImg = document.createElement('img')
  toyImg.src = toy.image
  toyImg.className = 'toy-avatar'

  const likeP = document.createElement('p')
  likeP.id = toy.id
  likeP.innerText = `${toy.likes} likes`

  const likeBtn = document.createElement('button')
  likeBtn.classList.add('like-btn')
  likeBtn.id = toy.id
  likeBtn.innerText = 'Like ❤️'
  likeBtn.addEventListener('click', (e) => {
    if(e.target.matches('.like-btn')) {
      likeBtnEvent(e)
    }
  })

  toyCard.appendChild(toyH2)
  toyCard.appendChild(toyImg)
  toyCard.appendChild(likeP) 
  toyCard.appendChild(likeBtn)
  toyCollectionDiv.appendChild(toyCard)
}



//event handlers
const addNewToy = (e) => {
  e.preventDefault()
  const [name, image] = e.target
  
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },

    body: JSON.stringify({
      "name": newToyArray[0][1],
      "image": newToyArray[1][1],
      "likes": 0
    })
  })
  .then(response => response.json())
  .then(response => createToyCard(response))
  name.value = ""
  image.value = ""
}

const likeBtnEvent = (e) => {
  e.preventDefault()
  const numLikesId = e.target.parentElement.children[2].id
  let newToyLikes = e.target.parentElement.children[2].textContent
  fetch(`http://localhost:3000/toys/${numLikesId}`, {
    method: 'PATCH',
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      likes: parseInt(newToyLikes.split(" ")[0],10) + 1
    })
  })
  .then(response => response.json())
  .then(response => {
    // e.target.parentElement.children[2].innerText = `${response.likes} likes`
    const p = document.getElementById(response.id)
    p.textContent = `${response.likes} likes`
  })
}

//event listeners
document.addEventListener('DOMContentLoaded',
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(data => {
    toyArray = data
    createToyCards(toyArray)
  })
)


document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");

 

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

form.addEventListener('submit', (event) => {
  event.preventDefault()
 
  const prePayload = new FormData(form)
  const payload = new URLSearchParams(prePayload)

  newToyArray = [...payload]
})

document.addEventListener('submit', addNewToy)