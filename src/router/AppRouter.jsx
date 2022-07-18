import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { LoginPage } from '../auth'
import { Spinner } from '../auth/components/loader/Spinner'
import { CalendarPage } from '../calendar'
import { useAuthStore } from '../hooks'

export const AppRouter = () => {

	const { status, checkAuthToken } = useAuthStore();
	useEffect(() => {
		checkAuthToken();
	}, [])

	if (status == 'checking') {
		return (<Spinner color="#5c96f8" />)
	}


	return (
		<Routes>
			{
				(status == 'not-authenticated')
					? (
						<>
							<Route path="/auth/*" element={<LoginPage />} />
							<Route path="/*" element={<Navigate to="/auth/login" />} />
						</>

					)
					: (
						<>
							<Route path="/" element={<CalendarPage />} />
							<Route path="/*" element={<Navigate to="/" />} />
						</>
					)
			}
			<Route path="/*" element={<Navigate to="/auth/login" />} />
		</Routes>
	)
}
