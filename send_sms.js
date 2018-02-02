// Twilio Credentials
const accountSid = 'AC665b2101ec27ade038175c6bbb0509df';
const authToken = '5e88cd85244f161d1b23b83eb9180bfc';

// require the Twilio module and create a REST client
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
    to: '+14153500217',
    from: '+14158432733',
    body: 'Your interview for Wonder Woman starts at 2pm!',
  })
  .then(message => console.log(message.sid));
