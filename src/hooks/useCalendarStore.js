import { useDispatch, useSelector } from 'react-redux';
import { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } from '../store';

export const useCalendarStore = () => {

	const dispatch = useDispatch();

	const { events, activeEvent } = useSelector(state => state.calendar);

	const setActiveEvent = (calendarEvent) => {
		dispatch(onSetActiveEvent(calendarEvent));
	}

	const startSavingEvent = async calendarEvent => {
		//TODO: reach the backend

		if (calendarEvent._id) {
			//update
			dispatch(onUpdateEvent(calendarEvent));
		} else {
			//crear
			dispatch(onAddNewEvent({ _id: new Date().getTime(), ...calendarEvent }))
		}
	}

	const startDeleteEvent = () => {
		dispatch(onDeleteEvent());
	}

	return {
		//* properties
		events,
		activeEvent,
		hasEventSelected: !!activeEvent,

		//* methods
		setActiveEvent,
		startSavingEvent,
		startDeleteEvent
	}
}
