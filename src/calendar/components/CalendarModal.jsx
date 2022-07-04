import { useEffect, useMemo, useState } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import Modal from 'react-modal'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useUiStore } from '../../hooks/useUiStore';
import { useCalendarStore } from '../../hooks';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	}
}

Modal.setAppElement('#root');

export const CalendarModal = () => {

	const { isDateModalOpen, closeDateModal } = useUiStore();
	const { activeEvent, startSavingEvent } = useCalendarStore();
	const [formSubmitted, setFormSubmitted] = useState(false);

	const [formValues, setFormValues] = useState({
		title: 'title ',
		notes: 'notes ',
		start: new Date(),
		end: addHours(new Date(), 3)
	});

	useEffect(() => {

		if (activeEvent !== null) {
			setFormValues(activeEvent);
		}

	}, [activeEvent]);


	const titleClass = useMemo(() => {
		if (!formSubmitted) return '';

		return (formValues.title.length <= 0) && 'is-invalid';

	}, [formValues.title, formSubmitted])

	const onInputchange = ({ target }) => {
		setFormValues({
			...formValues,
			[target.name]: target.value
		})
	}

	const onDatechange = (event, changing) => {
		setFormValues({
			...formValues,
			[changing]: event
		})
	}

	const onCloseModal = () => {
		closeDateModal();
	}

	const onSubmit = async event => {
		event.preventDefault();
		setFormSubmitted(true);

		const difference = differenceInSeconds(formValues.end, formValues.start)

		if (isNaN(difference) || difference <= 0) {
			Swal.fire('Wrong dates', 'Change the dates', 'error');
			return
		}

		if (formValues.title.length <= 0) return;

		await startSavingEvent(formValues);
		closeDateModal();
		setFormSubmitted();

	}


	return (

		<Modal
			isOpen={isDateModalOpen}
			onRequestClose={onCloseModal}
			style={customStyles}
			classNmae="modal"
			overlayClassName="modal-fondo"
			closeTimeoutMS={300}
		// contentLabel="Example Modal"
		>
			<h1> New Event </h1>
			<hr />
			<form
				className="container"
				onSubmit={onSubmit}
			>

				<div className="form-group mb-2">
					<label>start date and time</label>
					<DatePicker
						selected={formValues.start}
						dateFormat="Pp"
						onChange={(event) => onDatechange(event, 'start')}
						className="form-control"
						showTimeSelect
					/>
				</div>

				<div className="form-group mb-2">
					<label>End Date and time</label>
					<DatePicker
						minDate={formValues.start}
						selected={formValues.end}
						dateFormat="Pp"
						onChange={(event) => onDatechange(event, 'end')}
						showTimeSelect
						className="form-control"
					/>
				</div>

				<hr />
				<div className="form-group mb-2">
					<label>Title and notes</label>
					<input
						type="text"
						className={`form-control ${titleClass}`}
						placeholder="Event title"
						name="title"
						autoComplete="off"
						value={formValues.title}
						onChange={onInputchange}
					/>
					<small id="emailHelp" className="form-text text-muted">A short description</small>
				</div>

				<div className="form-group mb-2">
					<textarea
						type="text"
						className="form-control"
						placeholder="Notes"
						rows="5"
						name="notes"
						value={formValues.notes}
						onChange={onInputchange}
					></textarea>
					<small id="emailHelp" className="form-text text-muted">Additional information</small>
				</div>

				<button
					type="submit"
					className="btn btn-outline-primary btn-block"
				>
					<i className="far fa-save"></i>
					<span> Save</span>
				</button>

			</form>
		</Modal>
	)
}
