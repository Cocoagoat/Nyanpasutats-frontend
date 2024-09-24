import { AffTableType, AffinityData } from "@/app/interfaces";
import TableHead from "@/components/general/TableHead";
import AffRow from "./AffRow";
import AffTableHeader from "./AffTableHeader";
import styles from "./Affinity.module.css";

export default function AffTable({
  aff_data,
  type,
}: {
  aff_data: AffinityData[];
  type: AffTableType;
}) {
  const columnNames = ["", "Username", "Affinity", "Shared Anime"];

  return (
    <div
      className={`relative mt-20 max-h-[1000px] overflow-y-scroll  lg:mt-0 
      ${styles.hiddenscrollbar} `}
    >
      <AffTableHeader type={type} />
      <table className="lg:mt-10">
        <TableHead columnNames={columnNames} />
        <tbody>
          {aff_data.map((aff, index) => (
            <AffRow index={index + 1} aff={aff} key={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
