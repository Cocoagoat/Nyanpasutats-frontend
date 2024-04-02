import TableHead from "@/components/general/TableHead";
import React from "react";
import styles from "./RecsBox.module.css";

export default function TagRanking({
  tags,
  least_fav,
}: {
  tags: string[];
  least_fav?: boolean;
}) {
  const col_name = least_fav ? "Least Favorite Tags" : "Favorite Tags";
  return (
    <div
      className={`max-h-[300px] overflow-y-scroll ${styles.hiddenscrollbar}`}
    >
      <table>
        <TableHead
          columnNames={["Rank", col_name]}
          extraStyles="bg-gradient-to-tr from-lime-800"
        />
        <tbody>
          {tags.map((tag, index) => (
            <tr
              className={` ${index % 2 == 0 ? " bg-gradient-to-br from-blue-970" : " bg-opacity-10 bg-gradient-to-tr from-lime-800"}`}
            >
              <td className="p-2 text-center font-extrabold">{index + 1}</td>
              <td className="p-2 font-semibold">{tag}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
