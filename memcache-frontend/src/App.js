import React from 'react';
import GetItem from './GetItem';
import SetItem from './SetItem';
import DeleteItem from './DeleteItem';
import ListItems from './ListItems'; // Import the new component

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Memcache Frontend</h1>
      <div className="space-y-4 w-full max-w-md">
        <GetItem />
        <SetItem />
        <DeleteItem />
        <ListItems /> {/* Include the new component */}
      </div>
    </div>
  );
}

export default App;