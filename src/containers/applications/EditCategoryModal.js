import React, {useState} from 'react';
import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Input
} from 'reactstrap';
import IntlMessages from '../../helpers/IntlMessages';


const EditCategoryModal = ({modalOpen, toggleModal, handleClickSave,editItem}) => {
	const [newCategoryName, setNewCategoryName] = useState('');

	return (
		<Modal
			isOpen={modalOpen}
			toggle={() => toggleModal(!modalOpen)}
		>
			<ModalHeader>
				<IntlMessages id="category.edit-title" />
			</ModalHeader>
			<ModalBody>
				<Input 
					className="pt-1 pr-2 pb-1 pl-2"
					defaultValue={editItem.name}
					onChange={(event) =>
					setNewCategoryName(event.target.value)
					}
				/>
			</ModalBody>
			<ModalFooter>
				<Button
                    color="primary"
                    onClick={ () => {handleClickSave(newCategoryName); toggleModal(false)} }
				>
					<IntlMessages id="menu.save" />
				</Button>{' '}
				<Button
                    color="secondary"
                    onClick={() => toggleModal(false)}
				>
					<IntlMessages id="survey.cancel" />
				</Button>
			</ModalFooter>
		</Modal>
	)
}

export default EditCategoryModal;