const getFolderFromURl = (urls) => {
  const folder = urls.map((url) => {
    const part1 = url.split("amazonaws.com/");
    const folder_part = part1[1].split("/")[1];

    return folder_part;
  });

  const unique_folder = folder.filter(
    (value, index, self) => self.indexOf(value) === index
  );

  return unique_folder;
};

export default getFolderFromURl;
