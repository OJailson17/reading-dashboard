'use client';

import { useEffect, useState } from 'react';
import { ImSpinner2 } from 'react-icons/im';

import { useMultiForm } from '@/context/MultiFormContext';

interface MultiStepFormActionsProps {
  onHandleBack?: () => void;
  onHandleSubmit?: () => void;
  isLoading?: boolean;
  removeEvents?: boolean;
}

export const MultiStepFormActions = (props: MultiStepFormActionsProps) => {
  const { isLoading, onHandleSubmit } = props;

  const { step, onHandleBack } = useMultiForm();

  const [removeButtonEvents, setRemoveButtonEvents] = useState(false);

  // When the function removeEvent is passed the buttons events are disabled when selects is open
  // This is necessary to avoid click when the buttons are behind a select option
  useEffect(() => {
    if (!props.removeEvents) {
      setTimeout(() => {
        setRemoveButtonEvents(false);
      }, 50);
    } else {
      setRemoveButtonEvents(props.removeEvents);
    }
  }, [props.removeEvents]);

  return (
    <div className="flex w-full items-center gap-4">
      {step > 1 && (
        <button
          type="button"
          onClick={onHandleBack}
          style={{ pointerEvents: removeButtonEvents ? 'none' : 'auto' }}
          className="flex items-center justify-center rounded-md bg-purple px-8 py-2 text-lg font-bold text-white"
        >
          Back
        </button>
      )}
      <button
        type="button"
        onClick={onHandleSubmit}
        style={{ pointerEvents: removeButtonEvents ? 'none' : 'auto' }}
        className="flex min-h-11 min-w-32 items-center justify-center rounded-md  bg-purple px-8 py-2 text-lg font-bold text-white"
      >
        {!isLoading ? (
          step >= 9 ? (
            'Create'
          ) : (
            'Next'
          )
        ) : (
          <ImSpinner2 className="animate-spin text-white" size={18} />
        )}
      </button>
    </div>
  );
};
