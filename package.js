Package.describe({
  summary: "Reaction Age Verification - Age Verification Modal",
  name: "reactioncommerce:age-verification",
  version: "0.4.0",
  git: "https://github.com/ongoworks/reaction-helloworld.git"
});

Package.on_use(function (api) {
  api.versionsFrom("METEOR@1.2");

  // meteor base packages
  api.use("standard-minifiers");
  api.use("mobile-experience");
  api.use("meteor-base");
  api.use("mongo");
  api.use("blaze-html-templates");
  api.use("session");
  api.use("jquery");
  api.use("tracker");
  api.use("logging");
  api.use("reload");
  api.use("random");
  api.use("ejson");
  api.use("spacebars");
  api.use("check");
  api.use("ecmascript");
  api.use("less");

  api.use("reactioncommerce:core@0.12.0");

  api.addFiles("server/register.js", ["server"]); // register as a reaction package
  api.addFiles("server/methods.js", ["server"]); // register as a reaction package
  api.addFiles("common/collections.js", ["server", "client"]); // register collections

  api.addFiles([
    "client/templates/age-verification/age-verification.html",
    "client/templates/age-verification/age-verification.js",
    "client/templates/age-verification/agecheck.css",
    "client/templates/age-verification/jquery.agecheck.js",
    "client/templates/age-verification/jquery.cookie.js"
  ], ["client"]);
});
