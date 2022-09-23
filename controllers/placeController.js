const asyncHandler = require("express-async-handler");
const Place = require('../models/placeSchema')
const User = require('../models/userSchema')


const addPlace = asyncHandler(async (req, res) => {

  const { title, photo, description, address } = req.body;

  const createPlace = new Place({
    title: title,
    photo: photo,
    description: description,
    address: address,
    user: req.user._id,
  })

  const user = await User.findById(req.user._id)

  

  const create = await createPlace.save()
  await user.places.unshift(create._id)
  await user.save()

  if(!create){
      res.status(400)
      throw new Error("Something Went Wrong")
  }
  else{
    return res.status(200).json({
      msg: "Place Saved Successfully",
    });
  }


});

const getAllPlace = asyncHandler(async (req, res) => {

  const places = await Place.find({}).sort({date : -1})

  if(!places){
    res.status(400)
    throw new Error("Something Went Wrong")
  }
  else{
    return res.status(200).json({
      places : places 
    });
  }

 
});

const getPlaceByUserId = asyncHandler(async (req, res) => {
  return res.status(200).json({
    msg: "get place by user id",
  });
});

const getPlaceById = asyncHandler(async (req, res) => {
  return res.status(200).json({
    msg: "get place by id",
  });
});

const updatePlaceById = asyncHandler(async (req, res) => {
  return res.status(200).json({
    msg: "update place by user id",
  });
});

const deletePlaceById = asyncHandler(async (req, res) => {
  return res.status(200).json({
    msg: "delete place by user id",
  });
});

module.exports = {
  addPlace,
  getAllPlace,
  getPlaceByUserId,
  getPlaceById,
  updatePlaceById,
  deletePlaceById,
};
