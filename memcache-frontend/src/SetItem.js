import React, { useState } from 'react';
import axios from 'axios';

function SetItem() {
  const [repository, setRepository] = useState('');
  const [data, setData] = useState('');
  const [response, setResponse] = useState(null);

  const handleSet = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/memcache/${repository}`, data, {
        headers: { 'Content-Type': 'application/octet-stream' }
      });
      setResponse(response.data);
    } catch (error) {
      console.error('Error setting data in repository: ' + repository + ' with data: ' + data + '. Error: ' + error.message);
      setResponse(null);
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-4">Set Item</h2>
      <input
        type="text"
        placeholder="Repository"
        value={repository}
        onChange={(e) => setRepository(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <textarea
        placeholder="Data"
        value={data}
        onChange={(e) => setData(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <button onClick={handleSet} className="w-full p-2 bg-green-500 text-white rounded">Set</button>
      {response && (
        <div className="mt-4 p-2 bg-gray-100 rounded">
          <h3 className="text-lg font-semibold">Response</h3>
          <p><strong>Size:</strong> {response.size}</p>
          <p><strong>OID:</strong> <span className="break-words">{response.oid}</span></p>
        </div>
      )}
    </div>
  );
}

export default SetItem;