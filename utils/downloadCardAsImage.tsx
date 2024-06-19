import html2canvas from "html2canvas";
import * as htmlToImage from "html-to-image";

// export async function downloadCardAsImage2(cardId: string, imageName: string) {
//   const cardElement = document.getElementById(cardId);
//   if (cardElement) {
//     const canvas = await html2canvas(cardElement);
//     const image = canvas.toDataURL("image/png");
//     const link = document.createElement("a");
//     link.href = image;
//     link.download = `${imageName}.png`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   }
// }
const PROXY_URL = "http://localhost:8080/";
function getProxiedUrl(url: string) {
  return `${PROXY_URL}${url}`;
}

export async function downloadCardAsImage(cardId: string, imageName: string) {
  const cardElement = document.getElementById(cardId);
  if (cardElement) {
    const aspectRatio = cardElement.offsetHeight / cardElement.offsetWidth;

    htmlToImage
      .toPng(cardElement, {
        pixelRatio: 1.8,
        backgroundColor: "#000000",
      })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `${imageName}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("Could not generate image", error);
      });
  }
}

export async function copyCardAsImage(cardId: string) {
  const cardElement = document.getElementById(cardId);
  if (cardElement) {
    const aspectRatio = cardElement.offsetHeight / cardElement.offsetWidth;

    try {
      const dataUrl = await htmlToImage.toPng(cardElement, {
        backgroundColor: "#000000",
        pixelRatio: 1.8,
      });
      const blob = await (await fetch(dataUrl)).blob();

      // Check if ClipboardItem is supported
      if (
        navigator.clipboard &&
        "write" in navigator.clipboard &&
        window.ClipboardItem
      ) {
        const clipboardItem = new ClipboardItem({ "image/png": blob });
        await navigator.clipboard.write([clipboardItem]);
        console.log("Image copied to clipboard");
      } else {
        // Fallback for browsers that do not support ClipboardItem
        // Provide a link for the user to download the image
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "card-image.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        console.log("Image download link provided");
      }
    } catch (error) {
      console.error("Could not generate image", error);
    }
  } else {
    console.error("Element not found");
  }
}
