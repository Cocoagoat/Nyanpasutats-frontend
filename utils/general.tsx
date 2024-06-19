import useToast from "@/hooks/useToast";

const { notifyError } = useToast();
export function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

export const range = (start: number, stop: number, step: number) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

export function isImgurUrl(url: string) {
  try {
    const parsedUrl = new URL(url);
    return (
      parsedUrl.hostname === "imgur.com" ||
      parsedUrl.hostname.endsWith(".imgur.com")
    );
  } catch (e) {
    // If the URL is invalid, it will throw an error
    console.error("Invalid URL:", e);
    return false;
  }
}

export function isMyAnimeListUrl(url: string) {
  try {
    const parsedUrl = new URL(url);
    return (
      parsedUrl.hostname === "myanimelist.net" ||
      parsedUrl.hostname.endsWith(".myanimelist.net")
    );
  } catch (e) {
    // If the URL is invalid, it will throw an error
    console.error("Invalid URL:", e);
    return false;
  }
}

export function isUrlPartOfHost(url: string, hostname: string) {
  try {
    const parsedUrl = new URL(url);
    return (
      parsedUrl.hostname === hostname ||
      parsedUrl.hostname.endsWith("." + hostname)
    );
  } catch (e) {
    // If the URL is invalid, it will throw an error
    console.error("Invalid URL:", e);
    return false;
  }
}

export function isUrlPartOfHosts(url: string, hostnames: string[]) {
  return hostnames.some((hostname) => isUrlPartOfHost(url, hostname));
}

export function handleNewImageUrl2(newImageUrl: string, onUpload: any) {
  console.log("New image URL is", newImageUrl);
  const allowedHosts = ["imgur.com", "myanimelist.net", "anilist.co"];
  if (!isUrlPartOfHosts(newImageUrl, allowedHosts)) {
    notifyError(
      `The site currently supports images from the following sites :

    - Imgur
    - MyAnimeList
    - Anilist
    
    If your image is from another site, please upload it to Imgur and try again.`,
      undefined,
      15000,
    );
    return;
  }
  console.log("Got past error check");

  onUpload();
}

export function isFirefox() {
  return /firefox/i.test(navigator.userAgent);
}

export function hexToRgb(hex: string) {
  // Remove the hash at the start if it's there
  hex = hex.replace(/^#/, "");

  // Parse the r, g, b values
  let bigint = parseInt(hex, 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;

  return `${r},${g},${b}`;
}
