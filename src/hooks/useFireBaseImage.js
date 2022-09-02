import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
export default function useFirebaseImage(
  setValue,
  getValues,
  imageName = null,
  cb = null
) {
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState("");
  const handleUploadImage = (file) => {
    const storage = getStorage();
    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progressPecent =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progressPecent);
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            console.log("nothing at all");
        }
      },
      (error) => {
        console.log("error");
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImage(downloadURL);
        });
      }
    );
  };
  const handleSelectImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setValue("image_name", file.name);
    handleUploadImage(file);
  };
  const handleDeleteImage = () => {
    const storage = getStorage();

    const desertImageRef = ref(
      storage,
      "images/" + (imageName || getValues("image_name"))
    );

    deleteObject(desertImageRef)
      .then(() => {
        console.log("delete successfully");
        setProgress(0);
        setImage("");
        cb && cb();
      })
      .catch((error) => {
        console.log("delete fail");
      });
  };

  return {
    progress,
    image,
    setImage,
    setProgress,
    handleDeleteImage,
    handleSelectImage,
  };
}
