import GenericError from "@/components/general/GenericError";
import { Nav } from "@/components/general/Nav";
import { getUploadedImage } from "@/app/actions/getUploadedImage";

export default async function page({
  params,
}: {
  params: { imageID: string };
}) {
  try {
    const data = await getUploadedImage(params.imageID);
    
    if (!data?.url) {
      return <GenericError errorMessage={data.error} />;
    }

    return (
      <>
        <Nav />
        <img
          className="absolute left-1/2 top-1/2 h-[40vw] -translate-x-1/2 -translate-y-1/2"
          src={data["url"]}
        />
      </>
    );
  } catch (e : any) {
    return <GenericError errorMessage={e.message} />;
  }
}