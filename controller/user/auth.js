const User = require("../../model/user");
const { APIError } = require("../../middleware/errorHandler");
const { StatusCodes } = require("http-status-codes");

//login
const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username: username });

  if (!user) throw new APIError("Invalid username", StatusCodes.BAD_REQUEST)
  if (!password) throw new APIError("password required", StatusCodes.BAD_REQUEST)

  if (!(user && password === user.password)) throw new APIError("Incorrect password", StatusCodes.UNAUTHORIZED)

  return res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    data: {user: user },
  });

};


module.exports = {
  login,
};
