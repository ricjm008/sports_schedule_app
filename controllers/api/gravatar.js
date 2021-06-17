const gravatar = require("gravatar");

gravatar.url(email);
gravatar.url(email, options);
gravatar.url(email, options, protocol);

gravatar.profile_url(email);
gravatar.profile_url(email, options);
gravatar.profile_url(email, options, protocol);

module.exports = gravatar;
