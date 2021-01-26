import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	CustomInput,
	Label,
} from 'reactstrap';
import FormGroup from 'reactstrap/lib/FormGroup';
import IntlMessages from '../../helpers/IntlMessages';

const ChooseOrganizationModal = ({
	modalOpen, 
	toggleModal, 
	handleClickYes,
	previousOrganizationId,

	allOrganizations,
	error,
	isLoaded,
}) => {

	const [selectedItem, setSelectedItem] = useState(0);

	useEffect(() => {
		if (previousOrganizationId) {
			setSelectedItem(previousOrganizationId);
		} else {
			setSelectedItem(0);
		}
	}, [previousOrganizationId]);

	return (
		<Modal
			isOpen={modalOpen}
			toggle={() => toggleModal(!modalOpen)}
		>
			<ModalHeader>
				<IntlMessages id="settings.choose-organization-title" />
			</ModalHeader>
			<ModalBody>
				{isLoaded ? (
					<FormGroup>
						<Label for={`organizatoin-radio-${previousOrganizationId}`}>
							<IntlMessages id="settings.choose-organization-message" />
						</Label>
						<div>
							<CustomInput
								key={0}
								type='radio'
								id={`organizatoin-radio-null`}
								name='customRadio'
								label='NONE (No Orgranization)'
								checked={selectedItem === 0}
								onChange={(e) => {setSelectedItem(0)}}
							/>
						{allOrganizations.map((organization, i) => (
							<CustomInput
								key={i+``}
								type='radio'
								id={`organizatoin-radio-${organization.id}`}
								name='customRadio'
								label={organization.name}
								checked={selectedItem === organization.id}
								onChange={(e) => {setSelectedItem(organization.id)}}
							/>
						))}
						</div>
					</FormGroup>
				) : (
					<div className='loading' />
				)}
			</ModalBody>
			<ModalFooter>
				<Button
          color="primary"
          onClick={ () => {handleClickYes(selectedItem); toggleModal(false)} }
				>
					<IntlMessages id="modal.yes" />
				</Button>{' '}
				<Button
          color="secondary"
          onClick={() => toggleModal(false)}
				>
					<IntlMessages id="modal.no" />
				</Button>
			</ModalFooter>
		</Modal>
	)
}

const mapStateToProps = ({ organization }) => {
  const {
    allOrganizations,
    isLoaded,
    error,
  } = organization;

  return {
    allOrganizations,
    isLoaded,
    error,
  };
};
export default connect(mapStateToProps, {
  })(ChooseOrganizationModal);