
import React from 'react'

export const CalendarEvent = (props) => {

	const { title, user } = props.event;

	return (
		<>
			<strong>{title}</strong>
			<span> - {user.name}</span>
		</>
	)
}
