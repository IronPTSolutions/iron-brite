module.exports.sendValidationEmail = (user) => {
  const validateUrl = `${process.env.APP_URL}/api/v1/users/${user.id}/validate?token=${user.activateToken}`;

  console.log(`Sending validation email to ${user.email}: ${validateUrl}`);

  // TODO: send real email
};
