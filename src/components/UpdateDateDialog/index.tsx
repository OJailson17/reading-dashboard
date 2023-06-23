'use client';

import React, { useEffect, useState } from 'react';
import { Button, ConfigProvider, DatePicker } from 'antd';

import { DateModal, ModalContent } from './styles';
import { format } from 'date-fns';

interface DateRange {
	startedDate: string;
	finishedDate: string;
}

interface UpdateDateDialogProps {
	isDialogOpen: boolean;
	onChangeModalState: (modalState: boolean) => void;
	onGetBookDates: (props: DateRange) => void;
}

export const UpdateDateDialog = ({
	isDialogOpen,
	onChangeModalState,
	onGetBookDates,
}: UpdateDateDialogProps) => {
	const [rangeDatePicked, setRangeDatePicked] = useState<DateRange>();

	const handleFormatPickedData = (dates: any) => {
		const [startedDate, finishedDate] = dates.map((date: any) =>
			format(new Date(date['$d']), 'yyyy-MM-dd'),
		);

		setRangeDatePicked({
			startedDate,
			finishedDate,
		});
	};

	const handleGetPickedData = () => {
		const today = format(new Date(), 'yyyy-MM-dd');

		onChangeModalState(false);
		onGetBookDates({
			startedDate: rangeDatePicked?.startedDate || today,
			finishedDate: rangeDatePicked?.finishedDate || today,
		});
	};

	return (
		<ConfigProvider
			theme={{
				components: {
					Modal: {
						colorBgElevated: '#363447',
						colorPrimary: '#292738',
						colorText: 'white',
					},
				},
			}}
		>
			<DateModal
				title='Vertically centered modal dialog'
				centered
				open={isDialogOpen}
				onOk={handleGetPickedData}
				onCancel={() => onChangeModalState(false)}
				cancelButtonProps={{ style: { display: 'none' } }}
				keyboard
				closable={false}
				width={'90%'}
			>
				<ModalContent>
					<DatePicker.RangePicker
						onOpenChange={e => console.log('change', e)}
						onPanelChange={e => console.log('panel', e)}
						placement='topRight'
						onChange={e => handleFormatPickedData(e)}
					/>
				</ModalContent>
			</DateModal>
		</ConfigProvider>
	);
};
