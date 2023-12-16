"use client";
import UsernameButton from "@/components/general/UsernameButton";
import Link from "next/link";
import React, { useState } from "react";
import { RecommendationType } from "@/app/interfaces";

export default function RecsPage() {
  const [userName, setUserName] = useState(
    sessionStorage.getItem("username") || ""
  );

  function handleEnterUsername(e: React.ChangeEvent<HTMLInputElement>) {
    setUserName(e.target.value);
    sessionStorage.setItem("username", e.target.value);
  }

  return (
    <div className="relative top-1/2 left-1/3">
      <div className="flex gap-20">
        <input
          type="text"
          value={userName}
          placeholder="Enter your MAL username"
          // onChange={(e) => setUserName(e.target.value)}
          onChange={handleEnterUsername}
          className="block grow rounded-l-lg p-2.5 outline-none max-w-md"
          required
        ></input>
        <Link href={`/recs/${userName}`}>
          <UsernameButton>Get Recommendations</UsernameButton>
        </Link>
      </div>
    </div>
  );
}
