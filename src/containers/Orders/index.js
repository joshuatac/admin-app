import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateOrder } from '../../actions/order.action';
import Layout from '../../components/Layout';
import Card from '../../components/UI/Card';
import './style.css';
/**
 * @author
 * @function Orders
 **/

const Orders = (props) => {
	const order = useSelector((state) => state.order);
	const [type, setType] = useState('');
	const dispatch = useDispatch();
	const onOrderUpdate = (orderId) => {
		const payload = {
			orderId,
			type,
		};
		dispatch(updateOrder(payload));
	};

	const formatDate = (date) => {
		if (date) {
			const d = new Date(date);
			return `${d.getFullYear()} - ${d.getMonth() + 1} - ${d.getDate()}`;
		}
		return '';
	};

	return (
		<Layout sidebar>
			{order.orders.map((orderItem, index) => (
				<Card key={index} headerLeft={orderItem._id}>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							padding: '50px 50px',
							alignItems: 'center',
						}}
					>
						<div>
							<div className='title'>items</div>
							{orderItem.items.map((item, index) => (
								<div className='value' key={index}>
									{item.productId.name}
								</div>
							))}
						</div>
						<div> 
							<span className='title'>Total Price</span>
							<br />
							<span className='value'>{orderItem.totalAmount}</span>
						</div>

						<div>
							<span className='title'>Payment Type</span>
							<br />
							<span className='value'>{orderItem.paymentType}</span>
						</div>
						<div>
							<span className='title'>Payment Status</span>
							<br />
							<span className='value'>{orderItem.paymentStatus}</span>
						</div>
					</div>

					<div
						style={{
							boxSizing: 'border-box',
							padding: '100px',
							display: 'flex',
							alignContent: 'center',
						}}
					>
						<div className='orderTrack'>
							{orderItem.orderStatus.map((status) => (
								<div
									className={`orderStatus ${
										status.isCompleted ? 'active' : ''
									}`}
								>
									<div
										className={`point ${status.isCompleted ? 'active' : ''}`}
									></div>
									<div className='orderInfo'>
										<div className='status'>{status.type}</div>
										<div className='date'>{formatDate(status.date)}</div>
									</div>
								</div>
							))}
							{/* <div className='orderStatus'>
								<div className='point'></div>
								<div className='orderInfo'>
									<div className='status'>Packed</div>
									<div className='date'>Fri, 2021</div>
								</div>
							</div>

							<div className='orderStatus'>
								<div className='point'></div>
								<div className='orderInfo'>
									<div className='status'>Shipped</div>
									<div className='date'>Fri, 2021</div>
								</div>
							</div>
							<div className='orderStatus'>
								<div className='point'></div>
								<div className='orderInfo'>
									<div className='status'>Delivered</div>
									<div className='date'>Fri, 2021</div>
								</div>
							</div> */}
						</div>
						<div
							style={{
								padding: '0 50px',
								boxSizing: 'border-box',
							}}
						>
							<select onChange={(e) => setType(e.target.value)}>
								<option value={''}>Select Status</option>
								{orderItem.orderStatus.map((status) => {
									return (
										<>
											{!status.isCompleted ? (
												<option key={status.type} value={status.type}>
													{status.type}
												</option>
											) : null}
										</>
									);
								})}
							</select>
						</div>
						<div
							style={{
								padding: '0 50px',
								boxSizing: 'border-box',
							}}
						>
							<button onClick={() => onOrderUpdate(orderItem._id)}>
								Confirm
							</button>
						</div>
					</div>
				</Card>
			))}
		</Layout>
	);
};

export default Orders;
