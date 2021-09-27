import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Row,
  Button,
  Card,
  CardHeader,
  CardBody,
  Nav,
  NavItem,
  Badge,
  TabContent,
  TabPane,
  Input
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';

// Redux
import { getAdditionalUserInfo, updateUserProfile } from '../../../redux/actions';

// Components
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import SingleLightbox from '../../../components/pages/SingleLightbox';
import { NotificationManager } from '../../../components/common/react-notifications';

// Containers
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import EditProfile from '../../../containers/settings/EditProfile';
import EditDescription from '../../../containers/settings/EditDescription';

// Helpers
import { getCurrentUser } from '../../../helpers/Utils';
import IntlMessages from '../../../helpers/IntlMessages';
import { getRoleName, UserRole } from '../../../helpers/authHelper';
import ResetModal from './resetModal';


const ProfileSettings = ({
  match,

  additionalUserInfo,
  authUserError,

  getAdditionalUserInfoAction,
  updateUserProfileAction,
}) => {
  const profileFormRef = useRef();
  const descriptionFormRef = useRef();

  const [currentUser] = useState(getCurrentUser());
  const [editingMode, setEditingMode] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [newModalOpen, setNewModalOpen] = useState(false);

  const handleChangeEditingMode = () => {
    if (editingMode) {
      if (profileFormRef.current) {
        if (!profileFormRef.current.isValid) {
          return;
        }

        const profileValues = profileFormRef.current.values;
        const descriptionValues = descriptionFormRef.current.values;

        updateUserProfileAction({
          name: profileValues.name,
          location: profileValues.location,
          birthday: profileValues.birthday,
          gender: profileValues.gender.value,
          short_description: descriptionValues.shortDesc,
          long_description: descriptionValues.longDesc,
        });
      }
    }

    setEditingMode(!editingMode);
  }

  useEffect(() => {
    getAdditionalUserInfoAction();
  }, [])

  useEffect(() => {
    if (authUserError) {
      NotificationManager.warning(authUserError.message ?? authUserError, 'Profile Page Error', 3000, null, null, '');
    }
  }, [authUserError]);

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <div className="text-zero top-right-button-container">
            <Button
              color={editingMode ? "outline-primary" : "outline-primary"}
              size="lg"
              className="top-right-button mr-3"
              onClick={handleChangeEditingMode}
            >
              {(editingMode) ? (
                <IntlMessages id="menu.save" />
              ) : (
                <IntlMessages id="menu.edit" />
              )}
            </Button>
          </div>
          <Breadcrumb heading="menu.profile" match={match} />
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
                {additionalUserInfo.short_description}
              </p>
              <p className="text-muted text-small mb-2">
                <IntlMessages id="pages.location" />
              </p>
              <p className="mb-3">{additionalUserInfo.location}</p>
              <p className="text-muted text-small mb-2">
                <IntlMessages id="profile.role" />
              </p>
              <p className="mb-3">
                <Badge
                  color={currentUser.role === UserRole.Admin ? 'outline-primary' : currentUser.role === UserRole.OrgAdmin ? 'outline-secondary' : 'outline-info'}
                  className="mb-1 mr-1"
                  pill
                >
                  {getRoleName(currentUser.role)}
                </Badge>
                <Badge
                  color={currentUser.is_active == true ? 'outline-success' : 'outline-danger'}
                  className="mb-1 mr-1"
                  pill
                >
                  {currentUser.is_active == true ? 'activated' : 'not activated'}
                </Badge>
              </p>
              <div className="float-right align-self-center mr-1" >
                <Button
                  size="xs"
                  color="outline-secondary"
                  className=""
                  onClick={() => setNewModalOpen(true)}
                >
                  <IntlMessages id="user.reset-password-button" />
                </Button>
              </div>
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
          <Card className="mb-4">
            <CardHeader>
              <Nav tabs className="card-header-tabs ">
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: activeTab === 'profile',
                      'nav-link': true,
                    })}
                    onClick={() => setActiveTab('profile')}
                    to="#"
                    location={{}}
                  >
                    <IntlMessages id="profile.profile-title" />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: activeTab === 'description',
                      'nav-link': true,
                    })}
                    onClick={() => setActiveTab('description')}
                    to="#"
                    location={{}}
                  >
                    <IntlMessages id="profile.description-title" />
                  </NavLink>
                </NavItem>
              </Nav>
            </CardHeader>

            <TabContent activeTab={activeTab}>
              <TabPane tabId="profile">
                <EditProfile
                  editingMode={editingMode}
                  formRef={profileFormRef}
                />
              </TabPane>
              <TabPane tabId="description">
                <EditDescription
                  editingMode={editingMode}
                  formRef={descriptionFormRef}
                />
              </TabPane>
            </TabContent>
          </Card>
        </Colxx>
      </Row>
      <ResetModal
        user={currentUser}
        modalOpen={newModalOpen}
        toggleModal={() => setNewModalOpen(!newModalOpen)}
      />
    </>
  )
};

const mapStateToProps = ({ authUser }) => ({
  additionalUserInfo: authUser.additionalInfo,
  authUserError: authUser.error,
});

export default connect(mapStateToProps, {
  getAdditionalUserInfoAction: getAdditionalUserInfo,
  updateUserProfileAction: updateUserProfile,
})(ProfileSettings);
