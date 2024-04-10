// This is the file for the email confirmation
const nodemailer = require('nodemailer')

// This is the connection to the fake email
const transporter = nodemailer.createTransport({
  host: 'live.smtp.mailtrap.io',
  port: 587,
  secure: false,
  auth: {
    user: 'api',
    pass: '291fae13f5d57fff2920d72565c7b043'
  }
})

const sendConfirmEmail = async (req, res, next) => {
  const { vehicleId, startDate, endDate, currentUser, gps, insurance, imageUrl } = req.body

  console.log(vehicleId)
  const mailOptions = {
    from: 'info@demomailtrap.com',
    to: 'tchristophermezzacappa818@gmail.com', // christophermezzacappa818@gmail.com -> with out this email it should fail
    subject: 'Reservation Confirmation',
    text: 'Confirmation for Car Reservation',
    html: `
        <h1>Reservation Confirmation</h1>
        <p><b>Vehicle ID:</b> ${vehicleId}</p>
        <p><b>Start Date:</b> ${startDate}</p>
        <p><b>End Date:</b> ${endDate}</p>
        <p><b>User:</b> ${currentUser}</p>
        <p><b>GPS Included:</b> ${gps ? 'Yes' : 'No'}</p>
        <p><b>Insurance Included:</b> ${insurance ? 'Yes' : 'No'}</p>
        <p>Thank you for choosing our service!</p>
        <img src="${imageUrl}" alt="Vehicle Image" style="width:100%;max-width:600px;height:auto;">
    `
  }

  console.log('Trying to send email')

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error)
    }
    console.log('Message sent: %s', info.messageId)
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
  })
  console.log('Email should of sent')
}

module.exports = sendConfirmEmail
