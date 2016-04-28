Meteor.methods({
  /*
   * add new shipping methods
   */
  addVerificationAge: function (age, shopId) {
    check(age, String);
    check(shopId, String);
    var insertDoc = {age: age, shopId: shopId};
    var currentDoc = ReactionCore.Collections.AgeVerification.findOne({shopId: shopId});
    console.log('ageverification setting...');
    if (!Roles.userIsInRole(Meteor.userId(), ['admin', 'ageverification'])) {
      return false;
    }
    if(currentDoc){
      return ReactionCore.Collections.AgeVerification.update({'_id': currentDoc}, {$set: {age:age}});
    }
    else{
      return ReactionCore.Collections.AgeVerification.insert(insertDoc);
    }
  }
})