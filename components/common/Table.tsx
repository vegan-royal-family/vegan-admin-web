import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useRowSelect, usePagination, useTable, Column } from "react-table";
import PerfectScrollbar from "react-perfect-scrollbar";
import Icon from "components/common/Icon";
import Pagination from "./Pagination";
import Checkbox from "./Checkbox";
import theme from "styles/theme";

// typeFilterButtonOptions
// searchOptions
// filterOptions
type SortOptionType = {
  id: string;
  isDesc: boolean;
};

type TablePropsType = {
  id: string;
  columns: Array<Column<object>>;
  data: Array<object>;
  disablePagination?: boolean;
  useSelection?: boolean;
  fetchData?: (
    sortOption?: SortOptionType,
    filterOption?: object
  ) => Array<object>;
};

const SortIcon = ({ isSortColumn, sortOption }) => {
  // TODO: 정렬 아이콘 바꿔야 함
  return (
    <Icon
      className="sort-icon"
      icon={isSortColumn ? (sortOption?.isDesc ? "down" : "up") : "up"}
      size="xs"
    />
  );
};

export default function Table({
  id: tableId,
  columns,
  data = [],
  disablePagination = false,
  useSelection = false,
  fetchData,
}: TablePropsType) {
  const [tableData, setTableData] = useState<Array<object>>(data);
  const [sortOption, setSortOption] = useState<SortOptionType>({
    isDesc: false,
    id: null,
  });

  const pushVisibleColumns = (hooks) => {
    const checkboxColumn = {
      id: "selection",
      Header: ({ getToggleAllRowsSelectedProps }) => {
        return (
          <div>
            <Checkbox
              id={`${tableId}-selection-header`}
              {...getToggleAllRowsSelectedProps()}
            />
          </div>
        );
      },
      Cell: ({ row }) => {
        return (
          <div>
            <Checkbox
              id={`row-${row.id}`}
              {...row.getToggleRowSelectedProps()}
            />
          </div>
        );
      },
      options: {
        width: "100px",
        headerAlign: "center",
        cellAlign: "center",
      },
    };

    hooks.visibleColumns.push((columns) => {
      const visibleColumns = [...columns];
      // checkbox 컬럼을 사용하는 경우, 테이블 컬럼 리스트 맨 앞에 checkbox 컬럼을 추가함
      if (useSelection) {
        visibleColumns.unshift(checkboxColumn);
      }
      return visibleColumns;
    });
  };

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
    // selectedFlatRows,
    state: { pageIndex, pageSize, selectedRowIds },
  } = useTable(
    {
      columns,
      data: tableData,
      initialState: { pageIndex: 0 },
    },
    usePagination,
    useRowSelect,
    pushVisibleColumns
  );

  useEffect(() => {
    if (sortOption?.id) {
      if (typeof fetchData === "function") {
        const sortedList = fetchData(sortOption);
        setTableData(sortedList);
      }
    }
  }, [sortOption]);

  return (
    <TableStyles>
      <PerfectScrollbar>
        <div className="table-wrap">
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

                      const useSort = column?.options?.useSort;
                      const isSortColumn = column.id === sortOption?.id;

                      return (
                        <TableHeaderTh
                          headerAlign={column?.options?.headerAlign}
                          width={column?.options?.width}
                          {...column.getHeaderProps()}
                        >
                          {useSort ? (
                            <span
                              className={
                                isSortColumn
                                  ? "active-sort-column"
                                  : "inactive-sort-column"
                              }
                              onClick={() => {
                                setSortOption((value) => {
                                  return {
                                    id: column.id,
                                    isDesc: isSortColumn
                                      ? !value?.isDesc
                                      : false,
                                  };
                                });
                              }}
                            >
                              {!column?.options?.headerAlign && header}
                              <SortIcon
                                sortOption={sortOption}
                                isSortColumn={isSortColumn}
                              />
                              {column?.options?.headerAlign === "flex-end" &&
                                header}
                            </span>
                          ) : (
                            <span>{header}</span>
                          )}
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
                          cellAlign={cell?.column?.options?.cellAlign}
                          width={cell?.column?.options?.width}
                          {...cell.getCellProps()}
                        >
                          <span>{cellData}</span>
                        </TableBodyTd>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </PerfectScrollbar>
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

const TableStyles = styled.div<{ tableMaxHeight?: string | number }>`
  /* This is required to make the table full-width */
  display: block;
  max-width: 100%;

  /* This will make the table scrollable when it gets too small */
  .table-wrap {
    display: block;
    max-width: 100%;
    // TODO: Row가 10개 이상 보일 때 y 스크롤 되도록 설정. 추후 수정 될 수 있음.
    max-height: ${(props) =>
      props.tableMaxHeight ? props.tableMaxHeight : "565px"};
  }

  table {
    width: 100%;
    border-spacing: 0;
  }

  thead {
    th:not(:last-child) {
      //position: relative;
      & > span {
        &::before {
          content: "";
          position: absolute;
          top: 50%;
          inset-inline-end: 0;
          width: 1px;
          height: 1.6rem;
          transform: translateY(-50%);
          background-color: ${theme.palette.colors.gray[300]};
        }
      }
    }
  }
`;

const TableHeaderTh = styled.th<{
  headerAlign?: string;
  width?: string | number;
}>`
  ${theme.typography.body3}
  ${theme.typography.weightMedium}

  position: sticky;
  top: 0;
  z-index: 2;
  margin: 0;
  padding: 16px;
  white-space: nowrap;
  box-sizing: border-box;
  background: ${theme.palette.colors.gray[100]};
  border-bottom: 1px solid ${theme.palette.colors.gray[300]};
  width: ${(p) => p?.width};

  span {
    display: flex;
    width: 100%;
    justify-content: ${(p) => (p.headerAlign ? p.headerAlign : "flex-start")};
  }

  .inactive-sort-column {
    user-select: none;
    svg {
      margin: 0 4px;
      path {
        fill: transparent;
      }
    }
    &:hover {
      cursor: pointer;
      color: ${theme.palette.colors.gray[500]};
      svg {
        path {
          fill: ${theme.palette.colors.gray[500]};
        }
      }
    }
  }

  .active-sort-column {
    user-select: none;
    svg {
      margin: 0 4px;
      path {
        fill: #000;
      }
    }
    &:hover {
      cursor: pointer;
    }
  }
`;

const TableBodyTd = styled.td<{
  cellAlign?: string;
  width?: string | number;
}>`
  ${theme.typography.body3}

  margin: 0;
  padding: 12px 16px;
  box-sizing: border-box;
  white-space: nowrap;
  border-bottom: 1px solid ${theme.palette.colors.gray[300]};
  width: ${(p) => p?.width};

  span {
    display: flex;
    width: 100%;
    justify-content: ${(p) => (p.cellAlign ? p.cellAlign : "flex-start")};
  }
`;
