const Mailer = require('./Mailer');
const emailTemplate = require('./emailTemplate');

module.exports = (req, res) => {
  const { from_email, from_name, message } = req.body;
    
  const email = {
    from_email,
    from_name,
    message,
    dateSent: Date.now()
  };
  // send email
  const mailer = new Mailer(email, emailTemplate(email));

  mailer.send()
    .then((mailerResponse) => res.send(email))
    .catch(err => res.status(422).send(err));
}