import { parseISO } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { calendarApi } from '../api';
import { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvents } from '../store';
import { useAuthStore } from './useAuthStore';

export const useCalendarStore = () => {

	const dispatch = useDispatch();

	const { events, activeEvent } = useSelector(state => state.calendar);
	const { user } = useAuthStore(state => state.auth);

	const setActiveEvent = (calendarEvent) => {
		dispatch(onSetActiveEvent(calendarEvent));
	}

	const startSavingEvent = async calendarEvent => {

		try {

			if (calendarEvent.id) {
				//update
				await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
				dispatch(onUpdateEvent(calendarEvent));

			} else {

				//crear
				const { data } = await calendarApi.post('/events', calendarEvent)
				dispatch(onAddNewEvent({ ...calendarEvent, id: data.event.id, user }))

			}

		} catch (error) {

			Swal.fire('Save error', error.response.data?.msg || 'Try with the correct user', 'error')

		}

	}

	const startDeleteEvent = async () => {


		try {

			await calendarApi.delete(`/events/${activeEvent.id}`);
			dispatch(onDeleteEvent());

		} catch (error) {

			Swal.fire('Error deleting', error.response.data?.msg || 'Try with the correct user', 'error')

		}
	}

	const startLoadingEvents = async () => {
		try {

			const { data } = await calendarApi.get('/events');

			const events = data.events.map(event => ({
				...event,
				start: parseISO(event.start),
				end: parseISO(event.end),
			}))

			dispatch(onLoadEvents(events));

		} catch (error) {

		}
	}

	return {
		//* properties
		events,
		activeEvent,
		hasEventSelected: !!activeEvent,

		//* methods
		setActiveEvent,
		startDeleteEvent,
		startLoadingEvents,
		startSavingEvent,
	}
}
