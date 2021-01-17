import React, { useState } from 'react';
import { Card, CustomInput, Badge } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import Moment from 'react-moment';

import { Colxx } from '../../components/common/CustomBootstrap';
import { getRoleName } from '../../helpers/authHelper';
import { client } from '../../helpers/client';

const ThumbListView = ({ user, isSelect, collect, onCheckItem }) => {
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
                University 1
              </p>
              <p className="mb-1 text-muted text-small w-15 w-sm-100">
                <Moment format="YYYY-MM-DD">
                  {user.date}
                </Moment>
              </p>
              <div className="w-10 w-sm-100 text-muted custom-control custom-checkbox pl-1 d-flex align-self-center pr-2">
                <CustomInput
                  type="checkbox"
                  id={`activate_${user.id}`}
                  defaultChecked={user.is_active}
                  onChange={() => {client.put(`/user/${user.id}/active`)}}
                  label="Activate"
                />
              </div>
              <div className="w-10 w-sm-100 d-flex">
                <div className="text-muted custom-control custom-checkbox pl-1 align-self-center pr-2">
                  <CustomInput
                    type="checkbox"
                    id={`create_${user.id}`}
                    defaultChecked={user.p_create}
                    onChange={() => {client.put('/user/permission', {user: user.id, method: 'p_create'})}}
                    label="Create"
                  />
                </div>
              </div>
              <div className="w-10 w-sm-100 d-flex">
                <div className="text-muted custom-control custom-checkbox pl-1 align-self-center pr-2">
                  <CustomInput
                    type="checkbox"
                    id={`edit_${user.id}`}
                    defaultChecked={user.p_edit}
                    onChange={() => {client.put('/user/permission', {user: user.id, method: 'p_edit'})}}
                    label="Edit"
                  />
                </div>
              </div>
              <div className="w-10 w-sm-100 d-flex">
                <div className="text-muted custom-control custom-checkbox pl-1 align-self-center pr-2">
                  <CustomInput
                    type="checkbox"
                    id={`view_${user.id}`}
                    defaultChecked={user.p_view}
                    onChange={() => {client.put('/user/permission', {user: user.id, method: 'p_view'})}}
                    label="View"
                  />
                </div>
              </div>
              <div className="w-10 w-sm-100 d-flex">
                <div className="text-muted custom-control custom-checkbox pl-1 align-self-center pr-2">
                  <CustomInput
                    type="checkbox"
                    id={`copy_${user.id}`}
                    defaultChecked={user.p_copy}
                    onChange={() => {client.put('/user/permission', {user: user.id, method: 'p_copy'})}}
                    label="Copy"
                  />
                </div>
              </div>
              <div className="w-10 w-sm-100 d-flex">
                <div className="text-muted custom-control custom-checkbox pl-1 align-self-center pr-2">
                  <CustomInput
                    type="checkbox"
                    id={`delete_${user.id}`}
                    defaultChecked={user.p_delete}
                    onChange={() => {client.put('/user/permission', {user: user.id, method: 'p_delete'})}}
                    label="Delete"
                  />
                </div>
              </div>
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
export default React.memo(ThumbListView);
