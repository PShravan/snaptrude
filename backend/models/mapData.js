import mongoose from "mongoose";

const mapDataSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: true,
    },
    region: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true },
);

export const MapData = mongoose.model('MapData', mapDataSchema);