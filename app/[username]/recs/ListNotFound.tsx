import React from "react";

export default function ListNotFound(errorMessage: { errorMessage: string }) {
  return <div>{errorMessage.errorMessage}</div>;
}
