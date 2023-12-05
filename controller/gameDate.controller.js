import { Router } from "express";
const router = Router();
import {authenticate} from '../middleware/authenticate.js';
import GameDataModel from '../models/game_data.model.js';


router.get("/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const item = await GameDataModel.findById(id);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error getting user data");
  }
});

router.post("", authenticate, async (req, res) => {
  try {
    const { userId } = req.user;
    const { GameDataId, Speed, Height, Weight, Impact } = req.body;
    const newItem = await GameDataModel.create({
      userId,
      GameDataId,
      Speed,
      Height,
      Weight,
      Impact,
    });
    res.json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating item" });
  }
});

router.put("/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { GameDataId, Speed, Height, Weight, Impact } = req.body;
    const updatedItem = await GameDataModel.findByIdAndUpdate(
      id,
      { GameDataId, Speed, Height, Weight, Impact },
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating item" });
  }
});

router.delete("/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await GameDataModel.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting item" });
  }
});

export default router;
