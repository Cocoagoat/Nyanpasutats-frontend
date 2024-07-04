import TableHead from "@/components/general/TableHead";
import React from "react";
import styles from "@/app/globals.module.css";
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
      className={`mb-10 max-h-[300px]  overflow-y-scroll xl:mb-0 ${styles.hiddenscrollbar}`}
    >
      <table className="w-[400px] min-w-[400px] max-w-[400px]">
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
              <td
                className={`p-2 text-center font-semibold ${
                  least_fav || index > 2
                    ? "text-white"
                    : index == 0
                      ? "text-amber-400"
                      : index == 1
                        ? " text-slate-400"
                        : "text-orange-600"
                }`}
              >
                {tag}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
