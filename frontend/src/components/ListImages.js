import React from "react";

import FolderComponent from "./FolderComponent";
import ImageGrid from "./ImageGrid";

const ListImages = ({ presignedUrls, folder, setFolder, fetched_folders }) => {
  const filtered_presigned_url = presignedUrls.filter((url) =>
    url.includes(folder)
  );

  return (
    <div className="border-t-4 border-solid  border-gray-500 mt-8 mb-5">
      <h3 className="text-white text-5xl mb-7 mt-5 font-mono">Show Images</h3>

      <div>
        <FolderComponent
          folder={folder}
          setFolder={setFolder}
          fetched_folders={fetched_folders}
        />
      </div>

      <div>
        <ImageGrid image_urls={filtered_presigned_url} />
      </div>
    </div>
  );
};

export default ListImages;
