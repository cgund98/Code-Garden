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
    } else if (Roles.userIsInRole(targetUserId, ['owner'], course) &&
               Roles.getUsersInRole('owner', course).fetch().length === 1) {
        throw new Meteor.Error(403, "Access denied, must have at least 1 owner");
    }

      Roles.setUserRoles(targetUserId, ['admin'], course);
  },
  'roles.setStudent'({targetUserId, course}) {
      var loggedInUser = Meteor.user();

      if (!loggedInUser ||
          !Roles.userIsInRole(loggedInUser, ['owner', 'admin'], course)) {
        throw new Meteor.Error(403, "Access denied");
    } else if (Roles.userIsInRole(targetUserId, ['owner'], course) &&
               Roles.getUsersInRole('owner', course).fetch().length === 1) {
        throw new Meteor.Error(403, "Access denied, must have at least 1 owner");
    }

      Roles.setUserRoles(targetUserId, ['student'], course);
  },

  'roles.removeFromCourse'({targetUserId, course}) {
      var loggedInUser = Meteor.user();

      if (!loggedInUser ||
          !Roles.userIsInRole(loggedInUser, ['owner', 'admin'], course)) {
        throw new Meteor.Error(403, "Access denied");
    } else if (!Roles.userIsInRole(loggedInUser, ['owner', 'admin'], course)) {
        throw new Meteor.Error(403, "Access denied");
    } else if (Roles.userIsInRole(loggedInUser, ['admin'], course) &&
               Roles.userIsInRole(targetUserId, ['owner'], course)) {
        throw new Meteor.Error(403, "Access denied, only an owner may remove themselves");
    } else if (loggedInUser._id != targetUserId &&
               Roles.userIsInRole(targetUserId, ['owner'], course)) {
        throw new Meteor.Error(403, "Access denied, only an owner may remove themselves");
    } else if (Roles.userIsInRole(loggedInUser, ['owner'], course) &&
               Roles.getUsersInRole('owner', course).fetch().length === 1 &&
               loggedInUser._id === targetUserId) {
        throw new Meteor.Error(403, "Access denied, must have at least 1 owner");
    }

      Roles.setUserRoles(targetUserId, [], course);
  },

  'roles.getStudents'({course}) {
      return Roles.getUsersInRole(['student'], course).fetch();
  },
  'roles.getAdmins'({course}) {
      return Roles.getUsersInRole(['admin'], course).fetch();
  },
  'roles.getOwners'({course}) {
      return Roles.getUsersInRole(['owner'], course).fetch();
  },
  'roles.userInCourse'({targetUserId, course}) {
      return Roles.userIsInRole(targetUserId, ['student', 'admin', 'owner'], course);
  },
  'roles.userHasPerms'({targetUserId, course, roles}) {
      return Roles.userIsInRole(targetUserId, roles, course);
  },


})
