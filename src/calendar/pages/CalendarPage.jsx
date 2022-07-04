import { useState } from 'react';
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Navbar, CalendarEvent, CalendarModal, FabAddNew, FabDelete } from '../'

import { getMessages, localizer } from '../../helpers';
import { useCalendarStore, useUiStore } from '../../hooks';

export const CalendarPage = () => {

	const { openDateModal } = useUiStore();
	const { events, setActiveEvent } = useCalendarStore();
	const [lastView] = useState(localStorage.getItem('lastView') || ' week')

	const eventStyleGetter = () => {

		const style = {
			backgroundColor: '#347cf7',
			borderRadius: '0px',
			opacity: 0.8,
			color: 'white'
		}

		return { style };
	}

	const onDoubleclick = (event) => {
		openDateModal();
	}

	const onSelect = (event) => {
		setActiveEvent(event);
	}

	const onViewchanged = event => {
		localStorage.setItem('lastView', event);
	}


	return (
		<>
			<Navbar />
			<div>
				<Calendar
					messages={getMessages()}
					localizer={localizer}
					events={events}
					defaultView={lastView}
					startAccessor="start"
					endAccessor="end"
					style={{ height: "calc( 100vh  - 80px )" }}
					eventPropGetter={eventStyleGetter}
					components={{
						event: CalendarEvent
					}}
					onDoubleClickEvent={onDoubleclick}
					onSelectEvent={onSelect}
					onView={onViewchanged}
				/>

				<CalendarModal />

				<FabAddNew />
				<FabDelete />
			</div>
		</>
	)
}
