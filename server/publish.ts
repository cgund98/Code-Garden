Meteor.publish('userData', function () {
	return Meteor.users.find({}, {fields: { profile: 1, emails: 1}});
});
