import React from "react";
import styled from "@emotion/styled";
import { useRowSelect, usePagination, useTable } from "react-table";
import Pagination from "./Pagination";

type TablePropsType = {
  columns: Array<any>;
  data: Array<any>;
  disablePagination?: boolean;
};

//typeFilterButtonOptions
//searchOptions
//filterOptions

export default function Table({
  columns,
  data,
  disablePagination = false,
}: TablePropsType) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    selectedFlatRows,
    state: { pageIndex, pageSize, selectedRowIds },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );

  return (
    <TableStyles>
      <div className="tableWrap">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => {
              return (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => {
                    let header = column.render("Header");
                    if (typeof column?.headerRender === "function") {
                      header = column?.headerRender();
                    }
                    return (
                      <TableHeaderTh
                        textAlign={column?.options?.align}
                        width={column?.options?.width}
                        {...column.getHeaderProps()}
                      >
                        {header}
                      </TableHeaderTh>
                    );
                  })}
                </tr>
              );
            })}
          </thead>
          <tbody {...getTableBodyProps()}>
            {(disablePagination ? rows : page).map((row, _index) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    let cellData = cell.render("Cell");
                    if (typeof cell.column?.cellRender === "function") {
                      const rowValues = cell.row?.original;
                      cellData = cell.column?.cellRender(rowValues);
                    }
                    return (
                      <TableBodyTd
                        textAlign={cell?.column?.options?.align}
                        {...cell.getCellProps()}
                      >
                        {cellData}
                      </TableBodyTd>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {!disablePagination && pageCount > 1 && (
        <Pagination
          {...{
            gotoPage,
            previousPage,
            nextPage,
            canPreviousPage,
            canNextPage,
            pageCount,
            pageIndex,
            pageOptions,
            pageSize,
            setPageSize,
          }}
        />
      )}
    </TableStyles>
  );
}

const TableStyles = styled.div`
  /* This is required to make the table full-width */
  display: block;
  max-width: 100%;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
    0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);

  /* This will make the table scrollable when it gets too small */
  .tableWrap {
    display: block;
    max-width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    border-bottom: 1px solid rgba(224, 224, 224, 1);
  }

  table {
    /* Make sure the inner table is always as wide as needed */
    width: 100%;
    border-spacing: 0;
  }

  tbody {
    display: block;
    max-height: 360px;
  }

  tbody tr,
  thead tr {
    display: table;
    width: 100%;
    table-layout: fixed;
  }

  tbody:before {
    content: "-";
    display: block;
    line-height: 5px;
    color: transparent;
  }

  tbody:after {
    content: "-";
    display: block;
    line-height: 5px;
    color: transparent;
  }
`;

const TableHeaderTh = styled.th<{ textAlign: string; width: string | number }>`
  border-bottom: 1px solid rgba(224, 224, 224, 1);
  font-size: 14px;
  font-weight: 500;
  margin: 0;
  padding: 10px;
  text-align: ${(props) => (props.textAlign ? props.textAlign : "center")};
  white-space: nowrap;
  box-sizing: border-box;
  width: ${(props) => props?.width};
`;

const TableBodyTd = styled.td<{ textAlign: string }>`
  margin: 0;
  padding: 5px 10px;
  font-size: 14px;
  box-sizing: border-box;
  text-align: ${(props) => (props.textAlign ? props.textAlign : "center")};
  white-space: nowrap;
`;

const IndeterminateCheckbox = React.forwardRef<HTMLInputElement>(
  (
    { indeterminate, ...rest }: { indeterminate: boolean },
    ref: React.MutableRefObject<HTMLInputElement | null>
  ) => {
    const defaultRef = React.useRef<HTMLInputElement | null>();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    );
  }
);
