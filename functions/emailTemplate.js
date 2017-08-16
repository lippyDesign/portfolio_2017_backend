module.exports = email => {
  return `
    <html>
      <div style="text-align: center;">
        <h3>Message regarding Apps by Volo!</h3>
        <p>From:</p>
        <p>${email.from_name} (${email.from_email})</p>
        <div>
          <p>${email.message}</p>
        </div>
        <div>
          <p>Sent on: ${new Date(email.dateSent).toDateString()}</p>
        </div>
      </div>
    </html>
  `;
};