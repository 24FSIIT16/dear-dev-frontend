'use client';

import * as React from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '@components/ui/Popover/Popover';
import SmiliesRadioButton from '@components/Buttons/SmiliesRadioButton';
import { Button } from '@components/ui/Buttons/Button';
import { WorkKind } from '@/types/WorkKindType';

type TaskPopoverProps = {
  onSmilieChange: (taskId: number, value: string) => void;
  workKinds: Array<WorkKind>;
};

const TaskPopover: React.FC<TaskPopoverProps> = ({ onSmilieChange, workKinds }) => {
  const [openTaskId, setOpenTaskId] = React.useState<number | null>(null);

  const handleOpen = (taskId: number) => {
    setOpenTaskId(taskId);
  };

  const handleClose = () => {
    setOpenTaskId(null);
  };

  const handleChange = (taskId: number, value: string) => {
    onSmilieChange(taskId, value);
    handleClose();
  };

  return (
    <>
      {workKinds.map((task) => (
        <div key={task.id} className="mb-4">
          <Popover open={openTaskId === task.id} onOpenChange={(open) => (open ? handleOpen(task.id) : handleClose())}>
            <PopoverTrigger asChild>
              <Button variant="outline">{task.name}</Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="flex justify-center">
                <div className="grid grid-cols-6 gap-4">
                  {['5', '4', '2', '3', '6', '1'].map((value, index) => (
                    <SmiliesRadioButton
                      key={value}
                      value={value}
                      size={50}
                      handleChange={() => handleChange(task.id, value)}
                      altText={['Very Unhappy', 'Neutral', 'Happy', 'Very Happy', 'Very Happy', 'Very Unhappy'][index]}
                      imagePath={`/assets/Smilies/${['smily', 'shock', 'cry', 'sick', 'very-happy', 'angry'][index]}.png`}
                    />
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      ))}
    </>
  );
};

export default TaskPopover;
