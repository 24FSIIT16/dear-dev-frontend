import { useState } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '@components/ui/Popover/Popover';
import { Button } from '@components/ui/Buttons/Button';
import SmiliesRadioButton from '@components/Surveys/SmiliesRadioButton';
import * as React from 'react';
import { Controller } from 'react-hook-form';
// @ts-ignore
export function TaskPopover({ control }) {
  // @ts-ignore
  return (
    <Controller
      name="question2"
      control={control}
      render={({ field: { onChange, value } }) => (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">DEAR-90 create..</Button>
          </PopoverTrigger>
          <PopoverContent className="w-30 p-4">
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col">
                {['5', '4', '2', '3', '6', '1'].map((smileyValue, index) => (
                  <SmiliesRadioButton
                    key={index}
                    value={smileyValue}
                    selectedValue={value?.value === smileyValue ? smileyValue : undefined}
                    handleChange={(newValue) => onChange({ taskId: 'DEAR-90', value: newValue })}
                    altText={['Very Unhappy', 'Neutral', 'Happy', 'Very Happy', 'Very Happy', 'Very Unhappy'][index]}
                    imagePath={`/assets/Smilies/${['smily', 'shock', 'cry', 'sick', 'very-happy', 'angry'][index]}.png`}
                  />
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      )}
    />
  );
}
