import React, { useState } from "react";
import BestX from "./BestX";
import BestXImages from "./BestXImages";
import { RiArrowDownDoubleFill } from "react-icons/ri";
import CollapseToggle from "./CollapseToggle";
import useToast from "@/hooks/useToast";

export default function BestX2({
  rows,
  worstImagesNotEmpty,
  setWorstImagesNotEmpty,
}: {
  rows: number;
  worstImagesNotEmpty: boolean[];
  setWorstImagesNotEmpty: (value: boolean[]) => void;
}) {
  //   const [rows, setRows] = useState(1);
  const { notifyError } = useToast();
  //   const [worstImagesNotEmpty, setWorstImagesNotEmpty] = useState<boolean[]>(
  //     Array.from({ length: rows }).map(() => true),
  //   );

  function handleEmptyWorstImages(rowNum: number, value: boolean) {
    const newWorstImagesNotEmpty = [...worstImagesNotEmpty];
    newWorstImagesNotEmpty[rowNum] = value;
    setWorstImagesNotEmpty(newWorstImagesNotEmpty);
  }

  //   function handleAddNewRow() {
  //     if (rows < 4) {
  //       setRows((prev) => prev + 1);
  //     } else {
  //       notifyError("A maximum of four rows are allowed.");
  //     }
  //   }
  console.log("WorstImagesNotEmpty inside BestX is", worstImagesNotEmpty);

  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <>
          <BestXImages
            type="Worst"
            rowNum={i}
            setWorstImagesNotEmpty={handleEmptyWorstImages}
          />
          <BestXImages
            type="Best"
            rowNum={i}
            worstImagesNotEmpty={worstImagesNotEmpty[i]}
          />
        </>
      ))}
      {/* <CollapseToggle
        onClick={handleAddNewRow}
        IconComponent={RiArrowDownDoubleFill}
        text="Add Row"
      /> */}
    </>
  );
}
