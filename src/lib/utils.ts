import imageCompression from "browser-image-compression";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateSlug(text: string) {
  return text
    .replace(/\s/g, "")
    .replace(/[!@#$%^&*()_+\-=[\]{};':"\\|,ˆ.<>/?]+/, "")
    .toLocaleLowerCase();
}

export async function compressImage(image: File) {
  return new Promise((resolve, _reject) => {
    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 900,
      useWebWorker: true,
      fileType: "image/jpeg",
    };

    imageCompression(image, options).then((result) => {
      resolve(result);
    });
  });
}
