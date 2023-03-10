const fixtures = {
	days: [
		{
			id: 1,
			name: "Monday",
			appointments: [1, 2],
			interviewers: [1, 2],
			spots: 1,
		},
		{
			id: 2,
			name: "Tuesday",
			appointments: [3, 4],
			interviewers: [3, 4],
			spots: 1,
		},
	],
	appointments: {
		1: { id: 1, time: "12pm", interview: null },
		2: {
			id: 2,
			time: "1pm",
			interview: { student: "Archie Cohen", interviewer: 2 },
		},
		3: {
			id: 3,
			time: "2pm",
			interview: { student: "Leopold Silvers", interviewer: 4 },
		},
		4: { id: 4, time: "3pm", interview: null },
	},
	interviewers: {
		1: {
			id: 1,
			name: "Sylvia Palmer",
			avatar: "https://i.imgur.com/LpaY82x.png",
		},
		2: {
			id: 2,
			name: "Tori Malcolm",
			avatar: "https://i.imgur.com/Nmx0Qxo.png",
		},
		3: {
			id: 3,
			name: "Mildred Nazir",
			avatar: "https://i.imgur.com/T2WwVfS.png",
		},
		4: {
			id: 4,
			name: "Cohana Roy",
			avatar: "https://i.imgur.com/FK8V841.jpg",
		},
	},
};

const api = {
	get: {
		"api/days": {
			status: 200,
			statusText: "OK",
			data: fixtures.days,
		},
		"api/appointments": {
			status: 200,
			statusText: "OK",
			data: fixtures.appointments,
		},
		"api/interviewers": {
			status: 200,
			statusText: "OK",
			data: fixtures.interviewers,
		},
	},
	put: {
		"api/days": {
			status: 204,
			statusText: "No Content",
		},
		"api/appointments": {
			status: 204,
			statusText: "No Content",
		},
		"api/interviewers": {
			status: 204,
			statusText: "No Content",
		},
	},
	delete: {
		"api/days": {
			status: 204,
			statusText: "No Content",
		},
		"api/appointments": {
			status: 204,
			statusText: "No Content",
		},
		"api/interviewers": {
			status: 204,
			statusText: "No Content",
		},
	},
};

export default {
	defaults: { baseURL: "" },
	get: jest.fn((url) => Promise.resolve(api.get[url])),
	put: jest.fn((url) => Promise.resolve(api.put[url])),
	delete: jest.fn((url) => Promise.resolve(api.delete[url])),
};
