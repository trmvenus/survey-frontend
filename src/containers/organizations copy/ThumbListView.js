import React from 'react';
import { Card, CustomInput, Badge, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import Moment from 'react-moment';

import { Colxx } from '../../components/common/CustomBootstrap';
import { getRoleName } from '../../helpers/authHelper';
import { client } from '../../helpers/client';
import IntlMessages from '../../helpers/IntlMessages';

const ThumbListView = ({ item, isSelect, collect, onCheckItem, handleEdit }) => {
  const user = item;

  return (
    <Colxx xxs="12" key={user.id} className="mb-3">
      <ContextMenuTrigger id="menu_id" data={user.id} collect={collect}>
        <Card
          className={classnames('d-flex flex-row', {
            active: isSelect,
          })}
        >
          <NavLink to={`?p=${user.id}`} className="d-flex">
            <img
              alt={user.title}
              src='/assets/img/profiles/l-default.jpg'
              className="list-thumbnail responsive border-0 card-img-left"
            />
          </NavLink>
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              <NavLink to={`?p=${user.id}`} className="w-20 w-sm-100">
                <p className="list-item-heading mb-1 truncate">
                  {user.name}
                </p>
              </NavLink>
              <p className="mb-1 text-muted text-small w-20 w-sm-100">
                {user.organization_name}
              </p>
              <p className="mb-1 text-muted text-small w-15 w-sm-100">
                <Moment format="YYYY-MM-DD">
                  {user.created_at}
                </Moment>
              </p>
            
              <div className="w-15 w-sm-100">
                <Badge color={user.statusColor} pill>
                  {getRoleName(user.role)}
                </Badge>
              </div>
            </div>
            <div className="custom-control custom-checkbox pl-1 align-self-center pr-2">
              <CustomInput
                className="mb-0"
                type="checkbox"
                id={`check_${user.id}`}
                checked={isSelect}
                onClick={(event) => onCheckItem(event, user.id)}
                onChange={() => { }}
                label=""
              />
            </div>
          </div>
          <div className="float-right align-self-center mr-3" >
            <Button
              size="xs"
              color="outline-success"
              className=""
              onClick={() => handleEdit(user)}
            >
              <IntlMessages id="menu.edit" />
            </Button>
          </div>
        </Card>
      </ContextMenuTrigger>
    </Colxx >
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(ThumbListView);
