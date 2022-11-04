import {Table, TextInput, Checkbox, Button, Group, Box, Center} from '@mantine/core';
import { useForm } from '@mantine/form';
import {useState } from 'react';


// POST: {DOMAIN}/events/ 
// Data: {"device": "Bob", "event": "Online", "timestamp": 0} 
// Return: Status code okay 

// storage/database 
let storage = {};

export const Events = () => {
	const [sortTable, setIsTableSorted] = useState(null);

	const sort = (eventType) => {
		let sortOrder; 
		if(eventType === 'touched') {
			sortOrder = 1
		} else if(eventType === 'online') {
			sortOrder = 2
		} else if(eventType === 'offline') {
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
			// eslint-disable-next-line no-loop-func, array-callback-return
			Object.keys(storage).map((element) => {
				if(storage[element].sortOrder === counter) {
					sorted.push(storage[element])
				}
			})
			counter++;
		}
		setIsTableSorted(sorted)
		return sorted
	};

	const sortRows = sortTable?.map((element) => 
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
		<Box sx={{ maxWidth: 300}} mx="auto">
			<form onSubmit={form.onSubmit((values) => addEvent(values.device, values.event))}>
				<TextInput
					withAsterisk
					label="device"
					placeholder="enter your device name"
					{...form.getInputProps('device')} />
				<TextInput
					withAsterisk
					label="event"
					placeholder="enter your event name"
					{...form.getInputProps('event')} />
				<Checkbox
					mt="md"
					label="Submit event"
					{...form.getInputProps('checkbox', { type: 'checkbox' })} />
				<Group position="middle" mt="md">
					<Button type="submit">Submit</Button>
				</Group>
			</form>
		</Box>
		{ sortTable  ? 
			<>
				<h1>Sort Events</h1><Table>
						<thead>
							<tr>
								<th>Device</th>
								<th>Event</th>
								<th>Timestamp</th>
							</tr>
						</thead>
						<tbody>{sortRows}</tbody>
					</Table>
					</> : null
		}
		<Box sx={{ maxWidth: 500}} mx="auto">
		<Center style={{ width: 300, height: 200 }}>
			<Button onClick={sortedTable}>Sort Table</Button>
		</Center>
		</Box>
		
	</div>
	)	
}

