/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-key */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/display-name */
import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import {injectIntl} from 'react-intl';
import { Badge } from 'reactstrap';
import TimeAgo from 'react-timeago';

import Table from '../ui/ReactTableCards';
import { NotificationManager } from '../../components/common/react-notifications';

const SurveyReportTable = ({
  intl,
  reportItems,
  isLoaded,
  error,
}) => {
  const {messages} = intl;

  const cols = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
        cellClass: 'list-item-heading w-30  w-xs-100',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Created By',
        accessor: 'username',
        cellClass: 'list-item-heading w-10  w-xs-100',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Created On',
        accessor: 'created_at',
        cellClass: 'text-muted  w-10  w-xs-100',
        Cell: (props) => <TimeAgo date={props.value}/>,
      },
      {
        Header: 'Type',
        accessor: 'type',
        cellClass: 'text-muted w-10  w-xs-100',
        Cell: (props) => <Badge color="outline-primary" pill>{messages[`report.${props.value}`]}</Badge>,
      },
      {
        Header: 'Action',
        accessor: '',
        cellClass: 'w-10  w-xs-100',
        Cell: () => <><i className="simple-icon-trash luci-delete-icon" /></>,
      },
    ],
    []
  );

  useEffect(() => {
    if (error) {
      NotificationManager.warning(error.message??error, 'Get Report Error', 3000, null, null, '');
    }
  }, [error]);

  return (
    <div className="mb-4">
      {(isLoaded) ? (
        <Table columns={cols} data={reportItems} divided />
      ) : (
        <div className='loading' />
      )}
    </div>
  );
};

const mapStateToProps = ({ report }) => {
  const {
    reportItems, 
    loading,
    error
  } = report;

  return {
    reportItems,
    isLoaded: !loading,
    error,
  };
};

export default injectIntl(
  connect(mapStateToProps, {
  })(SurveyReportTable)
);