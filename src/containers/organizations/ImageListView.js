import React from 'react';
import {
  Row,
  Card,
  CardBody,
  CardSubtitle,
  CardImg,
  CardText,
  CustomInput,
  Badge,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import Moment from 'react-moment';

import { Colxx } from '../../components/common/CustomBootstrap';

const ImageListView = ({ item, isSelect, collect, onCheckItem }) => {
  const organization =  item;
  return (
    <Colxx sm="6" lg="4" xl="3" className="mb-3" key={organization.id}>
      <ContextMenuTrigger id="menu_id" data={organization.id} collect={collect}>
        <Card
          onClick={(event) => onCheckItem(event, organization.id)}
          className={classnames({
            active: isSelect,
          })}
        >
          <div className="position-relative">
            <NavLink to={`?p=${organization.id}`} className="w-40 w-sm-100">
              <CardImg top 
                alt={organization.title} 
                src='/assets/img/organizations/default-organization.png' />
            </NavLink>
            <Badge
              color="primary"
              pill
              className="position-absolute badge-top-left"
            >
            {organization.users}&nbsp;{organization.users&&organization.users.length>1?'users':'user'}
            </Badge>
          </div>
          <CardBody>
            <Row>
              <Colxx xxs="2">
                <CustomInput
                  className="item-check mb-0"
                  type="checkbox"
                  id={`check_${organization.id}`}
                  checked={isSelect}
                  onChange={() => {}}
                  label=""
                />
              </Colxx>
              <Colxx xxs="10" className="mb-3">
                <CardSubtitle>{organization.name}</CardSubtitle>
                <CardText className="text-muted text-small mb-0 font-weight-light">  
                  <Moment format="YYYY-MM-DD">
                    {organization.created_at}
                  </Moment>
                </CardText>
              </Colxx>
            </Row>
          </CardBody>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(ImageListView);
