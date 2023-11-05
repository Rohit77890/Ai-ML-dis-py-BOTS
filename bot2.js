const accountSid = 'YOUR_ACCOUNT_SID';
const authToken = 'YOUR_AUTH_TOKEN';
const client = require('twilio')(accountSid, authToken);

// replace with your Twilio phone number
const from = 'whatsapp:+14155238886';

client.messages
      .create({
         body: 'Hello World!',
         from: from,
         to: 'whatsapp:+1234567890'
       })
      .then(message => console.log(message.sid))
      .done();
