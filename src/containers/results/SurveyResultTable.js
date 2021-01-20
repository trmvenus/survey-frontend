/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-key */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/display-name */
import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Badge, Button } from 'reactstrap';
import TimeAgo from 'react-timeago';

import Table from '../ui/ReactTableCards';
import IntlMessages from '../../helpers/IntlMessages';
import { NotificationManager } from '../../components/common/react-notifications';

const SurveyResultTable = ({
  resultItems,
  isLoaded,
  error,
}) => {
  const cols = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
        cellClass: 'text-muted w-10  w-xs-100 align-middle',
        Cell: (props) => <NavLink to={`./results/${props.value}`} location={{}}>{props.value}</NavLink>,
      },
      {
        Header: 'Respondent',
        accessor: 'username',
        cellClass: 'list-item-heading w-20  w-xs-100 align-middle',
        Cell: (props) => <NavLink to={`./results/${props.row.values.id}`} location={{}}>{props.value}</NavLink>,
      },
      {
        Header: 'Started Time',
        accessor: 'created_at',
        cellClass: 'text-muted  w-10  w-xs-100 align-middle',
        Cell: (props) => <TimeAgo date={props.value}/>,
      },
      {
        Header: 'State',
        accessor: 'is_completed',
        cellClass: 'text-muted  w-10  w-xs-100 align-middle',
        Cell: (props) => <Badge color={props.value ? "outline-primary" : "outline-secondary"} pill>{props.value ? "Completed" : "In Progress"}</Badge>,
      },
      {
        Header: 'Time Spent',
        accessor: 'time_spent',
        cellClass: 'text-muted  w-10  w-xs-100 align-middle',
        Cell: (props) => <>{new Date(props.value * 1000).toISOString().substr(14, 5)}</>,
      },
      {
        Header: 'IP Address',
        accessor: 'ip_address',
        cellClass: 'text-muted  w-10  w-xs-100 align-middle',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Action',
        accessor: '',
        cellClass: 'w-10  w-xs-100 align-middle',
        Cell: (props) => (
          <NavLink to={`./results/${props.row.values.id}?mode=edit`} location={{}}>
            <Button color="primary" size="sm">
              <IntlMessages id="survey.edit" />
            </Button>
          </NavLink>
          ),
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
        <Table columns={cols} data={resultItems} divided />
      ) : (
        <div className='loading' />
      )}
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
    isLoaded: !loading,
    error,
  };
};

export default connect(mapStateToProps, {
})(SurveyResultTable);