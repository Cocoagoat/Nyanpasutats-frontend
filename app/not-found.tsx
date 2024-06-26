import Link from "next/link";
import GenericError from "@/components/general/GenericError";

function NotFound() {
  return (
    <GenericError errorMessage="This page does not exist. Please try again." />
  );
}

export default NotFound;
