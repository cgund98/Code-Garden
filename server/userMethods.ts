Meteor.methods({
    'users.getAccountByEmail'({email}) {
        return Accounts.findUserByEmail(email);
    }
});
