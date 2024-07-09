'use client';

import * as React from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '@components/ui/Popover/Popover';
import SmiliesRadioButton from '@components/Surveys/SmiliesRadioButton';
import { Button } from '@components/ui/Buttons/Button';

type TaskPopoverProps = {
  onSmilieChange: (taskId: string, value: string) => void;
  tasks: Array<{ taskId: string; buttonLabel: string }>;
};

const TaskPopover: React.FC<TaskPopoverProps> = ({ onSmilieChange, tasks }) => {
  const [openTaskId, setOpenTaskId] = React.useState<string | null>(null);

  const handleOpen = (taskId: string) => {
    setOpenTaskId(taskId);
  };

  const handleClose = () => {
    setOpenTaskId(null);
  };

  const handleChange = (taskId: string, value: string) => {
    onSmilieChange(taskId, value);
    handleClose();
  };

  return (
    <>
      {tasks.map((task) => (
        <div key={task.taskId} className="mb-4">
          <Popover
            open={openTaskId === task.taskId}
            onOpenChange={(open) => (open ? handleOpen(task.taskId) : handleClose())}
          >
            <PopoverTrigger asChild>
              <Button variant="outline">{task.buttonLabel}</Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="flex justify-center">
                <div className="grid grid-cols-6 gap-4">
                  {['5', '4', '2', '3', '6', '1'].map((value, index) => (
                    <SmiliesRadioButton
                      key={value}
                      value={value}
                      size={50}
                      handleChange={() => handleChange(task.taskId, value)}
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
