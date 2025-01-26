import * as htmlToImage from "html-to-image";

export async function downloadCardAsImage(cardId: string, imageName: string) {
  const cardElement = document.getElementById(cardId);
  if (cardElement) {
    // const aspectRatio = cardElement.offsetHeight / cardElement.offsetWidth;

    const dataUrl = await htmlToImage.toJpeg(cardElement, {
      quality: 0.8,
      pixelRatio: 1.8,
      backgroundColor: "#000000",
    });
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `${imageName}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  } else {
    return false;
  }
}

export async function copyCardAsImage(cardId: string) {
  // Can't use jpeg for copying due to no Clipboard support for it
  const cardElement = document.getElementById(cardId);
  if (cardElement) {
    try {
      const dataUrl = await htmlToImage.toPng(cardElement, {
        backgroundColor: "#000000",
        pixelRatio: 1.8,
      });
      const blob = await (await fetch(dataUrl)).blob();

      if (
        navigator.clipboard &&
        "write" in navigator.clipboard &&
        window.ClipboardItem
      ) {
        const clipboardItem = new ClipboardItem({ "image/png": blob });
        await navigator.clipboard.write([clipboardItem]);
        return true;
      } else {
        // Will not work on browsers that do not support ClipboardItem
        return false;
      }
    } catch (error) {
      return false;
    }
  } else {
    return false;
  }
}

export async function getImageShareUrl(
  cardId: string,
  imageName: string,
  imageType: "seasonalCard" | "tierList",
): Promise<boolean> {
  const cardElement = document.getElementById(cardId);
  if (!cardElement) {
    return false; // Return false if card element doesn't exist
  }

  try {
    // Generate the image as a PNG
    const dataUrl = await htmlToImage.toJpeg(cardElement, {
      quality: 0.8,
      pixelRatio: 1.8,
      backgroundColor: "#000000",
    });

    // Convert dataUrl to a Blob
    const blob = dataURLToBlob(dataUrl);

    // Create a File object
    const file = new File([blob], `${imageName}.png`, { type: "image/png" });

    // Use FormData to send the file
    const formData = new FormData();
    formData.append("image", file);
    formData.append("image_type", imageType);
    formData.append("image_name", imageName);

    // Upload the file to the backend
    const response = await fetch(
      "/inner-api/uploadImage",
      {
        method: "POST",
        body: formData,
      },
    );

    if (!response.ok) {
      return false; // Return false if the upload fails
    }

    const data = await response.json();
    if (!data.url) {
      return false; // Return false if no URL is received
    }

    // Copy the URL to the clipboard
    await navigator.clipboard.writeText(data.url);

    return true; // Return true if everything succeeds
  } catch (error) {
    return false; // Return false if any error occurs
  }
}

// Helper function to convert dataUrl to Blob
function dataURLToBlob(dataUrl: string): Blob {
  const byteString = atob(dataUrl.split(",")[1]);
  const mimeString = dataUrl.split(",")[0].split(":")[1].split(";")[0];

  const byteArray = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    byteArray[i] = byteString.charCodeAt(i);
  }

  return new Blob([byteArray], { type: mimeString });
}
