/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-key */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/display-name */
import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import {injectIntl} from 'react-intl';
import { NavLink } from 'react-router-dom';
import TimeAgo from 'react-timeago';
import { 
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
  Badge,
} from 'reactstrap';

// Containers
import Table from '../ui/ReactTableCards';

// Components
import { NotificationManager } from '../../components/common/react-notifications';

// Helpers
import IntlMessages from '../../helpers/IntlMessages';

// Redux
import { deleteReportItem } from '../../redux/actions';

const SurveyReportTable = ({
  intl,

  reportItems,
  isLoaded,
  error,

  deleteReportItemAction,
}) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const {messages} = intl;

  const cols = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
        cellClass: 'list-item-heading w-30  w-xs-100',
        Cell: (props) => <NavLink to={`./reports/${props.data[props.row.index].id}`} location={{}}>{props.value}</NavLink>,
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
        Cell: (props) => <><i className="simple-icon-trash luci-delete-icon" onClick={() => {setDeleteId(props.data[props.row.index].id); setDeleteModalOpen(true)}} /></>,
      },
    ],
    []
  );

  const handleDeleteReport = () => {
    if (deleteId) {
      deleteReportItemAction(deleteId)
    }
    setDeleteModalOpen(false);
  }

  useEffect(() => {
    if (error) {
      NotificationManager.warning(error.message??error, 'Get Report Error', 3000, null, null, '');
    }
  }, [error]);

  useEffect(() => {
    console.log("reportItems => ");
    console.log(reportItems);
  }, [reportItems])

  return (
    <div className="mb-4">
      {(isLoaded) ? (
        <Table columns={cols} data={reportItems} divided />
      ) : (
        <div className='loading' />
      )}
      <Modal
        isOpen={deleteModalOpen}
        toggle={() => setDeleteModalOpen(!deleteModalOpen)}
      >
        <ModalHeader>
          <IntlMessages id="modal.modal-title" />
        </ModalHeader>
        <ModalBody>
        Are you sure to delete this report?
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => handleDeleteReport()}
          >
            <IntlMessages id="modal.yes" />
          </Button>{' '}
          <Button
            color="secondary"
            onClick={() => setDeleteModalOpen(false)}
          >
            <IntlMessages id="modal.no" />
          </Button>
        </ModalFooter>
      </Modal>
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
    deleteReportItemAction: deleteReportItem,  
  })(SurveyReportTable)
);