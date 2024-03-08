'use server';

import { notion } from '@/lib/notion';
import {
	APIErrorCode,
	ClientErrorCode,
	isNotionClientError,
} from '@notionhq/client';
import { revalidateTag } from 'next/cache';

type ResultResponse = {
	id: string;
	properties: {
		monthly_goal: {
			number: number;
		};
		yearly_goal: {
			number: number;
		};
	};
};

type Goal = {
	month: number;
	year: number;
};

type UpdateGoalsProps = {
	goal: Goal;
	page_id: string;
};

export const updateGoals = async ({ goal, page_id }: UpdateGoalsProps) => {
	try {
		await notion.pages.update({
			page_id: page_id,
			properties: {
				monthly_goal: {
					number: goal.month,
				},
				yearly_goal: {
					number: goal.year,
				},
			},
		});

		revalidateTag('sign-in');

		return {
			status: 201,
		};
	} catch (error) {
		if (isNotionClientError(error)) {
			switch (error.code) {
				case ClientErrorCode.RequestTimeout:
					return {
						error: 'Request Timeout',
					};

				case APIErrorCode.ObjectNotFound:
					return {
						error: 'Object not found',
					};

				case APIErrorCode.Unauthorized:
					return {
						error: 'Unauthorized',
					};

				default:
					console.log(error);
					return {
						status: 400,
						message: error.message,
					};
			}
		}
	}

	return {
		error: 'error',
		status: 400,
	};
};
