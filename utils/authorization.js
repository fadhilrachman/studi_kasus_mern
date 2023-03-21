const { Ability, AbilityBuilder } = require("@casl/ability");
const User = require("../app/user/model");

const policies = {
  user(user, { can }) {},
};

const policyFor = (user) => {
  const builder = new AbilityBuilder();
  if (user && typeof policies[user.role] === "function") {
    policies[user.role](user, builder);
  } else {
    policies["guest"](user, builder);
  }

  return new Ability(builder.rules);
};

const policyCheck = (action, subject) => {
  return async (req, res, next) => {
    const token = req.headers["authorization"];
    const user = await User.findOne({ token });
    const policy = policyFor(user);
    if (!policy.can(action, subject)) {
      return res.status(400).json({
        message: "tidak dapat akses",
      });
    }
    // console.log("berhasil");
    next();
  };
};

module.exports = policyCheck;
