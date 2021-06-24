import React from 'react';
import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
} from 'reactstrap';
import IntlMessages from '../../helpers/IntlMessages';

const DeleteCategoryModal = ({modalOpen, toggleModal, handleClickYes}) => {

	return (
		<Modal
			isOpen={modalOpen}
			toggle={() => toggleModal(!modalOpen)}
		>
			<ModalHeader>
				<IntlMessages id="category.delete-title" />
			</ModalHeader>
			<ModalBody>
				Are you sure to delete these category?
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
                    onClick={() => toggleModal(false)}
				>
					<IntlMessages id="modal.no" />
				</Button>
			</ModalFooter>
		</Modal>
	)
}

export default DeleteCategoryModal;