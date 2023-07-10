import * as yup from 'yup';

export const bookSchema = yup.object({
	name: yup.string().trim().required(),
	icon_url: yup.string().trim().optional(),
	genres: yup.array().ensure().of(yup.string().required()).required(),
	author: yup.string().trim().required(),
	status: yup.string().oneOf(['To read', 'Reading', 'Finished']).required(),
	language: yup.string().oneOf(['Portuguese', 'English']).required(),
	qtd_page: yup.number().min(1).required(),
	current_page: yup.number().default(0).required(),
	goodreads_review: yup.string().trim().default('none').required(),
	started_date: yup
		.string()
		.trim()
		.when('status', {
			is: (value: string) => value === 'Reading' || value === 'Finished',
			then: schema => schema.required(),
			otherwise: schema => schema.nullable(),
		}),
	finished_date: yup
		.string()
		.trim()
		.when('status', {
			is: 'Finished',
			then: schema => schema.required(),
			otherwise: schema => schema.nullable(),
		}),
	book_review: yup.string().trim().optional().default('none'),
});
