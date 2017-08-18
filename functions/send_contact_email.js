const admin = require('firebase-admin');
const Mailer = require('./Mailer');
const emailTemplate = require('./emailTemplate');

module.exports = (req, res) => {
  //set JSON content type and CORS headers for the response
  res.header('Content-Type','application/json');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  //respond to CORS preflight requests
  if (req.method == 'OPTIONS') {
      res.status(204).send('');
  }
  const { from_email, from_name, message } = req.body;

  // validate fields
  if (!from_email || !from_name || !message) return res.status(422).send({ error: 'Bad Input' });
    
  const email = {
    from_email,
    from_name,
    message,
    dateSent: Date.now()
  };
  // create mailer object containing email info
  const mailer = new Mailer(email, emailTemplate(email));
  // save to database and send email
  admin.database().ref('emails').push(email)
    .then(() => mailer.send().then(mailerResponse => res.send(email)))
    .catch(err => res.status(422).send(err));
}