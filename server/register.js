ReactionCore.registerPackage({
  name: "reaction-age-verification",
  icon: "fa fa-user",
  autoEnable: false,
  settings: {
    "public": {

    }
  },
  registry: [{
    provides: "dashboard",
    label: "Age Verification",
    description: "Age Verification Modals",
    template: "reactionAnalytics",
    icon: "fa fa-lock",
    priority: 3,
    container: "connect",
    permissions: [{
      label: "Reaction Age Verification",
      permission: "dashboard/analytics"
    }]
  }, {
    label: "Age Verification Settings",
    route: "/dashboard/ageverification/settings",
    provides: "settings",
    container: "dashboard",
    template: "ageverificationsettings"
  }]
});
