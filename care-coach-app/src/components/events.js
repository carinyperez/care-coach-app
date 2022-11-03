import {Table, TextInput, Checkbox, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';


// POST: {DOMAIN}/events/ 
// Data: {"device": "Bob", "event": "Online", "timestamp": 0} 
// Return: Status code okay 

// storage/database 
let storage = {};

export const Events = () => {
	const addEvent = (device, event) => {
		// insert device, event and time stamp 
		const time = Date.now();
		storage[device] = {device, event, time};
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
	</div>

	)	
}

