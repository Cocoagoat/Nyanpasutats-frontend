import GenericError from "@/components/general/GenericError";
import { Nav } from "@/components/general/Nav";

export default async function page({
  params,
}: {
  params: { imageID: string };
}) {
  const url = `http://localhost:8000/fetch_infographic_img/?unique_id=${params.imageID}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      return (
        <GenericError errorMessage="Wrong image ID or image no longer exists." />
      );
    }

    const data = await res.json();
    return (
      <>
        <Nav />
        <img
          className="absolute left-1/2 top-1/2 h-[40vw] -translate-x-1/2 -translate-y-1/2"
          src={data["url"]}
        />
      </>
    );
  } catch (err) {}
}
