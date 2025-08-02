const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
require('dotenv').config()

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
  res.render('contact' , { status: req.query.status });
});

app.post('/send', async (req, res) => {
  const { name, email, message } = req.body;

    

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: 'ogunsolafaruk8@gmail.com',
    subject: `Message from ${name}`,
    text: message,
  };

  try {
  await transporter.sendMail(mailOptions);
  return res.json({ success: true, message: 'Email sent' });
} catch (err) {
  console.error(err);
  return res.status(500).json({ success: false, message: 'Failed to send email' });
}


});


// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
