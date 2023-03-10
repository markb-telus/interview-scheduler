import React, { useEffect } from "react";
import PropTypes from "prop-types";

import Confirm from "components/Appointment/Confirm";
import Empty from "components/Appointment/Empty";
import Error from "components/Appointment/Error";
import Form from "components/Appointment/Form";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Status from "components/Appointment/Status";

import useVisualMode from "hooks/useVisualMode";

import "components/Appointment/styles.scss";

const CONFIRM = "CONFIRM";
const CREATE = "CREATE";
const DELETING = "DELETING";
const ERROR_DELETE = "ERROR_DELETE";
const ERROR_SAVE = "ERROR_SAVE";
const EDIT = "EDIT";
const EMPTY = "EMPTY";
const SAVING = "SAVING";
const SHOW = "SHOW";

const Appointment = ({
	bookInterview, // func: updates an appointment with a new interview
	cancelInterview, // func: cancels an interview
	id, // number: the appointment id
	interview, // object: interview information
	interviewers, // array: list of available interviewers
	time, // string: the appointment time from state
	...props
}) => {
	const student = interview?.student || "";
	const interviewerName = interview?.interviewer?.name || "";
	const interviewerId = interview?.interviewer?.id || null;
	const defaultMode = EMPTY;
	const initialMode = interview ? SHOW : defaultMode;
	const { mode, transition, back } = useVisualMode(initialMode);

	useEffect(() => {
		if (interview && mode === EMPTY) {
			transition(SHOW);
		}
		if (interview === null && mode === SHOW) {
			transition(EMPTY);
		}
	}, [interview, transition, mode]);

	const save = (interviewData) => {
		transition(SAVING);
		const interview = {
			student: "",
			interviewer: 0,
		};

		interview.student = interviewData?.name || interview.student;
		interview.interviewer = interviewData?.interviewer || interview.interviewer;

		bookInterview(id, interview)
			.then(() => transition(SHOW))
			.catch((error) => {
				transition(ERROR_SAVE, true);
			});
	};

	const onEdit = () => transition(EDIT);

	const destroy = () => {
		transition(DELETING, true);
		cancelInterview(id)
			.then(() => transition(EMPTY))
			.catch((error) => {
				transition(ERROR_DELETE, true);
			});
	};

	const onConfirm = () => transition(CONFIRM);

	return (
		<article className="appointment" data-testid="appointment">
			<Header time={time} />
			{mode === DELETING && <Status message={"Deleting"} />}
			{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
			{mode === ERROR_DELETE && (
				<Error message={"Could not delete appointment"} onClose={back} />
			)}
			{mode === ERROR_SAVE && (
				<Error message={"Could not save appointment"} onClose={back} />
			)}
			{mode === CONFIRM && (
				<Confirm
					message={`Delete appointment for ${student} with ${interviewerName}?`}
					onConfirm={destroy}
					onCancel={back}
				/>
			)}
			{mode === SAVING && <Status message={"Saving"} />}
			{mode === SHOW && (
				<Show
					student={student}
					interviewer={interviewerName}
					id={id}
					onEdit={onEdit}
					onDelete={onConfirm}
				/>
			)}
			{mode === CREATE && (
				<Form
					student={student}
					interviewers={interviewers}
					onSave={save}
					onCancel={back}
				/>
			)}
			{mode === EDIT && (
				<Form
					student={student}
					interviewer={interviewerId}
					interviewers={interviewers}
					onSave={save}
					onCancel={back}
				/>
			)}
		</article>
	);
};

Appointment.propTypes = {
	bookInterview: PropTypes.func,
	cancelInterview: PropTypes.func,
	id: PropTypes.number,
	interview: PropTypes.object,
	interviewers: PropTypes.array,
	time: PropTypes.string,
};

export default Appointment;
