import React from "react";
import SettingsButton from "@/components/general/SettingsButton";

export default function SeasonalGraphDropdown({
  setGraphOpen,
}: {
  setGraphOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="relative">
      <SettingsButton onClick={() => setGraphOpen(true)}>Graph</SettingsButton>
    </div>
  );
}
