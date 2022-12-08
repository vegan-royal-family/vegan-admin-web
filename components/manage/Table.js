import React from "react";
import styled from "@emotion/styled";
import { useRowSelect, usePagination, useTable } from "react-table";

const defaultPageGroupCount = 4;

export const range = (len) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const Pagination = (props) => {
  const {
    gotoPage,
    pageCount,
    pageIndex,
    canPreviousPage,
    previousPage,
    canNextPage,
    nextPage,
  } = props;

  const isArrangeView = pageCount <= defaultPageGroupCount + 3;
  const lastPageIndex = pageCount - 1;
  const prevPageIndexList = [];
  const nextPageIndexList = [];

  if (pageIndex < defaultPageGroupCount) {
    const maxIndex = defaultPageGroupCount;
    const minIndex = 1;
    for (let prevIndex = pageIndex - 1; minIndex <= prevIndex; prevIndex--) {
      prevPageIndexList.unshift(prevIndex);
    }
    for (let nextIndex = pageIndex + 1; nextIndex <= maxIndex; nextIndex++) {
      nextPageIndexList.push(nextIndex);
    }
  } else if (pageIndex > lastPageIndex - defaultPageGroupCount) {
    const maxIndex = lastPageIndex - 1;
    const minIndex = lastPageIndex - defaultPageGroupCount;
    for (let prevIndex = pageIndex - 1; minIndex <= prevIndex; prevIndex--) {
      prevPageIndexList.unshift(prevIndex);
    }
    for (let nextIndex = pageIndex + 1; nextIndex <= maxIndex; nextIndex++) {
      nextPageIndexList.push(nextIndex);
    }
  } else {
    prevPageIndexList.push(pageIndex - 1);
    nextPageIndexList.push(pageIndex + 1);
  }

  return (
    <>
      <button
        className="arrowBtn"
        onClick={() => previousPage()}
        disabled={!canPreviousPage}
      >
        {"<"}
      </button>
      {isArrangeView ? (
        <div className="indexBtnGroup">
          {range(pageCount).map((index) => {
            const selectedStyle =
              pageIndex === index ? "selectedPageIndex" : "";
            return (
              <button
                key={index}
                className={`indexItem ${selectedStyle}`}
                onClick={() => gotoPage(index)}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
      ) : (
        <div className="indexBtnGroup">
          {pageIndex === 0 ? (
            <div className="indexItem selectedPageIndex">1</div>
          ) : (
            <button className="indexItem" onClick={() => gotoPage(0)}>
              1
            </button>
          )}
          {pageIndex >= defaultPageGroupCount && (
            <span style={{ padding: "0 4px" }}>...</span>
          )}
          {prevPageIndexList.map((index) => {
            return (
              <button
                key={index}
                className="indexItem"
                onClick={() => gotoPage(index)}
              >
                {index + 1}
              </button>
            );
          })}
          {pageIndex > 0 && pageIndex < lastPageIndex && (
            <div className="indexItem selectedPageIndex">{pageIndex + 1}</div>
          )}
          {nextPageIndexList.map((index) => {
            return (
              <button
                key={index}
                className="indexItem"
                onClick={() => gotoPage(index)}
              >
                {index + 1}
              </button>
            );
          })}
          {pageIndex < pageCount - defaultPageGroupCount && (
            <span style={{ padding: "0 4px" }}>...</span>
          )}
          {pageIndex === pageCount - 1 ? (
            <div className="indexItem selectedPageIndex">{pageCount}</div>
          ) : (
            <button
              className="indexItem"
              onClick={() => gotoPage(pageCount - 1)}
            >
              {pageCount}
            </button>
          )}
        </div>
      )}
      <button
        className="arrowBtn"
        onClick={() => nextPage()}
        disabled={!canNextPage}
      >
        {">"}
      </button>
    </>
  );
};

export default function Table({
  columns,
  data,
  disablePagination = false,
  typeFilterButtonOptions,
  searchOptions,
  filterOptions,
}) {
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

  // Render the UI for your table
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
        <div className="pagination">
          <div style={{ flex: 1 }}>
            <span style={{ paddingRight: 16 }}>
              Page {pageIndex + 1} of {pageOptions.length}
            </span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
          <Pagination
            {...{
              gotoPage,
              previousPage,
              nextPage,
              canPreviousPage,
              canNextPage,
              pageCount,
              pageIndex,
            }}
          />
          <span style={{ marginLeft: 16 }}>
            Go to page
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              style={{ marginLeft: 8, width: "40px" }}
            />
          </span>
        </div>
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

  .pagination {
    display: flex;
    align-items: center;
    padding: 16px;
    .indexItem {
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: "Spoqa Han Sans Neo", "sans-serif";
      font-size: 14px;
      width: 24px;
      height: 24px;
      background: transparent;
      border: none;
      padding: 0;
      margin: 0 2px;
      border-radius: 50%;
      cursor: pointer;
      user-select: none;
    }
    .arrowBtn {
      border: none;
      background: transparent;
      cursor: pointer;
      user-select: none;
    }
  }

  .indexBtnGroup {
    display: flex;
    align-items: center;
  }

  .selectedPageIndex {
    background: rgba(0, 0, 0, 0.6) !important;
    color: #fff;
    font-weight: 500;
    border-radius: 50%;
    margin: 0 2px;
    user-select: none;
    cursor: auto !important;
  }

  table {
    /* Make sure the inner table is always as wide as needed */
    width: 100%;
    border-spacing: 0;
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

const TableHeaderTh = styled.th`
  border-bottom: 1px solid rgba(224, 224, 224, 1);
  font-weight: 500 !important;
  margin: 0;
  padding: 10px;
  text-align: ${(props) => (props.textAlign ? props.textAlign : "center")};
  white-space: nowrap;
  box-sizing: border-box;
  width: ${(props) => props?.width};
`;

const TableBodyTd = styled.td`
  margin: 0;
  padding: 5px 10px;
  box-sizing: border-box;
  text-align: ${(props) => (props.textAlign ? props.textAlign : "center")};
  white-space: nowrap;
`;

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
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
