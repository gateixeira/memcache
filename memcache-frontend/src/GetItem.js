import React, { useState } from 'react';
import axios from 'axios';

function GetItem() {
  const [repository, setRepository] = useState('');
  const [objectId, setObjectId] = useState('');
  const [data, setData] = useState(null);
  const [isImage, setIsImage] = useState(false);
  const [error, setError] = useState(null);

  const handleGet = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/memcache/${repository}/${objectId}`, { responseType: 'arraybuffer' });
      const contentType = response.headers['content-type'];
      if (contentType && contentType.startsWith('image/')) {
        setIsImage(true);
        const blob = new Blob([response.data], { type: contentType });
        const imageUrl = URL.createObjectURL(blob);
        setData(imageUrl);
      } else {
        setIsImage(false);
        const textData = new TextDecoder().decode(new Uint8Array(response.data));
        setData(textData);
      }
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('Error fetching data', error);
      setData(null);
      setIsImage(false);
      setError('Item not found');
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-4">Get Item</h2>
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
      <button onClick={handleGet} className="w-full p-2 bg-blue-500 text-white rounded">Get</button>
      {error && (
        <div className="mt-4 p-2 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      {data && (
        <div className="mt-4 p-2 bg-gray-100 rounded">
          {isImage ? (
            <img src={data} alt="Fetched content" className="max-w-full h-auto" />
          ) : (
            <pre>{data}</pre>
          )}
        </div>
      )}
    </div>
  );
}

export default GetItem;