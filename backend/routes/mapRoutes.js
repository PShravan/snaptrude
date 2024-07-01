// const express = require("express");
// const multer = require("multer");

import express from "express";
import multer from "multer";
import { auth } from "../middleware/auth.js";

const router = express.Router();

import {
  saveMapData,
  getMapsData,
  getMapData,
  getTopMaps,
} from "../controllers/mapController.js";

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/map/capture", auth, upload.single("image"), saveMapData);
router.get("/maps", auth, getMapsData);
router.get("/maps/:id", auth, getMapData);
router.get("/maps/top", auth, getTopMaps);

export default router;