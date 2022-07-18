import { useCalendarStore } from '../../hooks'

export const FabDelete = () => {

	const { startDeleteEvent, hasEventSelected } = useCalendarStore();

	const handleClickDelete = () => {
		//Todo: Llegar al backend
		startDeleteEvent();
	}

	return (
		<button
			onClick={handleClickDelete}
			className="btn btn-danger fab-danger"
			style={{
				display: hasEventSelected ? '' : 'none'
			}}
		>
			<i className="fas fa-trash-alt"></i>
		</button>
	)
}
