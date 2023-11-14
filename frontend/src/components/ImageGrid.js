import React from "react";

const ImageGrid = ({ image_urls }) => {
  return (
    <div className="w-full max-w-5xl p-5 pb-10 mx-auto mb-10 gap-5 columns-3 space-y-5">
      {image_urls.map((url, index) => (
        <img
          src={url}
          key={index}
          alt={`Image ${index + 1}`}
          className="w-auto h-auto object-cover rounded-md shadow-md border-2 border-blue-200"
        />
      ))}
    </div>
  );
};

export default ImageGrid;
