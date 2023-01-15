import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useRowSelect, usePagination, useTable } from "react-table";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useTheme } from "@emotion/react";
import Icon from "components/common/Icon";
import Pagination from "./Pagination";

// typeFilterButtonOptions
// searchOptions
// filterOptions
type SortOptionType = {
  id: string;
  isDesc: boolean;
};

type TablePropsType = {
  columns: Array<any>;
  data: Array<any>;
  disablePagination?: boolean;
  fetchData: (sortOption?: SortOptionType, filterOption?: any) => Array<any>;
};

// TODO: useTable에서 가져오는 값 타입 정의
type TableHookPropsType = {};

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
  columns,
  data = [],
  disablePagination = false,
  fetchData,
}: TablePropsType) {
  const theme = useTheme();
  const [sortOption, setSortOption] = useState<{
    isDesc: boolean;
    id: string;
  }>({
    isDesc: false,
    id: null,
  });
  const [tableData, setTableData] = useState(data);

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
      data: tableData,
      initialState: { pageIndex: 0 },
    },
    usePagination,
    useRowSelect
    // TODO: Checkbox 컴포넌트 구현 후 테이블에 체크박스 넣을 예정
    // (hooks) => {
    //   hooks.visibleColumns.push((columns) => [
    //     {
    //       id: "selection",
    //       Header: ({ getToggleAllRowsSelectedProps }) => (
    //         <div>
    //           <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
    //         </div>
    //       ),
    //       Cell: ({ row }) => (
    //         <div>
    //           <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
    //         </div>
    //       ),
    //     },
    //     ...columns,
    //   ]);
    // }
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
    <TableStyles theme={theme}>
      <PerfectScrollbar>
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

                      const enableSort = !column?.options?.disableSort;
                      const isSortColumn = column.id === sortOption?.id;

                      return (
                        <TableHeaderTh
                          headerAlign={column?.options?.headerAlign}
                          width={column?.options?.width}
                          {...column.getHeaderProps()}
                        >
                          {enableSort ? (
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
  border: 1px solid ${(props) => props.theme.palette.colors.gray[300]};

  /* This will make the table scrollable when it gets too small */
  .tableWrap {
    display: block;
    max-width: 100%;
    // TODO: Row가 10개 이상 보일 때 y 스크롤 되도록 설정. 추후 수정 될 수 있음.
    max-height: ${(props) =>
      props.tableMaxHeight ? props.tableMaxHeight : "515px"};
  }

  table {
    width: 100%;
    border-spacing: 0;
  }
`;

const TableHeaderTh = styled.th<{
  headerAlign?: string;
  width?: string | number;
}>`
  ${(p) => p.theme.typography.body3}
  ${(p) => p.theme.typography.weightMedium}

  position: sticky;
  top: 0;
  z-index: 2;
  margin: 0;
  padding: 10px;
  white-space: nowrap;
  box-sizing: border-box;
  background-color: #fff;
  border-bottom: 1px solid ${(p) => p.theme.palette.colors.gray[300]};
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
      color: ${(p) => p.theme.palette.colors.gray[500]};
      svg {
        path {
          fill: ${(p) => p.theme.palette.colors.gray[500]};
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
  ${(p) => p.theme.typography.body3}

  margin: 0;
  padding: 10px;
  box-sizing: border-box;
  white-space: nowrap;
  border-bottom: 1px solid ${(p) => p.theme.palette.colors.gray[300]};
  text-align: ${(p) => (p.cellAlign ? p.cellAlign : "start")};
  width: ${(p) => p?.width};
`;

// const IndeterminateCheckbox = React.forwardRef<HTMLInputElement>(
//   (
//     { indeterminate, ...rest }: { indeterminate: boolean },
//     ref: React.MutableRefObject<HTMLInputElement | null>
//   ) => {
//     const defaultRef = React.useRef<HTMLInputElement | null>();
//     const resolvedRef = ref || defaultRef;

//     React.useEffect(() => {
//       resolvedRef.current.indeterminate = indeterminate;
//     }, [resolvedRef, indeterminate]);

//     return (
//       <>
//         <input type="checkbox" ref={resolvedRef} {...rest} />
//       </>
//     );
//   }
// );
