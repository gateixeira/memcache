import React, { useState } from 'react';
import axios from 'axios';

function DeleteItem() {
  const [repository, setRepository] = useState('');
  const [objectId, setObjectId] = useState('');
  const [response, setResponse] = useState(null);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/memcache/${repository}/${objectId}`);
      setResponse(response.status === 200 ? 'Deleted successfully' : 'Not found');
    } catch (error) {
      console.error('Error deleting data', error);
      setResponse('Error deleting data');
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-4">Delete Item</h2>
      <input
        type="text"
        placeholder="Repository"
        value={repository}
        onChange={(e) => setRepository(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="text"
        placeholder="Object ID"
        value={objectId}
        onChange={(e) => setObjectId(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <button onClick={handleDelete} className="w-full p-2 bg-red-500 text-white rounded">Delete</button>
      {response && <p className="mt-4 p-2 bg-gray-100 rounded">{response}</p>}
    </div>
  );
}

export default DeleteItem;