import React, { useState } from 'react';
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

import IntlMessages from '../../../helpers/IntlMessages';
import { resetPassword } from '../../../redux/user/actions';

const UserSchema = Yup.object().shape({
	originalPassword: Yup.string()
		.required('original password is required!'),
	newPassword: Yup.string()
		.required('new password is required!'),
	confirmPassword: Yup.string()
		.required('confirm password is required!'),
});

const ResetModal = ({
	modalOpen,
	toggleModal,
	resetPasswordAction,
	user
}) => {

	const addNewUser = (values, { setSubmitting }) => {
		if (values.newPassword != values.confirmPassword) {
			setEqualError("confirm password is not equal to new password")
		}
		else {
			resetPasswordAction(user.id, values.originalPassword, values.newPassword)
			toggleModal();
			setEqualError("");
		}
	}

	const [equalError, setEqualError] = useState("")

	return (
		<Modal
			isOpen={modalOpen}
			toggle={toggleModal}
			wrapClassName="modal-right"
			backdrop="static"
		>
			<Formik
				initialValues={{
					originalPassword: "",
					newPassword: "",
					confirmPassword: ""
				}}
				validationSchema={UserSchema}
				onSubmit={addNewUser}
			>
				{({
					handleSubmit,
					setFieldValue,
					setFieldTouched,
					values,
					errors,
					touched,
					isSubmitting
				}) => (
					<Form>
						<ModalHeader toggle={toggleModal}>
							<IntlMessages id="user.reset-password" />
						</ModalHeader>
						<ModalBody>
							<Label>
								<IntlMessages id="user.original-password" />{' '}<span className='luci-primary-color'>*</span>
							</Label>
							<Field
								className='form-control'
								name='originalPassword'
							/>
							{errors.originalPassword && touched.originalPassword && (
								<div className="invalid-feedback d-block">
									{errors.originalPassword}
								</div>
							)}
							<Label className="mt-3">
								<IntlMessages id="user.new-password" />{' '}<span className='luci-primary-color'>*</span>
							</Label>
							<Field
								className='form-control'
								name='newPassword'
							/>
							{errors.newPassword && touched.newPassword && (
								<div className="invalid-feedback d-block">
									{errors.newPassword}
								</div>
							)}
							<Label className="mt-3">
								<IntlMessages id="user.confirm-password" />{' '}<span className='luci-primary-color'>*</span>
							</Label>
							<Field
								className='form-control'
								name='confirmPassword'
							/>
							{errors.confirmPassword && touched.confirmPassword && (
								<div className="invalid-feedback d-block">
									{errors.confirmPassword}
								</div>
							)}
							{equalError && (
								<div className="invalid-feedback d-block">
									{equalError}
								</div>
							)}
						</ModalBody>
						<ModalFooter>
							<Button color="secondary" outline onClick={toggleModal}>
								<IntlMessages id="pages.cancel" />
							</Button>
							<Button color="primary" type="submit">
								<IntlMessages id="menu.save" />
							</Button>
						</ModalFooter>
					</Form>
				)}
			</Formik>
		</Modal>
	);
};

const mapStateToProps = ({ }) => { return {} };

export default connect(mapStateToProps, {
	resetPasswordAction: resetPassword
})(ResetModal);