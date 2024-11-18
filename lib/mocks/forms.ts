import { Form } from '@/lib/types';

export const mockForms: Form[] = [
	{
		id: "m5gr84i9",
		title: "Student Club Formation Approval Form",
		createdAt: "2024-10-24T08:06:14+08:00",
		modifiedAt: "2024-10-29T09:24:09+08:00",
		questions: [
			{
				id: "1",
				question: "Name of the Club",
				type: "short",
				required: true,
			},
			{
				id: "2",
				question: "STATEMENT OF CLUB'S PURPOSE, GOALS, AND ACTIVITIES",
				type: "paragraph",
				required: true,
			},
			{
				id: "3",
				question: "CLUB CATEGORIZATION",
				type: "checkbox",
				required: true,
				options: [
					{
						id: "agriculture",
						option: "agriculture",
						value: false,
					},
					{
						id: "art",
						option: "Art/Music/Performance",
						value: false,
					},
					{
						id: "culture",
						option: "Culture",
						value: false,
					},
					{
						id: "Athletic",
						option: "Athletic",
						value: false,
					},
					{
						id: "Science",
						option: "Science / Technology",
						value: false,
					},
					{
						id: "business",
						option: "Business/Economic",
						value: false,
					},
					{
						id: "community",
						option: "Community Service/Social Justice",
						value: false,
					},
				]
			},
			{
				id: "4",
				question: "A list of club members' names and signatures been attached?",
				description: "Clum members must sign to indicate that they will abide by all school rules and the rules outlined in this form",
				type: "select",
				required: false,
				options: [
					{
						id: 'y',
						option: "Yes",
						value: false,
					},
					{
						id: 'n',
						option: "No",
						value: false,
					}
				]
			},
			{
				id: "5",
				question: "Name of the faculty advisor/supervisor",
				type: "short",
				required: true,
			},
			{
				id: "6",
				question: "Approval of the faculty advisor/supervisor",
				description: "Upload approval form signed by the the faculty advisor/supervisor. You can get the form here",
				type: "short",
				required: true,
			}
		],
	},
	{
		id: "3u1reuv4",
		title: "Sample Survey",
		createdAt: "2024-11-08T02:47:29+08:00",
		modifiedAt: "2024-11-08T02:47:29+08:00",
		questions: [
			{
				id: "q1",
				question: "What is your name?",
				type: "short",
				required: true,
			},
			{
				id: "q2",
				question: "Tell us about yourself.",
				type: "paragraph",
				description: "You can share anything you'd like.",
				required: false,
			},
			{
				id: "q3",
				question: "What is your favorite color?",
				type: "select",
				required: true,
				options: [
					{ id: "o1", option: "Red", value: false },
					{ id: "o2", option: "Blue", value: false },
					{ id: "o3", option: "Green", value: false },
				],
				shuffleOptions: true,
			},
			{
				id: "q4",
				question: "Which hobbies do you enjoy?",
				type: "checkbox",
				required: true,
				options: [
					{ id: "o1", option: "Reading", value: false },
					{ id: "o2", option: "Traveling", value: false },
					{ id: "o3", option: "Cooking", value: false },
				],
				shuffleOptions: false,
				maxSelections: 2,
			},
			{
				id: "q5",
				question: "Choose your preferred programming language.",
				type: "radio",
				required: true,
				options: [
					{ id: "o1", option: "JavaScript", value: false },
					{ id: "o2", option: "Python", value: false },
					{ id: "o3", option: "Java", value: false },
				],
				shuffleOptions: true,
			},
			{
				id: "q6",
				question: "Select a date for your appointment.",
				type: "date",
				required: true,
			},
			{
				id: "q7",
				question: "What time works best for you?",
				type: "time",
				required: false
			},
		],
	},
	{
		id: "derv1ws0",
		title: "Student Vehicle Registration (empty)",
		createdAt: "2024-11-06T02:37:35+08:00",
		modifiedAt: "2024-10-28T04:20:15+08:00",
		questions: [],
	},
];
