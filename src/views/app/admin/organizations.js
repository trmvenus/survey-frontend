import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { NotificationManager } from '../../../components/common/react-notifications';

import ListPageHeading from '../../../containers/pages/ListPageHeading';
import ListPageListing from '../../../containers/pages/ListPageListing';
import AddNewModal from '../../../containers/organizations/AddNewModal';
import ImageListView from '../../../containers/organizations/ImageListView';
import DataListView from '../../../containers/organizations/DataListView';
import ThumbListView from '../../../containers/organizations/ThumbListView';
import ContextMenuContainer from '../../../containers/organizations/ContextMenuContainer';

import useMousetrap from '../../../hooks/use-mousetrap';

import { getOrganizationListWithFilter, deleteOrganizationItems } from '../../../redux/actions';

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
  { column: 'created_at', label: 'Create Date' },
];
const pageSizes = [4, 8, 12, 20];

const categories = [
  { label: 'University 1', value: 'uni-1', key: 0 },
  { label: 'University 2', value: 'uni-2', key: 1 },
  { label: 'University 3', value: 'uni-3', key: 2 },
];

const OrganizationsSettings = ({ 
  match,

  allOrganizations,
  organizations,
  isLoaded,
  error,
  totalPage,
  totalCount,

  getOrganizationListWithFilterAction,
  deleteOrganizationItemsAction,
}) => {
  const [displayMode, setDisplayMode] = useState('thumblist');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(8);
  const [selectedOrderOption, setSelectedOrderOption] = useState({
    column: 'created_at',
    label: 'Create Date',
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [lastChecked, setLastChecked] = useState(null);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedPageSize, selectedOrderOption]);

  useEffect(() => {
    getOrganizationListWithFilterAction({
      pageSize: selectedPageSize,
      currentPage: currentPage,
      orderBy: selectedOrderOption.column,
      search: search,
    });

    setSelectedItems([]);
  }, [allOrganizations, selectedPageSize, currentPage, selectedOrderOption, search]);

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
      let newItems = [...organizations];
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
    if (selectedItems.length >= organizations.length) {
      if (isToggle) { 
        setSelectedItems([]);
      }
    } else {
      setSelectedItems(organizations.map((x) => x.id));
    }
    document.activeElement.blur();
    return false;
  };

  const handleDeleteSelected = () => {
    deleteOrganizationItemsAction({ids: selectedItems});
  }

  const onContextMenuClick = (e, data) => {
    // params : (e,data,target)
    if (data.action === 'delete') {
      deleteOrganizationItemsAction({ids: selectedItems});
    }
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
          heading="menu.organizations"
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
          itemsLength={organizations ? organizations.length : 0}
          onSearchKey={(e) => {
            if (e.key === 'Enter') {
              setSearch(e.target.value.toLowerCase());
            }
          }}
          orderOptions={orderOptions}
          pageSizes={pageSizes}
          toggleModal={() => setModalOpen(!modalOpen)}
          handleDeleteSelected={handleDeleteSelected}
        />
        <AddNewModal
          modalOpen={modalOpen}
          toggleModal={() => setModalOpen(!modalOpen)}
          categories={categories}
        />
        <ListPageListing
          items={organizations}
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
      </div>
    </>
  );
};

const mapStateToProps = ({ organization }) => {
  const {
    allOrganizations,
    organizations,
    isLoaded,
    error,
    totalPage,
    totalCount,
  } = organization;

  return {
    allOrganizations,
    organizations,
    isLoaded,
    error,
    totalPage,
    totalCount,
  };
};
export default connect(mapStateToProps, {
    getOrganizationListWithFilterAction: getOrganizationListWithFilter,
    deleteOrganizationItemsAction: deleteOrganizationItems,
  })(OrganizationsSettings);