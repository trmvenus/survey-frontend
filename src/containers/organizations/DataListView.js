import React from 'react';
import { Card, CustomInput, Badge } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import Moment from 'react-moment';

import { Colxx } from '../../components/common/CustomBootstrap';
import { client } from '../../helpers/client';
import { getRoleName } from '../../helpers/authHelper';

const DataListView = ({ item, isSelect, collect, onCheckItem }) => {
  const organization = item;
  return (
    <Colxx xxs="12" className="mb-3">
      <ContextMenuTrigger id="menu_id" data={organization.id} collect={collect}>
        <Card
          onClick={(event) => onCheckItem(event, organization.id)}
          className={classnames('d-flex flex-row', {
            active: isSelect,
          })}
        >
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              <NavLink to={`?p=${organization.id}`} className="w-40 w-sm-100">
                <p className="list-item-heading mb-1 truncate">
                  {organization.name}
                </p>
              </NavLink>
              <p className="mb-1 text-muted text-small w-20 w-sm-100">
                {organization.users}&nbsp;{organization.users&&organization.users.length>1?'users':'user'}
              </p>
              <p className="mb-1 text-muted text-small w-15 w-sm-100">
                <Moment format="YYYY-MM-DD">
                  {organization.created_at}
                </Moment>
              </p>
            </div>
            <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
              <CustomInput
                className="item-check mb-0"
                type="checkbox"
                id={`check_${organization.id}`}
                checked={isSelect}
                onChange={() => {}}
                label=""
              />
            </div>
          </div>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(DataListView);
