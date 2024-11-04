import React, { useState } from 'react';
import axios from 'axios';

function ListItems() {
  const [repository, setRepository] = useState('');
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  const handleList = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/memcache/${repository}`);
      setItems(response.data);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('Error fetching data', error);
      setItems([]);
      setError('Items not found');
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-4">List Items</h2>
      <input
        type="text"
        placeholder="Repository"
        value={repository}
        onChange={(e) => setRepository(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <button onClick={handleList} className="w-full p-2 bg-blue-500 text-white rounded">List</button>
      {error && (
        <div className="mt-4 p-2 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      {items.length > 0 && (
        <div className="mt-4 p-2 bg-gray-100 rounded">
          <ul>
            {items.map((item, index) => (
              <li key={index} className="mb-2">
                {item.value} {/* Adjust this line to access the correct property */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ListItems;
