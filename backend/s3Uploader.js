const {
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} = require("@aws-sdk/client-s3");

const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const { v4: uuid } = require("uuid");

const s3 = new S3Client({ reqion: "us-east-1" });
const BUCKET = process.env.BUCKET;

const UploadToS3 = async ({ upload_folder, user_id, file }) => {
  const key = `${user_id}/${upload_folder}/${file.originalname}`;

  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: file.buffer,
    contentType: file.mimetype,
  });

  try {
    await s3.send(command);
    return { key };
  } catch (err) {
    console.log(err);
    return { err };
  }
};

//getting all the object keys of provided folder (prefix)

const getImageKeys = async (user_id) => {
  const command = new ListObjectsV2Command({
    Bucket: BUCKET,
    Prefix: user_id,
  });
  try {
    const { Contents = [] } = await s3.send(command);

    return Contents.map((image) => image.Key);
  } catch (err) {
    console.log({ err });
  }
};

// const getAllPrefix=async()=>{

//     const command=new ListObjectsV2Command({
//         Bucket:BUCKET,

//     })

//     try{
//         const {Contents=[]}=await s3.send(command)

//        console.log(Contents)
//     }
//     catch(err){
//         console.log({err})
//     }
// }

const getPresignedUrl = async (user_id) => {
  const image_keys = await getImageKeys(user_id);

  try {
    const presignedUrls = await Promise.all(
      image_keys?.map((key) => {
        const command = new GetObjectCommand({ Bucket: BUCKET, Key: key });
        return getSignedUrl(s3, command, { expiresIn: 900 });
      })
    );

    return { presignedUrls };
  } catch (error) {
    console.log({ error });
    return { error };
  }
};

module.exports = { UploadToS3, getPresignedUrl };
