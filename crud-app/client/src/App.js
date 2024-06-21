// src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const response = await axios.get("http://localhost:3001/api/items");
    setItems(response.data);
  };

  const createItem = async () => {
    await axios.post("http://localhost:3001/api/items", { name, value });
    setName("");
    setValue("");
    fetchItems();
  };

  const updateItem = async () => {
    await axios.put(`http://localhost:3001/api/items/${editId}`, {
      name,
      value,
    });
    setName("");
    setValue("");
    setEditId(null);
    fetchItems();
  };

  const deleteItem = async (id) => {
    await axios.delete(`http://localhost:3001/api/items/${id}`);
    fetchItems();
  };

  const startEdit = (item) => {
    setName(item.name);
    setValue(item.value);
    setEditId(item.id);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">CRUD Application</h1>
      <div className="grid grid-cols-4 gap-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="p-2 border rounded"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Value"
          className="p-2 border rounded"
        />
        <button
          onClick={editId ? updateItem : createItem}
          className="p-2 bg-blue-500 text-white rounded"
        >
          {editId ? "Update" : "Add"}
        </button>
      </div>
      <table className="table-auto w-full mt-4">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Value</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td className="border px-4 py-2">{item.id}</td>
              <td className="border px-4 py-2">{item.name}</td>
              <td className="border px-4 py-2">{item.value}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => startEdit(item)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
