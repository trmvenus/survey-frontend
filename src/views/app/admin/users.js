import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { servicePath } from '../../../constants/defaultValues';

import { NotificationManager } from '../../../components/common/react-notifications';

import ListPageHeading from '../../../containers/users/ListPageHeading';
import AddNewModal from '../../../containers/users/AddNewModal';
import ListPageListing from '../../../containers/users/ListPageListing';

import useMousetrap from '../../../hooks/use-mousetrap';

import { getUserList } from '../../../redux/user/actions';

const getIndex = (value, arr, prop) => {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i][prop] === value) {
      return i;
    }
  }
  return -1;
};

const apiUrl = `${process.env.REACT_APP_API_URL}/user`;

const orderOptions = [
  { column: 'name', label: 'Name' },
  { column: 'category', label: 'Organization' },
  { column: 'status', label: 'Status' },
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
}) => {
  const [displayMode, setDisplayMode] = useState('thumblist');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(8);
  const [selectedOrderOption, setSelectedOrderOption] = useState({
    column: 'name',
    label: 'Name',
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [lastChecked, setLastChecked] = useState(null);

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

  const onContextMenuClick = (e, data) => {
    // params : (e,data,target)
    console.log('onContextMenuClick - selected items', selectedItems);
    console.log('onContextMenuClick - action : ', data.action);
  };

  const onContextMenu = (e, data) => {
    const clickedProductId = data.data;
    if (!selectedItems.includes(clickedProductId)) {
      setSelectedItems([clickedProductId]);
    }

    return true;
  };

  useMousetrap(['ctrl+a', 'command+a'], () => {
    handleChangeSelectAll(false);
  });

  useMousetrap(['ctrl+d', 'command+d'], () => {
    setSelectedItems([]);
    return false;
  });

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
          toggleModal={() => setModalOpen(!modalOpen)}
        />
        <AddNewModal
          modalOpen={modalOpen}
          toggleModal={() => setModalOpen(!modalOpen)}
          categories={categories}
        />
        <ListPageListing
          items={users}
          displayMode={displayMode}
          selectedItems={selectedItems}
          onCheckItem={onCheckItem}
          currentPage={currentPage}
          totalPage={totalPage}
          onContextMenuClick={onContextMenuClick}
          onContextMenu={onContextMenu}
          onChangePage={setCurrentPage}
        />
      </div>
    </>
  );
};

const mapStateToProps = ({ user }) => {
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
  };
};
export default connect(mapStateToProps, {
    getUserListAction: getUserList,
  })(UsersSettings);