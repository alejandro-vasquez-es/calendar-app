import { addHours } from 'date-fns';
import React from 'react'
import { useCalendarStore, useUiStore } from '../../hooks'

export const FabAddNew = () => {

	const { openDateModal } = useUiStore();
	const { setActiveEvent } = useCalendarStore();

	const handleclickNew = () => {
		setActiveEvent({
			title: '',
			notes: '',
			start: new Date(),
			end: addHours(new Date(), 2),
			bgColor: '#fafafa',
			user: {
				_id: '123',
				name: 'Alejandro'
			}
		})
		openDateModal();
	}

	return (
		<button
			onClick={handleclickNew}
			className="btn btn-primary fab"
		>
			<i className="fas fa-plus"></i>
		</button>
	)
}
