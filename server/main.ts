import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.startup(() => {
  // code to run on server at startup
  Accounts.emailTemplates.from = "noreply@codegarden.xyz";
  Accounts.emailTemplates.siteName = "Code Garden";
});
