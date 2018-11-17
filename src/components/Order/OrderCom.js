import React, { Component } from 'react';
import 'semantic-ui-css/semantic.css';
import { Image, Button, Table, Icon, Grid, Label, GridColumn } from 'semantic-ui-react'
import axios from 'axios';
// import MyRender from './Render';

import './style.css';


export default class OrderCom extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message:
				{ massageHidden: true, content: '', status: "" },
			product: [],
			index: 0
		}
		//this.onUpdate = this.onUpdate.bind(this);
		this.checkout = this.checkout.bind(this);

		this.getData();

		//authorization
		//axios.defaults.headers.common['Authorization'] = localStorage.getItem("token");
	}

	updateItem = (index, itemAttributes) => {
		this.setState({
			product: [
				...this.state.product.slice(0, index),
				Object.assign({}, this.state.product[index], itemAttributes),
				...this.state.product.slice(index + 1)
			]
		});
	}

	// Send Data to update database
	sendData = () => {
		const sent = {
			product: this.state.product
		}

		axios.post('/api/order/update', sent, { headers: { Authorization: localStorage.getItem("token") } })
			.then((res) => {
				console.log(res.data.status);
				this.getData();
			})
			.catch((error) => {
				this.setState({ cantLoad: true });
				this.setState({
					message:
					{
						massageHidden: false,
						// content: "Error : " + error.response.status + " => " + error.response.data.split("<pre>")[1].split("</pre>")[0],
						status: "negative"
					}
				}
				);
			})
	}

	// Remove a product in order
	removeItem = (index) => {
		const sent = {
			productID: this.state.product[index]._id
		}

		console.log(this.state.product[index]._id);

		axios.post('/api/order/remove_product_from_order', sent, { headers: { Authorization: localStorage.getItem("token") } })
			.then((res) => {
				console.log(res.data.status);
				this.getData();
			})
			.catch((error) => {
				this.setState({ cantLoad: true });
				this.setState({
					message:
					{
						massageHidden: false,
						// content: "Error : " + error.response.status + " => " + error.response.data.split("<pre>")[1].split("</pre>")[0],
						status: "negative"
					}
				}
				);
			})
	}

	removeOrder = () => {
		axios.get('/api/order/remove_order', { headers: { Authorization: localStorage.getItem("token") } })
			.then((res) => {
				console.log(res.data.status);
				this.getData();
			})
			.catch((error) => {
				this.setState({ cantLoad: true });
				this.setState({
					message:
					{
						massageHidden: false,
						// content: "Error : " + error.response.status + " => " + error.response.data.split("<pre>")[1].split("</pre>")[0],
						status: "negative"
					}
				}
				);
			})
	}

	// Get loaded Data from back-end
	getData = () => {
		axios.get('/api/order/load', { headers: { Authorization: localStorage.getItem("token") } })
			.then((res) => {
				this.setState({
					product: res.data.product
				});
			})
			.catch((error) => {
				this.setState({ cantLoad: true });
				this.setState({
					message:
					{
						massageHidden: false,
						// content: "Error : " + error.response.status + " => " + error.response.data.split("<pre>")[1].split("</pre>")[0],
						status: "negative"
					}
				}
				);
			});
	};

	checkout = () => {
		window.location = '/under';
	}

	render() {

		let Count = 1;

		return (
			<div>
				<h1>Order Cart</h1>
				<Table celled fixed>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell width='1'></Table.HeaderCell>
							<Table.HeaderCell width='5'>Product</Table.HeaderCell>
							<Table.HeaderCell width='2'>Price</Table.HeaderCell>
							<Table.HeaderCell width='4'>Amount</Table.HeaderCell>
							<Table.HeaderCell width='2'>Total</Table.HeaderCell>
							<Table.HeaderCell width='2'>Delete</Table.HeaderCell>
						</Table.Row>
					</Table.Header>

					{this.state.product.map((item, i) =>
						<Table.Body>
							<Table.Row>
								<Table.Cell width='1'>{Count++}</Table.Cell>
								<Table.Cell width='5'>
									<Image src={item.productImage} style={{ width: '20%', height: '20%', display: 'inline' }} />
									{item.name}
								</Table.Cell>
								<Table.Cell width='2'>{item.price}</Table.Cell>
								<Table.Cell width='4'>
									<Label className="PointerEdit button" onClick={() => { (this.state.product[i].amount-1) > 0 ? this.updateItem(i, { amount: this.state.product[i].amount - 1 }) : null }}>
										<Icon name="minus" fitted />
									</Label>
									{item.amount}
									<Label className="PointerEdit button" onClick={() => { this.updateItem(i, { amount: this.state.product[i].amount + 1 }) }}>
										<Icon name="plus" fitted />
									</Label>
								</Table.Cell>
								<Table.Cell width='2'>
									{item.price * item.amount}
								</Table.Cell>
								<Table.Cell width='2'>
									<Button color='red' icon='remove' onClick={() => { this.removeItem(i) }} />
								</Table.Cell>
							</Table.Row>
						</Table.Body>
					)}
				</Table>
				<Grid>
					<Grid.Column floated='left' width={5}>
						<Button primary onClick={() => { this.sendData() }} >Update</Button>
						<Button color='red' onClick={() => { this.removeOrder() }} >Clear</Button>

					</Grid.Column>
					<Grid.Column floated='right' width={3}>
						<Button primary onClick={() => {window.location='/confirm'}}>Checkout</Button>
					</Grid.Column>

				</Grid>


			</div>
		);
	}
}