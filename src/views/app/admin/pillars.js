import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import {
    Row,
    Button,
    ButtonDropdown,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
  } from 'reactstrap';
import { Card, CustomInput, Badge } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import Moment from 'react-moment';
import IntlMessages from '../../../helpers/IntlMessages';

import AddNewModal from '../../../containers/pillars/AddNewModal';
import { getPillarList ,deletePillarItems} from '../../../redux/actions';

const getIndex = (value, arr, prop) => {
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i][prop] === value) {
        return i;
      }
    }
    return -1;
  };
function collect(props) {
    return { data: props.data };
  }
const Pillars = ({ 
    match ,
    pillarItems,
    getPillarListAction,
    deletePillarsAction

}) => {
  const [newModalOpen, setNewModalOpen] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [selectedPillar, setSelectedPillar] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);
  const [dropdownSplitOpen, setDropdownSplitOpen] = useState(false);
  const [lastChecked, setLastChecked] = useState(null);
  const handleAddModalOpen = () => {
    setSelectedPillar({});
    setIsEditModal(false);
    setNewModalOpen(true);
  }
  const handleChangeSelectAll = (isToggle) => {
    if (selectedItems.length >= pillarItems.length) {
      if (isToggle) {
        setSelectedItems([]);
      }
    } else {
      setSelectedItems(pillarItems.map((x) => x.id));
    }
    document.activeElement.blur();
    return false;
  };

  const handleEditModalOpen = (pillar) => {
    setSelectedPillar(pillar);
    setIsEditModal(true);
    setNewModalOpen(true);
  }
  const handleDeleteSelected = () => {
    deletePillarsAction({ids: selectedItems});
  }
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
      let newItems = [...pillarItems];
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


  useEffect(() => {
    getPillarListAction();

  }, []);
  
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.pillars" match={match} />
          <div className="text-zero top-right-button-container">
            <Button
              color="primary"
              size="lg"
              className="top-right-button"
              onClick={() => handleAddModalOpen()}
            >
              <IntlMessages id="pages.add-new" />
            </Button>
            {'  '}
            <ButtonDropdown
              isOpen={dropdownSplitOpen}
              toggle={() => setDropdownSplitOpen(!dropdownSplitOpen)}
            >
              <div className="btn btn-primary btn-lg pl-4 pr-0 check-button check-all">
                <CustomInput
                  className="custom-checkbox mb-0 d-inline-block"
                  type="checkbox"
                  id="checkAll"
                  checked={selectedItems.length||0 >= pillarItems ? pillarItems.length : 0}
                  onChange={() => handleChangeSelectAll(true)}
                  label={
                    <span
                      className={`custom-control-label ${
                        selectedItems.length||0 > 0 &&
                        selectedItems.length||0 < (pillarItems ? pillarItems.length : 0)
                          ? 'indeterminate'
                          : ''
                      }`}
                    />
                  }
                />
              </div>
              <DropdownToggle
                caret
                color="primary"
                className="dropdown-toggle-split btn-lg"
              />
              <DropdownMenu right>
                <DropdownItem  onClick={() => handleDeleteSelected()} >
                  <IntlMessages id="pages.delete"/>
                </DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </div>
         
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-4">
            {
                pillarItems.map((pillar, index) => { return(
                    <ContextMenuTrigger key={index} id="menu_id" data={pillar.id} collect={collect}>
                        <Card style={{marginBottom:'10px'}}
                            onClick={(event) => onCheckItem(event, pillar.id)}
                            className={classnames('d-flex flex-row', {
                                active: selectedItems.includes(pillar.id),
                            })}
                            >
                            <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                                <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                                <NavLink to={`?p=${pillar.id}`} className="w-40 w-sm-100">
                                    <p className="list-item-heading mb-1 truncate">
                                    {pillar.name}
                                    </p>
                                </NavLink>
                              
                                <p className="mb-1 text-muted text-small w-15 w-sm-100">
                                    <Moment format="YYYY-MM-DD">
                                    {pillar.created_at}
                                    </Moment>
                                </p>
                                
                                </div>
                                <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                                <CustomInput
                                    className="item-check mb-0"
                                    type="checkbox"
                                    id={`check_${pillar.id}`}
                                    checked={selectedItems.includes(pillar.id)}
                                    onChange={() => { }}
                                    label=""
                                />
                                </div>
                                <div className="float-right align-self-center mr-3" >
                                <Button
                                    size="xs"
                                    color="outline-success"
                                    className=""
                                    onClick={() => handleEditModalOpen(pillar)}
                                >
                                    <IntlMessages id="menu.edit" />
                                </Button>
                                </div>
                            </div>
                        </Card>
                    </ContextMenuTrigger>
                )})
            }
          
            <AddNewModal 
                isEdit={isEditModal}
                modalOpen={newModalOpen}
                toggleModal={() => setNewModalOpen(!newModalOpen)}
                pillar={selectedPillar}
            />
        </Colxx>
      </Row>
    </>
  );
};


const mapStateToProps = ({ pillar }) => {
    const { pillarItems } = pillar;
    console.log("pillarItems-->>",pillarItems)
    return {
        pillarItems
    };
  };
export default connect(mapStateToProps, {
    getPillarListAction: getPillarList,
    deletePillarsAction: deletePillarItems
})(Pillars)

