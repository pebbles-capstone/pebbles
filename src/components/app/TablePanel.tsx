import { useState } from "react";
import { Button } from "../../atoms/Button";
import { ContentBox } from "./ContentBox";

interface TablePanelProps {
  title: string;
  columns: string[];
  rows: string[][];
  customGridStyle?: string;
}

export const TablePanel: React.FC<TablePanelProps> = (props) => {
  const { title, columns, rows, customGridStyle } = props;
  const [detailedViewOpen, setDetailedViewOpen] = useState(false);
  const [rowInDetail, setRowInDetail] = useState<string[] | null>(null);

  let tableStyles = `grid
    ${columns.length === 2 ? "grid-cols-2" : ""}
    ${columns.length === 3 ? "grid-cols-3" : ""}
    ${columns.length === 4 ? "grid-cols-4" : ""}
    ${columns.length === 5 ? "grid-cols-5" : ""}
    ${columns.length === 6 ? "grid-cols-6" : ""}
  `;

  const openDetailedView = (row: string[]) => {
    setRowInDetail(row);
    setDetailedViewOpen(true);
  };

  const closeDetailedView = () => {
    setDetailedViewOpen(false);
    setRowInDetail(null);
  };

  return (
    <>
      <div
        className={`${
          detailedViewOpen ? "flex" : "hidden"
        } w-screen h-screen bg-black bg-opacity-80 z-50 fixed top-0 left-0 flex-col justify-center items-center p-6`}
        onClick={closeDetailedView}
      >
        {rowInDetail && (
          <ContentBox title={rowInDetail[1]} className="max-w-2xl">
            <p className="mb-4">
              <span className="text-grey-darker">Rank: </span>
              {rowInDetail[0]}
            </p>
            <p className="mb-4">
              <span className="text-grey-darker">Supervisor: </span>
              {rowInDetail[2]}
            </p>
            <p className="text-grey-darker">Description:</p>
            <p>{rowInDetail[3]}</p>
          </ContentBox>
        )}
        <Button
          text="Return to all projects"
          size="sm"
          ariaLabel="Close modal and return to all projects"
          isLink={false}
          isInternal={false}
          onClick={closeDetailedView}
          style="border-primary"
          className="pointer-events-auto shadow-md mt-8"
        />
      </div>
      <div className="w-full p-6 flex flex-col bg-white rounded-md shadow-md overflow-x-auto">
        <h2 className="text-md font-medium mb-4">{title}</h2>
        <div className="w-full flex flex-col min-w-45rem">
          <div
            className={`TablePanel w-full grid ${
              customGridStyle ? customGridStyle : tableStyles
            }`}
          >
            {["Rank", ...columns].map((column) => {
              return (
                <div key={column} className="border-b pb-4">
                  <h3 className="font-medium">{column}</h3>
                </div>
              );
            })}
          </div>
          {rows.map((row, i) => {
            row = [(i + 1).toString(), ...row];
            return (
              <div
                key={`${title}-row-${i}`}
                className={`TablePanel w-full grid transition-colors odd:bg-slate even:bg-white hover:bg-slate-dark cursor-pointer ${
                  customGridStyle ? customGridStyle : tableStyles
                }`}
              >
                {row.map((value) => {
                  let displayValue = value.slice(0, 250);
                  if (value.length > 250) displayValue += "...";
                  return (
                    <div
                      key={value}
                      className="border-b border-slate py-4 bg-transparent"
                      onClick={() => openDetailedView(row)}
                    >
                      <p>{displayValue}</p>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
