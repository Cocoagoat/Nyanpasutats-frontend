import React from "react";

export default function AffUserLink({
  affinity,
  username,
}: {
  affinity: number;
  username: string;
}) {
  const userProfileLink = `https://myanimelist.net/profile/${username}`;
  return (
    <a
      className={`${
        affinity > 0
          ? "text-sky-550 visited:text-violet-400"
          : "text-red-500 visited:text-violet-400"
      } visited:text-violet-400  font-semibold`}
      href={userProfileLink}
      target="_blank"
      rel="noopener noreferrer"
    >
      {username}{" "}
    </a>
  );
}
