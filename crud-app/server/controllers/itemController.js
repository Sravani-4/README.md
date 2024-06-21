// server/controllers/itemController.js
const Item = require("../models/itemModel");

exports.getAllItems = (req, res) => {
  Item.getAll((err, items) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(items);
    }
  });
};

exports.getItemById = (req, res) => {
  const id = req.params.id;
  Item.getById(id, (err, item) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!item) {
      res.status(404).json({ error: "Item not found" });
    } else {
      res.json(item);
    }
  });
};

exports.createItem = (req, res) => {
  const newItem = req.body;
  Item.create(newItem, (err, createdItem) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json(createdItem);
    }
  });
};

exports.updateItem = (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  Item.update(id, updatedData, (err, updatedItem) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(updatedItem);
    }
  });
};

exports.deleteItem = (req, res) => {
  const id = req.params.id;
  Item.delete(id, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(204).json();
    }
  });
};
