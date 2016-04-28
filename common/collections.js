ReactionCore.Collections.AgeVerification = new Mongo.Collection("AgeVerification");

ReactionCore.Schemas.AgeVerificationConfig = new SimpleSchema([
  ReactionCore.Schemas.PackageConfig, {
    "settings.age": {
      type: String,
      defaultValue: "Age of Legal Requirement"
    }
  }
]);
ReactionCore.Collections.Packages.attachSchema(ReactionCore.Schemas.AgeVerificationConfig);
