import NodeCache from "node-cache";

import { MapData } from "../models/mapData.js";

const cache = new NodeCache({stdTTL: 3600});

export const getMapsData = async (req, res) => {
  try {
    const cacheKey = `maps_${req.user.id}`;
    let mapData = cache.get(cacheKey);

    if (!mapData) {
      mapData = await MapData.find({ user: req.user.id });

      // Cache the data fetched from MongoDB
      cache.set(cacheKey, mapData);
    }

    res.status(200).json(mapData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getMapData = async (req, res) => {
  const { id } = req.params;
  try {
    const cacheKey = `map_${id}`;
    let mapData = cache.get(cacheKey);

    if (!mapData) {
      mapData = await MapData.findById(id);

      // Cache the data fetched from MongoDB
      if (mapData) {
        cache.set(cacheKey, mapData);
      }
    }

    if (mapData) {
      res.status(200).json(mapData);
    } else {
      res.status(404).json({ message: "Map data not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const saveMapData = async (req, res) => {
  const { region } = req.body;
  const image = req.file.buffer.toString('base64');
  try {
    const newMapData = new MapData({ image, region, user: req.user.id });
    await newMapData.save();

    // Clear cache for the user's maps data
    const cacheKey = `maps_${req.user.id}`;
    cache.del(cacheKey);

    res.status(201).json({ message: "Map data saved successfully", data: newMapData });
  } catch (error) {
    console.log("map save error: ", error);
    res.status(500).json({ message: 'Failed to fetch map data' });
  }
};

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
};
