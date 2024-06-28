import * as React from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '@components/ui/Popover/Popover';
import { Button } from '@components/ui/Buttons/Button';
import SmiliesRadioButton from '@components/Surveys/SmiliesRadioButton';
import { Control, Controller } from 'react-hook-form';

interface TaskPopoverProps {
  control: Control<any>; // eslint-disable-line
  tasks: TaskConfig[];
}

interface TaskConfig {
  taskId: string;
  buttonLabel: string;
}

interface SmileySelection {
  taskId: string;
  value: string;
}

const getSelectedSmileyValue = (value: SmileySelection[], taskId: string, smileyValue: string) =>
  value?.find((val: SmileySelection) => val.taskId === taskId && val.value === smileyValue) ? smileyValue : undefined;

const handleChange = (
  newValue: string,
  value: SmileySelection[],
  taskId: string,
  onChange: (updatedValues: SmileySelection[]) => void
) => {
  const updatedValues: SmileySelection[] = [
    ...value.filter((val: SmileySelection) => val.taskId !== taskId),
    { taskId, value: newValue },
  ];
  onChange(updatedValues);
};

const TaskPopover: React.FC<TaskPopoverProps> = ({ control, tasks }) => {
  const smilieSize = 30;

  return (
    <>
      {tasks.map((task) => (
        <Controller
          key={task.taskId}
          name="question2"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">{task.buttonLabel}</Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-4">
                <div className="flex flex-col space-y-4">
                  <div className="grid grid-cols-3 gap-2">
                    {['5', '4', '2', '3', '6', '1'].map((smileyValue, index) => (
                      <SmiliesRadioButton
                        key={smileyValue}
                        value={smileyValue}
                        selectedValue={getSelectedSmileyValue(value as SmileySelection[], task.taskId, smileyValue)}
                        handleChange={(newValue: string) =>
                          handleChange(newValue, value as SmileySelection[], task.taskId, onChange)
                        }
                        altText={['smily', 'shock', 'cry', 'sick', 'very-happy', 'angry'][index]}
                        imagePath={`/assets/Smilies/${['smily', 'shock', 'cry', 'sick', 'very-happy', 'angry'][index]}.png`}
                        size={smilieSize}
                      />
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        />
      ))}
    </>
  );
};

export default TaskPopover;