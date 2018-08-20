import { Email } from 'meteor/email'
Meteor.methods({
    'users.getAccountByEmail'({email}) {
        return Accounts.findUserByEmail(email);
    },
    'user.sendEmail'({email}) {
        // return Email.send;
        // Login: MAIL_URL=smtp://postmaster@sandboxe68aabf6b96b4fafbe53185266af9496.mailgun.org:4cda19c9edfe6e2adcde61cde45bb807-a4502f89-88f9603e@smtp.mailgun.org:587
        var mail = Email.send({
            from: 'noreply@codegarden.xyz',
            to: email,
            replyTo: 'noreply@codegarden.xyz',
            subject: 'test',
            text: 'test',
        });
        return mail;
    }
});
