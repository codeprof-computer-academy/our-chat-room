
// target all the required dom elements
const chatForm = document.querySelector('.chat-input-group');
const handle = document.querySelector('.handle');
const message = document.querySelector('.message')
const chatContainer = document.querySelector('.chat-container')

chatForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      onChatSent()
})

const socket = io.connect()

function onChatSent(){
    

         let data = {
            handle:handle.value,
            message:message.value,
            dateSent:new Date().toLocaleString()
        }

        socket.emit('chat', data)

           populateChat(true, data)
}

function populateChat(isMyChat, data){
      let element = `
        
            <div class= ${isMyChat ? 'right' : 'left'}>
                    <h5>${data.handle}</h5>
                    <p>
                       ${data.message}
                    </p>
                    
                <small>${data.dateSent}</small>
        </div>
      `

      chatContainer.innerHTML  += element
}

socket.on('chat-message', (data)=>{
    
        populateChat(false, data)
})

