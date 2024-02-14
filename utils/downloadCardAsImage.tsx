import html2canvas from "html2canvas";
import * as htmlToImage from "html-to-image";

export async function downloadCardAsImage2(cardId: string, imageName: string) {
  const cardElement = document.getElementById(cardId);
  if (cardElement) {
    const canvas = await html2canvas(cardElement);
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = `${imageName}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export async function downloadCardAsImage(cardId: string, imageName: string) {
  const cardElement = document.getElementById(cardId);
  if (cardElement) {
    htmlToImage
      .toPng(cardElement)
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
