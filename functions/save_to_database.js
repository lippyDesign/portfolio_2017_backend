const admin = require('firebase-admin');

module.exports = (req, res) => {
  const { from_email, from_name, message } = req.body;
  // validate fields
  if (!from_email || !from_name || !message) return res.status(422).send({ error: 'Bad Input' });
    // Verify the user provided a phone
    if (!req.body.phone) return res.status(422).send({ error: 'Bad Input' });
    // Format the phone number to remove dashes and parens
    const phone = String(req.body.phone).replace(/[^\d]/g, '');
    // Create a new user account using the provided phone number
    admin.auth().createUser({ uid: phone })
        //Respond to user request, saying the account was made
        .then(user => res.send(user))
        .catch(error => res.status(422).send({ error }));
}