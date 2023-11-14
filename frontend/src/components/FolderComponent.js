import React, { useEffect, useState } from "react";

const FolderComponent = ({ folder, setFolder, fetched_folders, newFolder }) => {
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    setFolders(fetched_folders);
  }, [fetched_folders]);

  let newTimeout;

  const handleSelectChange = (e) => {
    setFolder(e.target.value);
  };

  const handleInputChange = (e) => {
    if (newTimeout) {
      clearTimeout(newTimeout);
    }

    newTimeout = setTimeout(() => {
      setFolders((prev) => [...prev, e.target.value]);
    }, 1000);
  };
  const options = folders?.map((folder, index) => (
    <option value={folder} key={index}>
      {folder}
    </option>
  ));

  return (
    <>
      {newFolder && (
        <div className="mb-5">
          <label
            htmlFor="input-folder"
            className="block text-white text-2xl  m-3"
          >
            New Folder
          </label>
          <input
            type="text"
            id="input folder"
            placeholder="new folder..."
            className="w-1/5 appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
            onChange={handleInputChange}
          ></input>
        </div>
      )}

      <div className="mb-5">
        <label htmlFor="dropdown" className="block text-white text-2xl  m-3">
          Select Folder
        </label>

        <select
          id="dropdown"
          className="w-1/5 appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
          value={folder}
          onChange={handleSelectChange}
        >
          <option value="">{!newFolder ? "All Folders" : "select...."}</option>
          {options}
        </select>
      </div>
    </>
  );
};

export default FolderComponent;
