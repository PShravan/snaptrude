import NodeCache from "node-cache";

import { MapData } from "../models/mapData.js";

const cache = new NodeCache({stdTTL: 3600});

export const getMapsData = async (req, res) => {
  try {
    const mapData = await MapData.find();
    res.status(200).json(mapData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getMapData = async (req, res) => {
  const { id } = req.params;
  try {
    const mapData = await MapData.findById(id);
    res.status(200).json(mapData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const saveMapData = async (req, res) => {
  const { region } = req.body;
  console.log(req.file);
  const image = req.file.buffer.toString('base64');
  try {
    const newMapData = new MapData({ image, region });
    await newMapData.save();
    res.status(201).json({ message: "Map data saved successfully", data: newMapData });
  } catch (error) {
    console.log("map save error: ", error);
    res.status(500).json({ message: 'Failed to fetch map data' });
  }
}

export const getTopMaps = async (req, res) => {
  try {
    const topMaps = await MapData.aggregate([
      { $group: { _id: '$region', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 3 }
    ]);
    res.status(200).json(topMaps);
  } catch (error) {
    res.status(404).json({ message: 'Failed to fetch top maps' });
  }
}

export const getCachedMapData = async (req, res) => {
  const cacheKey = "mapData";
  if (cache.has(cacheKey)) {
    const mapData = cache.get(cacheKey);
    res.status(200).json(mapData);
  } else {
    try {
      const mapData = await MapData.find();
      cache.set(cacheKey, mapData);
      res.status(200).json(mapData);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch map data' });
    }
  }
}