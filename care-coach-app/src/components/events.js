import {Table, TextInput, Checkbox, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';


// POST: {DOMAIN}/events/ 
// Data: {"device": "Bob", "event": "Online", "timestamp": 0} 
// Return: Status code okay 

// storage/database 
let storage = {};

export const Events = () => {


	const sort = (eventType) => {
		let sortOrder; 
		if(eventType === 'touched') {
			sortOrder = 1
		} else if(eventType === 'online') {
			sortOrder = 2
		} else if(eventType === 'online') {
			sortOrder = 3; 
		} else {
			sortOrder = 0;
		}
		return sortOrder
	}
	const addEvent = (device, event) => {
		// insert device, event and time stamp 
		const time = Date.now();
		const sortOrder = sort(event);
		storage[device] = {device, event, time, sortOrder};
		console.log(storage);
	  }
	  const form = useForm({
		initialValues: {
		  device: '',
		  event: '',
		  checkbox: false,
		},
		validate: {
		  device: (value) => (value.length < 1),
		  event: (value) => (value.length < 1),
		},
	  });

	
	  const rows = Object.keys(storage).map((element) => 
		(
		<tr key={storage[element]}>
		  <td>{storage[element].device}</td>
		  <td>{storage[element].event}</td>
		  <td>{storage[element].time}</td>
		</tr>
	  ));


	const sortedTable = () => {
		let counter = 1; 
		let sorted = [];
		for(let i = 0; i < 4; i++) {
			Object.keys(storage).map((element) => {
				if(storage[element].sortOrder === counter) {
					sorted.push(storage[element])
				}
			})
			counter++;
		}
		console.log(sorted);
		return sorted
	};
	
	
	const sorted = sortedTable(); 
	const sortRows = sorted.map((element) => 
	  (
	  <tr key={element}>
		<td>{element.device}</td>
		<td>{element.event}</td>
		<td>{element.time}</td>
	  </tr>
	));

	return (
		<div>
		<h1>Add Events</h1>
		<Table>
		<thead>
		<tr>
			<th>Device</th>
			<th>Event</th>
			<th>Timestamp</th>
		</tr>
		</thead>
		<tbody>{rows}</tbody>
		</Table>
		<Box sx={{ maxWidth: 300 }} mx="auto">
			<form onSubmit={form.onSubmit((values) => addEvent(values.device, values.event))}>
			<TextInput
				withAsterisk
				label="device"
				placeholder="enter your device name"
				{...form.getInputProps('device')}
			/>
			<TextInput
				withAsterisk
				label="event"
				placeholder="enter your event name"
				{...form.getInputProps('event')}
			/>
			<Checkbox
				mt="md"
				label="Submit event"
				{...form.getInputProps('checkbox', { type: 'checkbox' })}
			/>
			<Group position="right" mt="md">
				<Button type="submit">Submit</Button>
			</Group>
			</form>
		</Box>
		<h1>Sort Events</h1>
		<Table>
		<thead>
		<tr>
			<th>Device</th>
			<th>Event</th>
			<th>Timestamp</th>
		</tr>
		</thead>
		<tbody>{sortRows}</tbody>
		</Table>
		<Box sx={{ maxWidth: 300 }} mx="auto">
			<Button onClick={sortedTable}>Sort Table</Button>
		</Box>
	</div>

	)	
}

