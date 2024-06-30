// const express = require("express");
// const multer = require("multer");

import express from "express";
import multer from "multer";

const router = express.Router();

import {
  saveMapData,
  getMapsData,
  getMapData,
  getTopMaps,
  getCachedMapData,
} from "../controllers/mapController.js";

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/map/capture", upload.single("image"), saveMapData);
router.get("/maps", getMapsData);
router.get("/maps/:id", getMapData);
router.get("/maps/top", getTopMaps);
router.get("/maps/cached", getCachedMapData);

export default router;