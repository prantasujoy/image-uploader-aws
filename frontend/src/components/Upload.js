//external imports

import React, { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import UseMutation from "../hooks/UseMutation";
import UseQuery from "../hooks/useQuery";

//internal imports

import getFolderFromURl from "../utils/getFolderFromURl";
import UserContext from "../context/userContext";
import Error from "./Error";
import ListImages from "./ListImages";
import FolderComponent from "./FolderComponent";

const validFileTypes = ["image/jpg", "image/jpeg", "image/png"];
const url = "/images";

const Upload = () => {
  const [refetch, setRefecth] = useState(false);
  const { logOut } = useContext(UserContext);

  const {
    data: presignedUrls,
    loading: imageFetching,
    success: fetchSuccessful,
    error: fetchError,
  } = UseQuery({ url, refetch });

  const [error, setError] = useState("");
  const [folder, setFolder] = useState("common_uploads");
  const [folderToFetch, setFolderToFetch] = useState("");

  const fetched_folders = getFolderFromURl(presignedUrls);

  const {
    mutate: uploadImage,
    isLoading: imageUploading,
    error: uploadError,
    success: uploadSuccessful = false,
  } = UseMutation({ url });

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    setError(false);

    if (!validFileTypes.find((type) => type === file?.type)) {
      setError("valid file types are png,jpeg,jpg");
    } else {
      const fd = new FormData();
      fd.append("image", file);

      await uploadImage(fd, folder);

      setTimeout(() => {
        setRefecth((prev) => !prev);
      }, 5000);
    }
  };

  const handleLogout = () => {
    logOut();
  };

  return (
    <>
      <div className="text-center mt-5">
        <div className="flex justify-between px-10">
          <div></div>
          <button
            className="bg-blue-300 font-semibold px-3 py-1 mb-5 rounded-md h-8 w-32"
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
        <h3 className="text-white text-5xl mb-7 font-mono">Upload Images</h3>

        <FolderComponent
          folder={folder}
          setFolder={setFolder}
          fetched_folders={fetched_folders}
          newFolder={true}
        />
        <form>
          <input
            type="file"
            id="image-input"
            hidden
            disabled={imageUploading}
            onChange={handleUpload}
          />

          <label
            htmlFor="image-input"
            className="bg-blue-600 text-black-300 rounded-md p-2 px-2 font-mono text-lg"
          >
            {imageUploading && <FontAwesomeIcon icon={faSpinner} spin />}

            <span className="px-2">Upload Image</span>
          </label>
        </form>
        {error && <Error>{error}</Error>}

        <ListImages
          presignedUrls={presignedUrls}
          folder={folderToFetch}
          setFolder={setFolderToFetch}
          fetched_folders={fetched_folders}
          newFolder={false}
        />
      </div>
    </>
  );
};

export default Upload;
