//variables
let addToy = false;
let toyArray = []

//node getters
const toyCollectionDiv = document.getElementById('toy-collection')

//event listeners
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

document.addEventListener('DOMContentLoaded',
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(data => toyArray = data)
  .then(toyArray => createToyCards(toyArray))
)

//event handlers
const createToyCards = (toyArray) => {
  for(let toy of toyArray) {
    createToyCard(toy)
  }
}

//event-helpers
const createToyCard = (toy) => {
  const toyCard = document.createElement('div')
  toyCard.className = 'card'

  const toyH2 = document.createElement('h2')
  toyH2.innerText = toy.name

  const toyImg = document.createElement('img')
  toyImg.src = toy.image
  toyImg.className = 'toy-avatar'

  const likeP = document.createElement('p')
  likeP.innerText = `${toy.likes} likes`

  const likeBtn = document.createElement('btn')
  likeBtn.className = 'like-btn'
  likeBtn.id = toy.id
  likeBtn.innerText = 'Like ❤️'

  toyCard.appendChild(toyH2)
  toyCard.appendChild(toyImg)
  toyCard.appendChild(likeP)
  toyCard.appendChild(likeBtn)
  toyCollectionDiv.appendChild(toyCard)
}






// function fetchToys() {
//   fetch("http://localhost:3000/toys")
//   .then(resp => resp.json())
//   .then(data => {
//     let toyData = data
//     let toyCollection = document.getElementById('toy-collection')
//     for(let toy of toyData) {
//       let newDiv = document.createElement('div')
//       let newImg = document.createElement('img')
//       let newH2 = document.createElement(`h2`)
//       let newP = document.createElement('p')
//       let newBtn = document.createElement('button')
//       newDiv.classList.add('card')
//       newImg.src = toy.image
//       newImg.classList.add('toy-avatar')
//       newH2.innerText = toy.name
//       newP.innerText = `${toy.likes} likes`
//       newBtn.innerText = 'like'
//       newBtn.setAttribute('class','like-btn')
//       newBtn.setAttribute('id',toy.id)
//       toyCollection.appendChild(newDiv)
//       newDiv.appendChild(newH2)
//       newDiv.appendChild(newImg)
//       newDiv.appendChild(newP)
//       newDiv.appendChild(newBtn)
//     }
//   })

// }


const form = document.querySelector('.add-toy-form')

form.addEventListener('submit', (event) => {
  event.preventDefault()
 
  const prePayload = new FormData(form)
  const payload = new URLSearchParams(prePayload)

  console.log([...payload])

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: payload,
  })
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.log(err))
})

// ### Add a New Toy

// When a user submits the toy form, two things should happen:

// - A `POST` request should be sent to `http://localhost:3000/toys` and the new
//   toy added to Andy's Toy Collection.
// - If the post is successful, the toy should be added to the DOM without
//   reloading the page.{


// In order to send a POST request via `fetch()`, give the `fetch()` a second
// argument of an object. This object should specify the method as `POST` and also
// provide the appropriate headers and the JSON data for the request. The headers
// and body should look something like this:

// ```js
// headers:
// {
//   "Content-Type": "application/json",
//   Accept: "application/json"
// }

// body: JSON.stringify({
//   "name": "Jessie",
//   "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
//   "likes": 0
// })
// ```

// For examples, refer to the [documentation][fetch docs].


// ### Increase a Toy's Likes

// When a user clicks on a toy's like button, two things should happen:

// - A `patch` request (i.e., `method: "PATCH"`) should be sent to the server at
//   `http://localhost:3000/toys/:id`, updating the number of likes that the
//   specific toy has
// - If the patch is successful, the toy's like count should be updated in the DOM
//   without reloading the page

// The `patch` request enables us to **update** an existing toy. The request will
// look very similar to our "POST" request **except** that we need to include the
// `id` of the toy we're updating in the path.

// To get this working, you will need to add an event listener to each toy's "Like"
// button. When the button is clicked for a toy, your code should:

//get node
const likeBtn = () => document.getElementsByClassName('like-btn')

//add event listener
const likeBtnEvent = () => {
  for (let i = 0; i<likeBtn.length; i++)
    likeBtn().addEventListener('click', calculateLikes)
}
// 1. capture that toy's id,
// 2. calculate the new number of likes,
// 3. submit the `patch` request, and
// 4. update the toy's card in the DOM based on the `Response` returned by the
//    fetch request.

// event handlers
const calculateLikes = (e) => {
  console.log('hello')

    }

// The headers and body should look something like this:

// ```js
// headers:
// {
//   "Content-Type": "application/json",
//   Accept: "application/json"
// }

// body: JSON.stringify({
//   "likes": newNumberOfLikes
// })
// ```

// The `patch` method updates the property or properties included in the body of a
// `fetch` request but leaves the remaining properties as they are. For our
// example, the `likes` property will be updated by our `patch` request but the
// `id`, `name`, and `image` properties will remain unchanged.

// If your request isn't working, make sure your headers and keys match the
// [documentation][fetch docs].

// > **HINT**: You will be creating two event listeners for this lab. The first one
// > will be on the "Create Toy" button, which is provided in the app's
// > `index.html` file. The second one, however, will be on the "Likes" button on
// > each individual toy card. Given that the toy cards will be rendered to the DOM
// > dynamically from the `Response` returned by the `fetch` "GET" request, think
// > about **when** it makes sense to add the event listener to each toy's "Like"
// > button.