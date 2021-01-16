import React, {useState} from 'react';
import { Row, Button, Card, CardBody, CardTitle, Badge } from 'reactstrap';
import { NavLink } from 'react-router-dom';

// Components
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import SingleLightbox from '../../../components/pages/SingleLightbox';

// Containers
import Breadcrumb from '../../../containers/navs/Breadcrumb';

// Helpers
import { getCurrentUser } from '../../../helpers/Utils';
import IntlMessages from '../../../helpers/IntlMessages';
import EditProfile from '../../../containers/settings/EditProfile';

const Account = ({ match }) => {
  const [currentUser] = useState(getCurrentUser());
  const [editingMode, setEditingMode] = useState(false);

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <div className="text-zero top-right-button-container">
            <Button
              color={editingMode ? "outline-primary" : "outline-primary"}
              size="lg"
              className="top-right-button mr-3"
              onClick={() => setEditingMode(!editingMode)}
            >
              {(editingMode) ? (
                <IntlMessages id="menu.save" />
              ) : (
                <IntlMessages id="menu.edit" />
              )}
            </Button>
          </div>
          <Breadcrumb heading="menu.account" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-5">
          <Card>
            <SingleLightbox
              thumb="/assets/img/social/header.jpg"
              large="/assets/img/social/header.jpg"
              className="social-header card-img"
            />
          </Card>
        </Colxx>
        <Colxx xxs="12" lg="5" xl="4" className="col-left">
          <SingleLightbox
            thumb="/assets/img/profiles/default.jpg"
            large="/assets/img/profiles/l-default.jpg"
            className="img-thumbnail card-img social-profile-img"
          />

          <Card className="mb-4">
            <CardBody>
              <div className="text-center pt-4">
                <p className="list-item-heading pt-2">{currentUser.name}</p>
              </div>
              <p className="mb-3">
                I’m a co-administrator of this site.
              </p>
              <p className="text-muted text-small mb-2">
                <IntlMessages id="pages.location" />
              </p>
              <p className="mb-3">Nairobi, Kenya</p>
              <p className="text-muted text-small mb-2">
                <IntlMessages id="profile.role" />
              </p>
              <p className="mb-3">
                <Badge
                  color="outline-secondary"
                  className="mb-1 mr-1"
                  pill
                >
                  User
                </Badge>
              </p>
              <p className="text-muted text-small mb-2">
                <IntlMessages id="menu.contact" />
              </p>
              <div className="social-icons">
                <ul className="list-unstyled list-inline">
                  <li className="list-inline-item">
                    <NavLink to="#">
                      <i className="simple-icon-social-facebook" />
                    </NavLink>
                  </li>
                  <li className="list-inline-item">
                    <NavLink to="#">
                      <i className="simple-icon-social-twitter" />
                    </NavLink>
                  </li>
                  <li className="list-inline-item">
                    <NavLink to="#">
                      <i className="simple-icon-social-instagram" />
                    </NavLink>
                  </li>
                </ul>
              </div>
            </CardBody>
          </Card>
        </Colxx>
        <Colxx xxs="12" lg="7" xl="8" className="col-right">
          <EditProfile
            editingMode={editingMode}
          />
        </Colxx>
      </Row>
    
    </>
  )
};
export default Account;
