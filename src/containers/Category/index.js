import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import './style.css';
import {
	getAllCategory,
	addCategory,
	updateCategories,
	deleteCategories as deleteCategoriesAction,
} from '../../actions';
import Layout from '../../components/Layout';
import Modal from '../../components/UI/Modal';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

import {
	IoIosCheckboxOutline,
	IoIosCheckbox,
	IoIosArrowForward,
	IoIosArrowDown,
	IoIosAdd,
	IoIosTrash,
	IoIosCloud,
} from 'react-icons/io';
import UpdateCategoriesModal from './components/UpdateCategoriesModal';
import AddCategoryModal from './components/AddCategoryModal';

/**
 * @author
 * @function Category
 **/

const Category = (props) => {
	const [show, setShow] = useState(false);
	const [checked, setChecked] = useState([]);
	const [expanded, setExpanded] = useState([]);
	const handleShow = () => setShow(true);
	const [categoryName, setCategoryName] = useState('');
	const [parentCategoryId, setParentCategoryId] = useState('');
	const [categoryImage, setCategoryImage] = useState('');
	const [checkedArray, setCheckedArray] = useState([]);
	const [expandedArray, setExpandedArray] = useState([]);
	const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
	const category = useSelector((state) => state.category);
	const dispatch = useDispatch();
	const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);

	useEffect(() => {
		if (!category.loading) {
			setShow(false);
		}
	}, [category.loading]);

	const handleClose = () => {
		if (categoryName === '') {
			alert('Category name cannot be Empty');
			setShow(false);
			return;
		}

		const form = new FormData();
		form.append('name', categoryName);
		form.append('parentId', parentCategoryId);
		form.append('categoryImage', categoryImage);
		dispatch(addCategory(form));
		setCategoryName('');
		setParentCategoryId('');
		setShow(false);
	};

	const renderCategories = (categories) => {
		let myCategories = [];
		for (let category of categories) {
			myCategories.push({
				label: category.name,
				value: category._id,
				children:
					category.children.length > 0 && renderCategories(category.children),
			});
		}

		return myCategories;
	};

	const createCategoryList = (categories, options = []) => {
		for (let category of categories) {
			options.push({
				value: category._id,
				name: category.name,
				parentId: category.parentId,
				type: category.type,
			});
			if (category.children.length > 0) {
				createCategoryList(category.children, options);
			}
		}

		return options;
	};

	const handleCategoryImage = (e) => {
		setCategoryImage(e.target.files[0]);
	};

	const handleCategoryInput = (key, value, index, type) => {
		if (type == 'checked') {
			const updatedCheckedArray = checkedArray.map((item, _index) =>
				index == _index ? { ...item, [key]: value } : item,
			);
			setCheckedArray(updatedCheckedArray);
		} else if (type == 'expanded') {
			const updatedExpandedArray = expandedArray.map((item, _index) =>
				index == _index ? { ...item, [key]: value } : item,
			);
			setExpandedArray(updatedExpandedArray);
		}
	};

	const updateCheckedAndExpandedCategories = () => {
		const categories = createCategoryList(category.categories);
		const checkedArray = [];
		const expandedArray = [];
		checked.length > 0 &&
			checked.forEach((categoryId, index) => {
				const category = categories.find(
					(category, _index) => categoryId == category.value,
				);
				category && checkedArray.push(category);
			});

		expanded.length > 0 &&
			expanded.forEach((categoryId, index) => {
				const category = categories.find(
					(category, _index) => categoryId == category.value,
				);
				category && expandedArray.push(category);
			});

		setCheckedArray(checkedArray);
		setExpandedArray(expandedArray);
	};

	const updateCategory = () => {
		updateCheckedAndExpandedCategories();
		setUpdateCategoryModal(true);
	};

	const updateCategoriesForm = () => {
		const form = new FormData();

		expandedArray.forEach((item, index) => {
			form.append('_id', item.value);
			form.append('name', item.name);
			form.append('parentId', item.parentId ? item.parentId : '');
			form.append('type', item.type);
		});

		checkedArray.forEach((item, index) => {
			form.append('_id', item.value);
			form.append('name', item.name);
			form.append('parentId', item.parentId ? item.parentId : '');
			form.append('type', item.type);
		});

		dispatch(updateCategories(form));
	};

	const deleteCategory = () => {
		updateCheckedAndExpandedCategories();
		setDeleteCategoryModal(true);
	};

	const deleteCategories = () => {
		const checkedIdsArray = checkedArray.map((item, index) => ({
			_id: item.value,
		}));
		const expandedIdsArray = expandedArray.map((item, index) => ({
			_id: item.value,
		}));
		const idsArray = expandedIdsArray.concat(checkedIdsArray);

		if (checkedIdsArray.length > 0) {
			dispatch(deleteCategoriesAction(checkedIdsArray)).then((result) => {
				if (result) {
					dispatch(getAllCategory());
					setDeleteCategoryModal(false);
				}
			});
		}
	};

	const renderDeleteCategoryModal = () => {
		return (
			<Modal
				modalTitle='Confirm Delete'
				show={deleteCategoryModal}
				handleClose={() => setDeleteCategoryModal(false)}
				buttons={[
					{
						label: 'No',
						color: 'primary',
						onClick: () => {
							alert('no');
						},
					},
					{
						label: 'Yes',
						color: 'danger',
						onClick: deleteCategories,
					},
				]}
			>
				<h5>Checked</h5>
				{checkedArray.map((item, index) => (
					<span key={index}>{item.name}</span>
				))}

				<h5>Expanded</h5>
				{expandedArray.map((item, index) => (
					<span key={index}>{item.name}</span>
				))}
			</Modal>
		);
	};

	const categoryList = createCategoryList(category.categories);
	return (
		<Layout sidebar>
			<Container>
				<Row>
					<Col md={12}>
						<div className='categoryAction'>
							<h3>Category</h3>
							<div className='buttons'>
								<span>Actions</span>

								<button onClick={handleShow}>
									<IoIosAdd /> Add
								</button>

								<button onClick={updateCategory}>
									<IoIosCloud /> Edit
								</button>
								<button onClick={deleteCategory}>
									<IoIosTrash /> Delete
								</button>
							</div>
						</div>
					</Col>
				</Row>
				<Row>
					<Col md={12}>
						<CheckboxTree
							nodes={renderCategories(category.categories)}
							checked={checked}
							expanded={expanded}
							onCheck={(checked) => setChecked(checked)}
							onExpand={(expanded) => setExpanded(expanded)}
							icons={{
								check: <IoIosCheckbox />,
								uncheck: <IoIosCheckboxOutline />,
								halfCheck: <IoIosCheckboxOutline />,
								expandClose: <IoIosArrowForward />,
								expandOpen: <IoIosArrowDown />,
							}}
						/>
					</Col>
				</Row>
			</Container>

			<AddCategoryModal
				show={show}
				handleClose={() => setShow(false)}
				onSubmit={handleClose}
				modalTitle={'Add New Category'}
				categoryName={categoryName}
				setCategoryName={setCategoryName}
				parentCategoryId={parentCategoryId}
				setParentCategoryId={setParentCategoryId}
				categoryList={categoryList}
				handleCategoryImage={handleCategoryImage}
			/>

			<UpdateCategoriesModal
				show={updateCategoryModal}
				onSubmit={updateCategoriesForm}
				handleClose={()	=> setUpdateCategoryModal(false)}
				modalTitle={'Update Category'}
				size='lg'
				expandedArray={expandedArray}
				checkedArray={checkedArray}
				handleCategoryInput={handleCategoryInput}
				categoryList={categoryList}
			/>
			{renderDeleteCategoryModal()}
		</Layout>
	);
};

export default Category;
