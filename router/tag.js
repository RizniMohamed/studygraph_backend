const router = require("express").Router();
const { createTag, getTag, updateTag, deleteTag } = require("../controller/tag/tag");

router
  .route("/")
  .get(getTag)
  .post(createTag)

router
  .route("/:tagID")
  .get(getTag)
  .patch(updateTag)
  .delete(deleteTag)

module.exports = router;
