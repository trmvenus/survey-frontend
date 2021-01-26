import React from 'react';
import { Row } from 'reactstrap';
import Pagination from './Pagination';

function collect(props) {
  return { data: props.data };
}

const ListPageListing = ({
  items,
  displayMode,
  selectedItems,
  onCheckItem,
  currentPage,
  totalPage,
  onContextMenuClick,
  onContextMenu,
  onChangePage,
  ImageListView,
  DataListView,
  ThumbListView,
  ContextMenuContainer,
}) => {
  return (
    <Row>
      {items.map((item) => {
        if (displayMode === 'imagelist') {
          return (
            <ImageListView
              key={item.id}
              item={item}
              isSelect={selectedItems.includes(item.id)}
              collect={collect}
              onCheckItem={onCheckItem}
            />
          );
        }
        if (displayMode === 'thumblist') {
          return (
            <ThumbListView
              key={item.id}
              item={item}
              isSelect={selectedItems.includes(item.id)}
              collect={collect}
              onCheckItem={onCheckItem}
            />
          );
        }
        return (
          <DataListView
            key={item.id}
            item={item}
            isSelect={selectedItems.includes(item.id)}
            onCheckItem={onCheckItem}
            collect={collect}
          />
        );
      })}
      <Pagination
        currentPage={currentPage}
        totalPage={totalPage}
        onChangePage={(i) => onChangePage(i)}
      />
      <ContextMenuContainer
        onContextMenuClick={onContextMenuClick}
        onContextMenu={onContextMenu}
      />
    </Row>
  );
};

export default React.memo(ListPageListing);
