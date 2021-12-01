import { Button } from "../../atoms/Button";

interface TablePanelProps {
  title: string;
  columns: string[];
  rows: string[][];
}

export const TablePanel: React.FC<TablePanelProps> = (props) => {
  const { title, columns, rows } = props;

  let tableStyles = `grid
    ${columns.length === 2 ? "grid-cols-2" : ""}
    ${columns.length === 3 ? "grid-cols-3" : ""}
    ${columns.length === 4 ? "grid-cols-4" : ""}
    ${columns.length === 5 ? "grid-cols-5" : ""}
    ${columns.length === 6 ? "grid-cols-6" : ""}
  `;

  return (
    <div className="w-full p-6 flex flex-col bg-white rounded-md shadow-md">
      <h2 className="text-md font-medium mb-4">{title}</h2>
      <div className={`w-full ${tableStyles}`}>
        {columns.map((column) => {
          return (
            <div key={column} className="border-b pb-2">
              <h3 className="font-medium">{column}</h3>
            </div>
          );
        })}
        {rows.map((row) => {
          return row.map((value) => {
            let displayValue = value.slice(0, 150);
            if (value.length > 150) displayValue += "...";
            return (
              <div key={value} className="border-b border-grey py-2">
                <p>{displayValue}</p>
              </div>
            );
          });
        })}
      </div>
    </div>
  );
};
