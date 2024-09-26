const socket = io('http://localhost:8000')

const form = document.getElementById('message-form')
const messageinput = document.getElementById('messageinput')
const messagecontainer = document.querySelector('.message-container')
var audio = new Audio('chatApp notification tone.mp3')

const append = (message, position)=>{
      const messagelement = document.createElement('div')
      messagelement.innerText = message
      messagelement.classList.add('message')
      messagelement.classList.add(position)
      messagecontainer.append(messagelement)
      if(position == 'left'){
        audio.play()
      }
}



form.addEventListener('submit' , (e)=>{
    e.preventDefault()
    const message = messageinput.value
    if (message.trim()) { // Prevent sending empty messages
        append(`You: ${message}`, 'right')
        socket.emit('send', message)
        messageinput.value = ''
    } else {
        alert("Message cannot be empty!")
    }
})

let name = ''
while (!name) {
    name = prompt("Enter Your name to join")
    if (!name) {
        alert("Name cannot be empty! Please enter a valid name.")
    }
}

socket.emit('new-user-joined', name)

socket.on('user-joined' , name =>{
 append(`${name} joined the chat` , `center`)
})

socket.on('receive' , data =>{
    append(`${data.name}: ${data.message}` , 'left')
})

socket.on('left' , data =>{
    append(`${name} left` , 'left')
})

const username = document.getElementById('user-name').innerHTML=(name)
