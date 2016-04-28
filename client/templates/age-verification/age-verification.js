Template.ageverificationsettings.helpers({
  ageVerification() {
    const instance = Template.instance();
    if (instance.subscriptionsReady()) {
      return ReactionCore.Collections.AgeVerification.findOne({shopId: ReactionCore.getShopId()});
    }
  }
});
Template.ageverificationsettings.events = {
	'click [data-action="save-age-verification"]': function(){
		console.log('test');
		var val = $('[name="age"]').val();
		console.log(val);
		Meteor.call("addVerificationAge", val, ReactionCore.getShopId(), function(err, res){
			console.log(err);
			console.log(res);
		});
	}
}