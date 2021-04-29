import React from 'react';
import { Col, Row } from 'react-bootstrap';

import Input from '../../../components/UI/Input';
import Modal from '../../../components/UI/Modal';

const AddCategoryModal = (props) => {
	const {
		show,
		handleClose,
		onSubmit,
		modalTitle,
		categoryName,
		setCategoryName,
		parentCategoryId,
		setParentCategoryId,
		categoryList,
		handleCategoryImage,
	} = props;
 
	return (
		<Modal show={show} onSubmit={onSubmit} handleClose={handleClose} modalTitle={modalTitle}>
			<Row>
				<Col>
					<Input
                    className="form-control-sm"
						value={categoryName}
						placeholder={`Category name`}
						onChange={(e) => setCategoryName(e.target.value)}
					/>
				</Col>

				<Col>
					<select
						className='form-control-sm'
						value={parentCategoryId}
						onChange={(e) => setParentCategoryId(e.target.value)}
					>
						<option>select category</option>
						{categoryList.map((option) => (
							<option key={option.value} value={option.value}>
								{option.name}
							</option>
						))}
					</select>
				</Col>
			</Row>

			<Row>
				<Col>
					<Input
                    className="form-control-sm"
						type='file'
						name='categoryImage'
						onChange={handleCategoryImage}
					/>
				</Col>
			</Row>
		</Modal>
	);
};

export default AddCategoryModal;
