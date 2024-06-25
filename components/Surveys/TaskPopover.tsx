import { useState } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '@components/ui/Popover/Popover';
import { Button } from '@components/ui/Buttons/Button';
import SmiliesRadioButton from '@components/Surveys/SmiliesRadioButton';
import * as React from 'react';
import { Control, Controller } from 'react-hook-form';
interface TaskPopoverProps {
  control: Control<any>; // Specify a more detailed type if known
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

export function TaskPopover({ control, tasks }: TaskPopoverProps) {
  const smilieSize = 7;

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
                        key={index}
                        value={smileyValue}
                        selectedValue={
                          value?.find((val: SmileySelection) => val.taskId === task.taskId && val.value === smileyValue)
                            ? smileyValue
                            : undefined
                        }
                        handleChange={(newValue: string) => {
                          const updatedValues: SmileySelection[] = [
                            ...value.filter((val: SmileySelection) => val.taskId !== task.taskId),
                            { taskId: task.taskId, value: newValue },
                          ];
                          onChange(updatedValues);
                        }}
                        altText={
                          ['Very Unhappy', 'Neutral', 'Happy', 'Very Happy', 'Very Happy', 'Very Unhappy'][index]
                        }
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
}
