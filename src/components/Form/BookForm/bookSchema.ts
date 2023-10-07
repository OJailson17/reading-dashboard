import * as yup from 'yup';

export const bookSchema = yup.object({
	name: yup.string().trim().required('name is required'),
	icon_url: yup.string().trim().optional(),
	genres: yup
		.array()
		.ensure()
		.of(yup.string().required())
		.required('genre is required'),
	author: yup.string().trim().required('author is required'),
	status: yup
		.string()
		.oneOf(['To read', 'Reading', 'Finished'])
		.required('status is required'),
	language: yup
		.string()
		.oneOf(['Portuguese', 'English', 'Spanish'])
		.required('language is required'),
	qtd_page: yup
		.number()
		.min(1, 'it must be grater than or equal to 1')
		.required('page quantity is required')
		.typeError('pages quantity needs to be a number'),
	current_page: yup
		.number()
		.default(0)
		.required()
		.typeError('current page needs to be a number'),
	goodreads_review: yup
		.string()
		.trim()
		.default('none')
		.required('goodreads review is required'),
	started_date: yup
		.string()
		.trim()
		.when('status', {
			is: (value: string) => value === 'Reading' || value === 'Finished',
			then: schema => schema.required('started date is required'),
			otherwise: schema => schema.nullable(),
		}),
	finished_date: yup
		.string()
		.trim()
		.when('status', {
			is: 'Finished',
			then: schema =>
				schema.required('started and finished dates are required'),
			otherwise: schema => schema.nullable(),
		}),
	book_review: yup.string().trim().optional().default('none'),
});
