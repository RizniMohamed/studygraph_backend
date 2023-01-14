const tagModel = require("../../model/tag");
const userModel = require("../../model/user");
const { StatusCodes } = require("http-status-codes");
const { APIError } = require("../../middleware/errorHandler");

//create post
const createTag = async (req, res) => {
  const { name, color, userID } = req.body;

  if (!userID) throw new APIError("userID required", StatusCodes.NOT_FOUND)
  const user = await userModel.findById({ _id: userID })
  if (!user) throw new APIError("user not found", StatusCodes.NOT_FOUND)
  if (!color) throw new APIError("color not found", StatusCodes.NOT_FOUND)

  const newTag = await tagModel.create({
    name: name,
    color: color,
    userID: userID
  }).catch(err => {
    if (err.code === 11000)
      throw new APIError(`Duplication error:  ${JSON.stringify(err.keyValue)}`, err.code)
    throw new APIError(err.message, err.code)
  })

  return res.status(StatusCodes.OK).json({
    status: StatusCodes.CREATED,
    data: newTag,
  });

};

//Get tags
const getTag = async (req, res) => {

  const { tagID } = req.params;
  if (tagID)
    tag = await tagModel.find({ _id: tagID })
  else
    tag = await tagModel.find()

  if (tag.length === 0)
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.NOT_FOUND,
      data: "No tag found",
    });

  if (tagID)
    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      data: tag[0]
    });
  else
    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      data: {
        count: tag.length,
        tag: tag,
      }
    });

};

//Update tag
const updateTag = async (req, res) => {
  const { name, color } = req.body;
  const { tagID } = req.params;

  if (!tagID) throw new APIError("tagID required", StatusCodes.NOT_FOUND)
  const tag = await tagModel.findById({ _id: tagID })
  if (!tag) throw new APIError("tag not found", StatusCodes.NOT_FOUND)


  await tagModel.findByIdAndUpdate(
    { _id: tagID },
    {
      name: name,
      color: color,
    }).catch(err => {
      if (err.code === 11000)
        throw new APIError(`Duplication error:  ${JSON.stringify(err.keyValue)}`, err.code)
      throw new APIError(err.message, err.code)
    })

  return res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    data: "tag updated successfully.",
  });
};

// delete tag
const deleteTag = async (req, res) => {
  const { tagID } = req.params;

  if (!tagID) throw new APIError("tagID required", StatusCodes.NOT_FOUND)
  const tag = await tagModel.findById({ _id: tagID })
  if (!tag) throw new APIError("tag not found", StatusCodes.NOT_FOUND)

  await tagModel.deleteOne({ _id: tagID })

  return res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    data: "tag deleted successfully.",
  });
};

module.exports = {
  createTag,
  getTag,
  updateTag,
  deleteTag,
};
