import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "components/InterviewerListItem.scss";

const InterviewerListItem = ({
	avatar, // string: interviewer image url
	id, // number.isRequired: interviewer id
	name, // string.isRequired: name of interviewer
	selected: isSelected, // bool.isRequired: if the interviewer is selected
	setInterviewer, // func.isRequired: onClick callback for interviewer <img>
	...props
}) => {
	const classLibrary = {
		li: {
			interviewers__item: true,
			"interviewers__item--selected": isSelected,
		},

		img: {
			"interviewers__item-image": true,
		},
	};

	const classLi = classNames(classLibrary.li);
	const classImg = classNames(classLibrary.img);

	return (
		<li className={classLi}>
			<img
				className={classImg}
				src={avatar}
				alt={name}
				data-name="interviewer"
				data-value={id}
				data-type="number"
				onClick={setInterviewer}
			/>
			{isSelected && name}
		</li>
	);
};

InterviewerListItem.propTypes = {
	avatar: PropTypes.string,
	id: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	selected: PropTypes.bool.isRequired,
	setInterviewer: PropTypes.func.isRequired,
};

export default InterviewerListItem;
