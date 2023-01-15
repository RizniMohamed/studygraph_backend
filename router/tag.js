const router = require("express").Router();
const { createTag, getTag, updateTag, deleteTag } = require("../controller/tag/tag");

router
  .route("/")
  .post(createTag)
  .get(getTag)

router
  .route("/:tagID")
  .patch(updateTag)
  .delete(deleteTag);

module.exports = router;
