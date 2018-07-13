Meteor.methods({

  'roles.enroll'({targetUserId, course}) {
    var loggedInUser = Meteor.user();

    if (!loggedInUser ||
        !Roles.userIsInRole(loggedInUser, ['admin', 'owner'], course)
        && loggedInUser._id !== targetUserId) {
      throw new Meteor.Error(403, "Access denied")
    }
    Roles.setUserRoles(targetUserId, ['student'], course);
},

  'roles.setOwner'({targetUserId, course}) {
      var loggedInUser = Meteor.user();

      if (!loggedInUser ||
          !Roles.userIsInRole(loggedInUser, ['owner'], course)
          && Roles.getUsersInRole('owner', course).fetch().length === 0
          && loggedInUser._id !== targetUserId) {
        throw new Meteor.Error(403, "Access denied");
    } else if (!loggedInUser ||
               !Roles.userIsInRole(loggedInUser, ['owner'], course)
               && Roles.getUsersInRole('owner', course).fetch().length !== 0) {
        throw new Meteor.Error(403, "Access denied");
    }
      Roles.setUserRoles(targetUserId, ['owner'], course);
  },

  'roles.setAdmin'({targetUserId, course}) {
      var loggedInUser = Meteor.user();

      if (!loggedInUser ||
          !Roles.userIsInRole(loggedInUser, ['owner', 'admin'], course)) {
        throw new Meteor.Error(403, "Access denied");
    } else if (Roles.userIsInRole(loggedInUser, ['owner'], course) &&
               Roles.getUsersInRole('owner', course).fetch().length === 1) {
        throw new Meteor.Error(403, "Access denied, must have at least 1 owner");
    }

      Roles.setUserRoles(targetUserId, ['admin'], course);
  }

})
