const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  photo: { type: String, required: true },
  address: { type: String, required: true },
  user: { type: mongoose.Types.ObjectId, required: true, ref: "User" }
},{
  timestamps : true 
});

module.exports = mongoose.model("Place", placeSchema);
