import { storage } from "@/firebase";
import { clsx, type ClassValue } from "clsx";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(isoString: string) {
  return new Date(isoString).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export const pageSize = 10;

export const handleUpload = async (dataUrl: string): Promise<string> => {
  try {
    // Convert data URL to blob
    const response = await fetch(dataUrl);
    const blob = await response.blob();

    // Create a unique filename with timestamp
    const filename = `profile-images/${Date.now()}.jpg`;
    const storageRef = ref(storage, filename);

    // Upload the blob to Firebase Storage
    const snapshot = await uploadBytes(storageRef, blob, {
      contentType: "image/jpeg", // Set content type
    });

    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Upload failed");
  }
};
