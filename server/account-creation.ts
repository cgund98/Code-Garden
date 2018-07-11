Accounts.onCreateUser(function(options, user) {
   // Use provided profile in options, or create an empty object
   user.profile = {}
   user.profile.name = options.name;
   return user;
});
