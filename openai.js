//nodemailer for debugging nodejs
const nodemailer = require('nodemailer')
// initializing my API component to avoid omission of any letter when needed
let API_KEY = ''
let API_URL = ''

//accessing the necessary element in the html
let sender = document.getElementById('name')
let senderemail = document.getElementById('email')
let userinput = document.getElementById('text')
let btn = document.querySelector('.show')
let sendmessage = document.querySelector('.send')
let topic = document.querySelector('.subject').value
let confirm = document.querySelector('.confirm')
senderinput = document.querySelector('.input')
let recipientemail = document.querySelector('.recipientemail').value


// Event listener for sending message
sendmessage.addEventListener('click', async function () {
  handlesender()
  await getchatresponse()
  await sendEmail(sender,senderemail,recipientemail, topic, usertext)
})
console.log(topic)
// async allow me to make use of the await function
async function getchatresponse () {
  // given in the api reference
  const requestoptions = {
    method: 'POST',
    headers: {
      Authorization: 'Bearer' + API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo-0613',
      prompt: userinput,
      max_tokens: 2048,
      temperature: 0.7,
      n: 1,
      stop: null
    })
  }

  // the try and catch is for handling error that happen during the openai response
  try {
    //await for pause until the fetch is able to retrieve data from the openai
    const response = await (await fetch(API_URL, requestoptions)).json()
  } catch (error) {
    console.error(error)
  }
}
// function for displaying the user input and clearing the input space after it has been sent
const handlesender = function () {
  if(sender.value == "" || senderemail.value =="" ||recipientemail ==""){
    alert("FILL THE NECESSARY FIELD")
  }
  else{
  usertext = senderinput.value.trim()
  userinput.textContent = ' ' + usertext
  senderinput.value = ' '
  }
}
//nodejs to acess and send the mail to the recipent email address the plain js cant send to the email cause of security reasons


//Function to send email
async function sendEmail (recipient, topic, usertext) {
  let transporter = nodemailer.createTransport({
    host: 'smtp',
    port: 587,
    secure: false,
    auth: {
      user: sender,
      pass: 'your-email-password'
    }
  })

  let mailOptions = {
    from: senderemail,
    to: recipientemail,
    subject: topic,
    text: usertext
  }

  try {
    let info = await transporter.sendMail(mailOptions)
    confirm.textContent = 'Message sent' + info.response
  } catch (error) {
    console.error('Error sending email:', error)
  }
}

