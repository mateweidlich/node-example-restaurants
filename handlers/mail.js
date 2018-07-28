const nodemailer = require('nodemailer');
const promisify = require('es6-promisify');
const pub = require('pug');
const juice = require('juice');
const htmlToText = require('html-to-text');

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

const generateHtml = (filename, options = {}) => {
  const html = pub.renderFile(
    `${__dirname}/../views/email/${filename}.pug`,
    options
  );
  const inlined = juice(html);

  return inlined;
};

exports.send = async options => {
  const html = generateHtml(options.filename, options);
  const text = htmlToText.fromString(html);

  const mailOptions = {
    from: 'Testing <testing@example.com>',
    to: `${options.user.name} <${options.user.email}>`,
    subject: options.subject,
    html,
    text
  };

  const sendMail = promisify(transport.sendMail, transport);

  return sendMail(mailOptions);
};
