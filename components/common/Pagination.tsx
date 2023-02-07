import range from "utils/range";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Icon from "components/common/Icon";
import theme from "styles/theme";

const defaultPageGroupCount = 4;
const defaultPageSizeOptions = [10, 20, 30, 40, 50];

const PageIndexGroup = ({
  isArrangeView,
  lastPageIndex,
  prevPageIndexList,
  nextPageIndexList,
  pageIndex,
  pageCount,
  gotoPage,
}) => {
  return (
    <>
      {isArrangeView ? (
        <div className="indexBtnGroup">
          {range(pageCount).map((index) => {
            const selectedStyle =
              pageIndex === index ? "selectedPageIndex" : "";
            return (
              <button
                key={index}
                className={`${selectedStyle}`}
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
            <div className="selectedPageIndex">1</div>
          ) : (
            <button onClick={() => gotoPage(0)}>1</button>
          )}
          {pageIndex >= defaultPageGroupCount && (
            <span style={{ padding: "0 4px" }}>...</span>
          )}
          {prevPageIndexList.map((index) => {
            return (
              <button key={index} onClick={() => gotoPage(index)}>
                {index + 1}
              </button>
            );
          })}
          {pageIndex > 0 && pageIndex < lastPageIndex && (
            <div className="selectedPageIndex">{pageIndex + 1}</div>
          )}
          {nextPageIndexList.map((index) => {
            return (
              <button key={index} onClick={() => gotoPage(index)}>
                {index + 1}
              </button>
            );
          })}
          {pageIndex < pageCount - defaultPageGroupCount && (
            <span style={{ padding: "0 4px" }}>...</span>
          )}
          {pageIndex === pageCount - 1 ? (
            <div className="selectedPageIndex">{pageCount}</div>
          ) : (
            <button onClick={() => gotoPage(pageCount - 1)}>{pageCount}</button>
          )}
        </div>
      )}
    </>
  );
};

export default function Pagination(props) {
  const {
    gotoPage,
    pageCount,
    pageIndex,
    canPreviousPage,
    previousPage,
    canNextPage,
    nextPage,
    pageOptions,
    pageSize,
    setPageSize,
    pageSizeOptions = defaultPageSizeOptions,
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
    <PaginationWrapper>
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
          {pageSizeOptions.map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <button
        className="arrowBtn"
        onClick={() => previousPage()}
        disabled={!canPreviousPage}
      >
        <Icon icon="left" size="sm" />
      </button>
      <PageIndexGroup
        {...{
          isArrangeView,
          lastPageIndex,
          prevPageIndexList,
          nextPageIndexList,
          pageIndex,
          pageCount,
          gotoPage,
        }}
      />
      <button
        className="arrowBtn"
        onClick={() => nextPage()}
        disabled={!canNextPage}
      >
        <Icon icon="right" size="sm" />
      </button>
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
    </PaginationWrapper>
  );
}

const pageIndexStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: transparent;
  border: none;
  padding: 0;
  margin: 0 2px;
  border-radius: 50%;
  cursor: pointer;
  user-select: none;
`;

const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  border-top: 1px solid ${theme.palette.colors.gray[300]};
  ${theme.typography.body3}

  .indexBtnGroup {
    display: flex;
    align-items: center;
    ${theme.typography.weightMedium}
    & > button {
      ${pageIndexStyle}
    }

    .selectedPageIndex {
      ${pageIndexStyle}
      background: ${theme.palette.colors.gray[600]};
      color: #fff;
      border-radius: 50%;
      margin: 0 2px;
      user-select: none;
      cursor: auto;
    }
  }

  .arrowBtn {
    display: flex;
    border: none;
    background: transparent;
    cursor: pointer;
    user-select: none;
  }
`;
