/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-key */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/display-name */
import React from 'react';
import { connect } from 'react-redux';
import { Badge } from 'reactstrap';
import { useTable, usePagination, useSortBy } from 'react-table';
import TimeAgo from 'react-timeago';
import classnames from 'classnames';

import IntlMessages from '../../helpers/IntlMessages';
import DatatablePagination from '../../components/DatatablePagination';

function Table({ columns, data, divided = false, defaultPageSize = 6 }) {
  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: defaultPageSize },
    },
    useSortBy,
    usePagination
  );

  return (
    <>
      <table
        {...getTableProps()}
        className={`r-table table ${classnames({ 'table-divided': divided })}`}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, columnIndex) => (
                <th
                  key={`th_${columnIndex}`}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={
                    column.isSorted
                      ? column.isSortedDesc
                        ? 'sorted-desc'
                        : 'sorted-asc'
                      : ''
                  }
                >
                  {column.render('Header')}
                  <span />
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell, cellIndex) => (
                  <td
                    key={`td_${cellIndex}`}
                    {...cell.getCellProps({
                      className: cell.column.cellClass,
                    })}
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <DatatablePagination
        page={pageIndex}
        pages={pageCount}
        canPrevious={canPreviousPage}
        canNext={canNextPage}
        pageSizeOptions={[4, 10, 20, 30, 40, 50]}
        showPageSizeOptions={false}
        showPageJump={false}
        defaultPageSize={pageSize}
        onPageChange={(p) => gotoPage(p)}
        onPageSizeChange={(s) => setPageSize(s)}
        paginationMaxSize={pageCount}
      />
    </>
  );
}

const SurveyResultTable = ({
  resultItems,
  loading,
  error,
}) => {
  const cols = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
        cellClass: 'text-muted  w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Respondent',
        accessor: 'username',
        cellClass: 'list-item-heading w-20',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Started Time',
        accessor: 'created_at',
        cellClass: 'text-muted  w-10',
        Cell: (props) => <TimeAgo date={props.value}/>,
      },
      {
        Header: 'State',
        accessor: 'is_completed',
        cellClass: 'text-muted  w-10',
        Cell: (props) => <Badge color={props.value ? "primary" : "secondary"} pill>{props.value ? "Completed" : "In Progress"}</Badge>,
      },
      {
        Header: 'Time Spent',
        accessor: 'time_spent',
        cellClass: 'text-muted  w-10',
        Cell: (props) => <>{new Date(props.value * 1000).toISOString().substr(14, 5)}</>,
      },
      {
        Header: 'IP Address',
        accessor: 'ip_address',
        cellClass: 'text-muted  w-10',
        Cell: (props) => <>{props.value}</>,
      },
    ],
    []
  );

  return (
    <div className="mb-4">
      <Table columns={cols} data={resultItems} divided />
    </div>
  );
};

const mapStateToProps = ({ result }) => {
  const {
    resultItems, 
    loading,
    error
  } = result;

  return {
    resultItems,
    loading,
    error,
  };
};

export default connect(mapStateToProps, {
})(SurveyResultTable);