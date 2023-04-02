const nodemailer = require('nodemailer');
const htmlToText = require('html-to-text');
const pug = require('pug');

module.exports = class Email {
    constructor(user, url) {
        this.from = `Marwan Zaky <${process.env.EMAIL_FROM}>`;
        this.to = user.email;
        this.firstName = user.name.split(' ')[0];
        this.url = url;
    }

    newTransport() {
        if (process.env.NODE_ENV === 'production')
            return nodemailer.createTransport({
                service: 'SendGrid',
                auth: {
                    user: process.env.SENDGRID_USERNAME,
                    pass: process.env.SENDGRID_PASSWORD
                }
            });

        return nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });
    }

    async send(template, subject) {
        const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
            websiteName: 'Mamolio',
            firstName: this.firstName,
            url: this.url,
            subject
        });

        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html,
            text: htmlToText.fromString(html)
        }

        await this.newTransport().sendMail(mailOptions);
    }

    async sendWelcome() {
        await this.send('welcome', 'Welcome to our Store!');
    }
}