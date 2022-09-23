const express = require("express");
const router = express.Router();
const {isAuthValid} = require('../middlewares/isAuthValid')
const {
  addPlace,
  getAllPlace,
  getPlaceByUserId,
  getPlaceById,
  updatePlaceById,
  deletePlaceById,
} = require("../controllers/placeController");

router.post("/add-place" , isAuthValid ,addPlace);
router.get("/all-places",getAllPlace);
router.get("/place-by-user-id",getPlaceByUserId);
router.get("/place-by-id",getPlaceById);
router.put("/update-place-by-id",updatePlaceById);
router.delete("/delete-place-by-id",deletePlaceById);

module.exports = router;
