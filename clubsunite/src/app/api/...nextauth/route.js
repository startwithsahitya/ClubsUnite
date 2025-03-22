// app/api/auth/[...nextauth]/route.js
const { handlers } = require("../../../lib/next-auth-config");

module.exports = { GET: handlers.GET, POST: handlers.POST };
