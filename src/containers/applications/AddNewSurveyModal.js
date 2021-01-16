import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  CustomInput,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
} from 'reactstrap';
import Select from 'react-select';
import { Formik, Form, Field } from 'formik';

import CustomSelectInput from '../../components/common/CustomSelectInput';
import IntlMessages from '../../helpers/IntlMessages';

import { addSurveyItem } from '../../redux/actions';

const initialState = {
  title: '',
  label: {label: '', value: '', color: '', key: ''},
  category: {label: '', value: '', key: ''},
  status: 'ACTIVE',
};

const AddNewSurveyModal = ({
  modalOpen,
  toggleModal,
  labels,
  categoryItems,
  addSurveyItemAction,
}) => {
  const [state, setState] = useState(initialState);

  const addNewItem = (values) => {
    const newItem = {
      title: values.name,
      label: state.label.value,
      labelColor: state.label.color,
      category: state.category.value,
      status: state.status,
    };

    addSurveyItemAction(newItem);

    toggleModal();

    setState(initialState);
  };

  const validateName = (value) => {
    let error;
    if (!value) {
      error = 'Please enter the survey name';
    } else if (value.length < 2) {
      error = 'Name must be longer than 2 characters';
    }
    return error;
  };

  return (
    <Formik
      initialValues={{
        name: '',
      }}
      onSubmit={addNewItem}
    >
      {({handleSubmit, errors, touched}) => (
        <Modal
          isOpen={modalOpen}
          toggle={toggleModal}
          wrapClassName="modal-right"
          backdrop="static" 
        >
          <Form>
            <ModalHeader toggle={toggleModal}>
              <IntlMessages id="survey.add-new-title" />
            </ModalHeader>
            <ModalBody>
              <Label className="mt-4">
                <IntlMessages id="survey.title" />
              </Label>
              <Field
                className='form-control'
                name='name'
                validate={validateName}
              />
              {errors.name && touched.name && (
                <div className="invalid-feedback d-block">
                  {errors.name}
                </div>
              )}
              {/* <Input
                type="text"
                defaultValue={state.title}
                onChange={(event) =>
                  setState({ ...state, title: event.target.value })
                }
              /> */}

              <Label className="mt-4">
                <IntlMessages id="survey.category" />
              </Label>
              <Select
                components={{ Input: CustomSelectInput }}
                className="react-select"
                classNamePrefix="react-select"
                name="form-field-name"
                options={categoryItems.map((x, i) => {
                  return { label: x.name, value: x.id, key: i };
                })}
                value={state.category}
                onChange={(val) => setState({ ...state, category: val })}
              />
              <Label className="mt-4">
                <IntlMessages id="survey.label" />
              </Label>
              <Select
                components={{ Input: CustomSelectInput }}
                className="react-select"
                classNamePrefix="react-select"
                name="form-field-name"
                options={labels.map((x, i) => {
                  return {
                    label: x.label,
                    value: x.label,
                    key: i,
                    color: x.color,
                  };
                })}
                value={state.label}
                onChange={(val) => setState({ ...state, label: val })}
              />

              <Label className="mt-4">
                <IntlMessages id="survey.status" />
              </Label>
              <CustomInput
                type="radio"
                id="exCustomRadio"
                name="customRadio"
                label="COMPLETED"
                checked={state.status === 'COMPLETED'}
                onChange={(event) =>
                  setState({
                    ...state,
                    status: event.target.value === 'on' ? 'COMPLETED' : 'ACTIVE',
                  })
                }
              />
              <CustomInput
                type="radio"
                id="exCustomRadio2"
                name="customRadio2"
                label="ACTIVE"
                checked={state.status === 'ACTIVE'}
                onChange={(event) =>
                  setState({
                    ...state,
                    status: event.target.value !== 'on' ? 'COMPLETED' : 'ACTIVE',
                  })
                }
              />
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" outline onClick={toggleModal}>
                <IntlMessages id="survey.cancel" />
              </Button>
              <Button type="submit" color="primary">
                <IntlMessages id="survey.submit" />
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      )}
    </Formik>
  );
};

const mapStateToProps = ({ surveyListApp, categoryList }) => {
  const { labels } = surveyListApp;
  const { categoryItems } = categoryList;
  return {
    labels,
    categoryItems,
  };
};
export default connect(mapStateToProps, {
  addSurveyItemAction: addSurveyItem,
})(AddNewSurveyModal);
