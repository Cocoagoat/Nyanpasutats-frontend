import { RiArrowDownDoubleFill, RiArrowUpDoubleFill } from "react-icons/ri";
import CollapseToggle from "./CollapseToggle";

export default function BestXRowToggle({
  currentRows,
  handleAddNewRow,
  handleRemoveLastRow,
}: {
  currentRows: number;
  handleAddNewRow: () => void;
  handleRemoveLastRow: () => void;
}) {
  return (
    <>
      {currentRows > 0 && (
        <CollapseToggle
          onClick={handleRemoveLastRow}
          IconComponent={RiArrowUpDoubleFill}
          text="Delete Row"
          alwaysVisible={true}
        />
      )}
      {currentRows < 4 && (
        <CollapseToggle
          onClick={handleAddNewRow}
          IconComponent={RiArrowDownDoubleFill}
          text="Add Row"
          alwaysVisible={true}
        />
      )}
    </>
  );
}
