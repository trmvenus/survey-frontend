import React from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
} from 'reactstrap';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';

import IntlMessages from '../../helpers/IntlMessages';
import { addPillarItem, updatePillarItem } from '../../redux/actions';

const PillarSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required!')
    .min(3, 'Name must be longer than 3 characters!'),
});

const AddNewModal = ({ 
  isEdit,
  modalOpen, 
  toggleModal, 
  pillar,
  addPillarItemAction,
  updatePillarItemAction
}) => {

  const addNewPillar = (values, { setSubmitting}) => {
    if(isEdit){
      updatePillarItemAction(pillar.id,{name:values.name})
    }else{
      addPillarItemAction(values);
    }
    toggleModal();
  }

  return (
    <Modal
      isOpen={modalOpen}
      toggle={toggleModal}
      wrapClassName="modal-right"
      backdrop="static"
    >
      <Formik
        initialValues={{
          name: pillar.name || '',
        }}
        validationSchema={PillarSchema}
        onSubmit={addNewPillar}
      >
        {({
          errors,
          touched,
        }) => (
          <Form>
            <ModalHeader toggle={toggleModal}>
                {isEdit? (
                    <IntlMessages id="pillar.edit-modal-title" />    
                      ):
                    <IntlMessages id="pillar.add-new-modal-title" />
                }
            </ModalHeader>
            <ModalBody>
              <Label>
                <IntlMessages id="organization.name" />{' '}<span className='luci-primary-color'>*</span>
              </Label>
              <Field
                className='form-control'
                name='name'
              />
              {errors.name && touched.name && (
                <div className="invalid-feedback d-block">
                  {errors.name}
                </div>
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" outline onClick={toggleModal}>
                <IntlMessages id="pages.cancel" />
              </Button>
              <Button color="primary" type="submit">
                {isEdit? (
                    <IntlMessages id="menu.save" />    
                      ):
                    <IntlMessages id="pages.submit" />
                }
                
              </Button>{' '}
            </ModalFooter>
          </Form>
        )}
        </Formik>
      </Modal>
  );
};

const mapStateToProps = ({  }) => {
  return {
  };
};

export default connect(mapStateToProps, {
  addPillarItemAction: addPillarItem,
  updatePillarItemAction: updatePillarItem,
})(AddNewModal);