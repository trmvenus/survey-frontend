import React from 'react';
import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
} from 'reactstrap';
import IntlMessages from '../../helpers/IntlMessages';

const CopySurveyModal = ({modalOpen, toggleModal, handleClickYes, handleClickNo}) => {

	return (
		<Modal
			isOpen={modalOpen}
			toggle={() => toggleModal(!modalOpen)}
		>
			<ModalHeader>
				<IntlMessages id="survey.copy-title" />
			</ModalHeader>
			<ModalBody>
				Would you like to copy these surveys with responses?
			</ModalBody>
			<ModalFooter>
				<Button
          color="primary"
          onClick={ () => {handleClickYes(); toggleModal(false)} }
				>
					<IntlMessages id="modal.yes" />
				</Button>{' '}
				<Button
          color="secondary"
          onClick={() => {handleClickNo(); toggleModal(false)}}
				>
					<IntlMessages id="modal.no" />
				</Button>
			</ModalFooter>
		</Modal>
	)
}

export default CopySurveyModal;