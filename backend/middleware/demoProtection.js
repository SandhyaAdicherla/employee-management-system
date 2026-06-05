const DEMO_EMAILS = [
  "admin@emsdemo.com",
  "employee@emsdemo.com"
];

const demoProtection = (
  req,
  res,
  next
) => {

  if (
    DEMO_EMAILS.includes(
      req.user.email
    )
  ) {
    return res.status(403).json({
      message:
      "Demo accounts do not have access to perform this action"
    });
  }

  next();

};

module.exports =
  demoProtection;