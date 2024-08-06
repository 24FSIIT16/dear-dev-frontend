import * as React from 'react';
import { Card, CardContent, CardHeader } from '@components/ui/Card/Card';
import { motion, useAnimation } from 'framer-motion';
import { CalendarRange } from 'lucide-react';

interface SprintDateWidgetProps {
  date: string | undefined;
  description: string;
}

const SprintDateWidget: React.FC<SprintDateWidgetProps> = ({ date, description }) => {
  const controls = useAnimation();

  const handleHoverStart = () => {
    controls.start({
      y: [-30, 30],
    });
  };

  const handleHoverEnd = () => {
    controls.stop();
    controls.set({ y: 0 });
  };

  return (
    <motion.div onHoverStart={handleHoverStart} onHoverEnd={handleHoverEnd}>
      <Card className="group flex h-full w-full flex-col rounded-2xl border-none bg-primaryGreen-light shadow-none hover:bg-primaryGreen-main">
        <CardHeader className="flex flex-row">
          <div className="flex-1" />
          <div className="rounded-full bg-primaryGreen-main p-2 text-white group-hover:bg-white group-hover:text-primaryGreen-main">
            <motion.div animate={controls} transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop' }}>
              <CalendarRange className="h-5 w-5" />
            </motion.div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-grow flex-col justify-end">
          <div className="space-y-1 text-primaryGreen-main group-hover:text-white">
            <h1 className="text-2xl md:text-2xl lg:text-4xl">{date !== '' ? date : '-'}</h1>
            <p className="md:text-md text-sm font-light">{date !== '' ? description : 'No sprint started'}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SprintDateWidget;
