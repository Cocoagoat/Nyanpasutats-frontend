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

export async function downloadCardAsImage(cardId: string, imageName: string) {
  const cardElement = document.getElementById(cardId);
  if (cardElement) {
    htmlToImage
      .toPng(cardElement, { pixelRatio: 2 })
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
    try {
      const dataUrl = await htmlToImage.toPng(cardElement, { pixelRatio: 2 });
      const blob = await (await fetch(dataUrl)).blob();
      const clipboardItem = new ClipboardItem({ "image/png": blob });
      await navigator.clipboard.write([clipboardItem]);
      console.log("Image copied to clipboard");
    } catch (error) {
      console.error("Could not generate image", error);
    }
  } else {
    console.error("Element not found");
  }
}
