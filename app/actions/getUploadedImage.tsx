"use server";

export async function getUploadedImage(imageID: string): Promise<any> {
  "use server";
  const url = `https://nps.moe/api/fetch_infographic_img/?unique_id=${imageID}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      return { error: "Wrong image ID or image no longer exists." };
    }
    let data = (await res.text()) as any;
    data = JSON.parse(data);
    return { url: data["url"] };
  } catch (error: any) {
    return {
      error: `Something went wrong while fetching the image. 
        This might be an issue on our end - please try again later.`,
    };
  }
}