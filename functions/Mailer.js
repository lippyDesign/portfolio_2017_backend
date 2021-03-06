const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const { sendGridKey, listOfRecipients } = require('./keys'); // listOfRecipients [{ email: example@example.com }, { email: example2@example.com }]

class Mailer extends helper.Mail {
  constructor({ from_email, from_name, message }, content) {
    super();

    this.sgApi = sendgrid(sendGridKey);
    this.from_email = new helper.Email(from_email);
    this.subject = 'Re: APPS BY VOLO';
    this.body = new helper.Content('text/html', content);
    this.recipients = this.formatAddresses(listOfRecipients);

    this.addContent(this.body);
    this.addClickTracking();
    this.addRecipients();

  }

  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    });
  }

  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients() {
    const personalize = new helper.Personalization();

    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);
    });
    this.addPersonalization(personalize);
  }

  send() {
    const request = this.sgApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON()
    });

    return this.sgApi.API(request)
      .then(response => response)
      .catch(e => e);
  }
}

module.exports = Mailer;