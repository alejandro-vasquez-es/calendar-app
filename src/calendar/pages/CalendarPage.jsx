import { useEffect, useState } from 'react';
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Navbar, CalendarEvent, CalendarModal, FabAddNew, FabDelete } from '../'

import { getMessages, localizer } from '../../helpers';
import { useAuthStore, useCalendarStore, useUiStore } from '../../hooks';

export const CalendarPage = () => {

	const { user } = useAuthStore();
	const { openDateModal } = useUiStore();
	const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();
	const [lastView] = useState(localStorage.getItem('lastView') || 'week')

	const eventStyleGetter = (event) => {

		const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid)

		const style = {
			backgroundColor: isMyEvent ? '#347cf7' : '#465660',
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

	useEffect(() => {
		startLoadingEvents();
	}, [])



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
