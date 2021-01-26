import React from 'react';
import { ContextMenu, MenuItem } from 'react-contextmenu';
import IntlMessages from '../../helpers/IntlMessages';

const ContextMenuContainer = ({ onContextMenu, onContextMenuClick }) => {
  return (
    <ContextMenu id="menu_id" onShow={(e) => onContextMenu(e, e.detail.data)}>
      {/* <MenuItem onClick={onContextMenuClick} data={{ action: 'copy' }}>
        <i className="simple-icon-docs" /> <span>Copy</span>
      </MenuItem>
      <MenuItem onClick={onContextMenuClick} data={{ action: 'move' }}>
        <i className="simple-icon-drawer" /> <span>Move to archive</span>
      </MenuItem> */}
      <MenuItem onClick={onContextMenuClick} data={{ action: 'delete' }}>
        <i className="simple-icon-trash" /> <span><IntlMessages id='pages.delete' /></span>
      </MenuItem>
    </ContextMenu>
  );
};

export default ContextMenuContainer;
