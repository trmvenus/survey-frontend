import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { NotificationManager } from '../../../components/common/react-notifications';

import ListPageHeading from '../../../containers/pages/ListPageHeading';
import ListPageListing from '../../../containers/pages/ListPageListing';
import AddNewModal from '../../../containers/users/AddNewModal';
import ChooseOrganizationModal from '../../../containers/users/ChooseOrganizationModal';
import ImageListView from '../../../containers/users/ImageListView';
import DataListView from '../../../containers/users/DataListView';
import ThumbListView from '../../../containers/users/ThumbListView';
import ContextMenuContainer from '../../../containers/users/ContextMenuContainer';


import useMousetrap from '../../../hooks/use-mousetrap';

import { getUserList, deleteUsers, changeOrganization } from '../../../redux/actions';

const getIndex = (value, arr, prop) => {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i][prop] === value) {
      return i;
    }
  }
  return -1;
};

const orderOptions = [
  { column: 'name', label: 'Name' },
  { column: 'organization_name', label: 'Organization' },
  // { column: 'status', label: 'Status' },
];
const pageSizes = [4, 8, 12, 20];

const categories = [
  { label: 'University 1', value: 'uni-1', key: 0 },
  { label: 'University 2', value: 'uni-2', key: 1 },
  { label: 'University 3', value: 'uni-3', key: 2 },
];

const UsersSettings = ({ 
  match,

  users,
  isLoaded,
  error,
  totalPage,
  totalCount,

  getUserListAction,
  deleteUsersAction,
  changeOrganizationAction,
}) => {
  const [displayMode, setDisplayMode] = useState('thumblist');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(8);
  const [selectedOrderOption, setSelectedOrderOption] = useState({
    column: 'name',
    label: 'Name',
  });

  const [newModalOpen, setNewModalOpen] = useState(false);
  const [chooseModalOpen, setChooseModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItemOrganizationId, setSelectedItemOrganizationId] = useState(0);
  const [lastChecked, setLastChecked] = useState(null);
  const [isEditModal, setIsEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedPageSize, selectedOrderOption]);

  useEffect(() => {
    getUserListAction({
      pageSize: selectedPageSize,
      currentPage: currentPage,
      orderBy: selectedOrderOption.column,
      search: search,
    });

    setSelectedItems([]);
  }, [selectedPageSize, currentPage, selectedOrderOption, search]);

  useEffect(() => {
    if (error) {
      NotificationManager.warning(error.message??error, 'Users Page Error', 3000, null, null, '');
    }
  }, [error]);

  const onCheckItem = (event, id) => {
    if (
      event.target.tagName === 'A' ||
      (event.target.parentElement && event.target.parentElement.tagName === 'A')
    ) {
      return true;
    }
    if (lastChecked === null) {
      setLastChecked(id);
    }

    let selectedList = [...selectedItems];
    if (selectedList.includes(id)) {
      selectedList = selectedList.filter((x) => x !== id);
    } else {
      selectedList.push(id);
    }
    setSelectedItems(selectedList);

    if (event.shiftKey) {
      let newItems = [...users];
      const start = getIndex(id, newItems, 'id');
      const end = getIndex(lastChecked, newItems, 'id');
      newItems = newItems.slice(Math.min(start, end), Math.max(start, end) + 1);
      selectedItems.push(
        ...newItems.map((item) => {
          return item.id;
        })
      );
      selectedList = Array.from(new Set(selectedItems));
      setSelectedItems(selectedList);
    }
    document.activeElement.blur();
    return false;
  };

  const handleChangeSelectAll = (isToggle) => {
    if (selectedItems.length >= users.length) {
      if (isToggle) {
        setSelectedItems([]);
      }
    } else {
      setSelectedItems(users.map((x) => x.id));
    }
    document.activeElement.blur();
    return false;
  };

  const handleDeleteSelected = () => {
    deleteUsersAction({ids: selectedItems});
  }

  const onContextMenuClick = (e, data) => {
    if (data.action === 'delete') {
      deleteUsersAction({ids: selectedItems});
    } else if (data.action === 'move') {
      if (selectedItems.length > 0) {
        const selectedUser = users.find(user => user.id === selectedItems[0]);
        if (selectedUser) {
          setSelectedItemOrganizationId(selectedUser.organization_id);
        } else {
          setSelectedItemOrganizationId(0);
        }
      } else {
        setSelectedItemOrganizationId(0);
      }
      setChooseModalOpen(true);
    }
  };

  const onContextMenu = (e, data) => {
    const clickedProductId = data.data;
    if (!selectedItems.includes(clickedProductId)) {
      setSelectedItems([clickedProductId]);
    }

    return true;
  };

  const handleChooseOrganization = (organization_id) => {
    changeOrganizationAction(selectedItems[0], organization_id);
  }

  useMousetrap(['ctrl+a', 'command+a'], () => {
    handleChangeSelectAll(false);
  });

  useMousetrap(['ctrl+d', 'command+d'], () => {
    setSelectedItems([]);
    return false;
  });

  const handleEditModalOpen = (user) => {
    setSelectedUser(user);
    setIsEditModal(true);
    setNewModalOpen(true);
  }

  const handleAddModalOpen = () => {
    setSelectedUser({});
    setIsEditModal(false);
    setNewModalOpen(true);
  }

  const startIndex = (currentPage - 1) * selectedPageSize;
  const endIndex = currentPage * selectedPageSize;

  return !isLoaded ? (
    <div className="loading" />
  ) : (
    <>
      <div className="disable-text-selection">
        <ListPageHeading
          heading="menu.users"
          displayMode={displayMode}
          changeDisplayMode={setDisplayMode}
          handleChangeSelectAll={handleChangeSelectAll}
          changeOrderBy={(column) => {
            setSelectedOrderOption(
              orderOptions.find((x) => x.column === column)
            );
          }}
          changePageSize={setSelectedPageSize}
          selectedPageSize={selectedPageSize}
          totalItemCount={totalCount}
          selectedOrderOption={selectedOrderOption}
          match={match}
          startIndex={startIndex}
          endIndex={endIndex}
          selectedItemsLength={selectedItems ? selectedItems.length : 0}
          itemsLength={users ? users.length : 0}
          onSearchKey={(e) => {
            if (e.key === 'Enter') {
              setSearch(e.target.value.toLowerCase());
            }
          }}
          orderOptions={orderOptions}
          pageSizes={pageSizes}
          toggleModal={handleAddModalOpen}
          handleDeleteSelected={handleDeleteSelected}
        />
        <AddNewModal
          isEdit={isEditModal}
          modalOpen={newModalOpen}
          toggleModal={() => setNewModalOpen(!newModalOpen)}
          categories={categories}
          user={selectedUser}
        />
        <ListPageListing
          handleEdit={handleEditModalOpen}
          items={users}
          displayMode={displayMode}
          selectedItems={selectedItems}
          onCheckItem={onCheckItem}
          currentPage={currentPage}
          totalPage={totalPage}
          onContextMenuClick={onContextMenuClick}
          onContextMenu={onContextMenu}
          onChangePage={setCurrentPage}
          ImageListView={ImageListView}
          DataListView={DataListView}
          ThumbListView={ThumbListView}
          ContextMenuContainer={ContextMenuContainer}
        />
        <ChooseOrganizationModal
          modalOpen={chooseModalOpen}
          toggleModal={() => setChooseModalOpen(!chooseModalOpen)}
          handleClickYes={handleChooseOrganization}
          previousOrganizationId={selectedItemOrganizationId}
        />
      </div>
    </>
  );
};

const mapStateToProps = ({ user, organization }) => {
  const {
    users,
    loading,
    error,
    totalPage,
    totalCount,
  } = user;

  return {
    users,
    isLoaded: loading,
    error,
    totalPage,
    totalCount,

    organizations: organization.organizations,
    organizationsError: organization.error,
    isOrganizationsLoaded: organization.isLoaded,
  };
};
export default connect(mapStateToProps, {
    getUserListAction: getUserList,
    deleteUsersAction: deleteUsers,
    changeOrganizationAction: changeOrganization,
  })(UsersSettings);