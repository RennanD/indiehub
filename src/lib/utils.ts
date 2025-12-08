import imageCompression from "browser-image-compression";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { TRIAL_DAYS } from "./config";

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

export function isTrialPeriod(date: number) {
  return (
    new Date(date).getTime() >
      new Date().getTime() - 1000 * 60 * 60 * 24 * TRIAL_DAYS || false
  );
}
