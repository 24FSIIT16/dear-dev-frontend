'use client';

import * as React from 'react';
import { Button } from '@components/ui/Buttons/Button';
import { CloudLightning, CloudRain, CloudSun, Sun, SunDim } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@components/ui/Card/Card';

const HappinessWeatherSurvey: React.FC = () => (
  <Card>
    <CardHeader>
      <CardTitle>How happy are you with your working day?</CardTitle>
      <CardDescription>
        Submit your overall happiness survey to track your happiness with your work day.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="flex flex-row items-center justify-between">
        <Button variant="mood" size="mood" className="bg-primaryRed-main">
          <CloudLightning className="h-12 w-12 text-black" />
        </Button>
        <Button variant="mood" size="mood" className="bg-primaryRed-light">
          <CloudRain className="h-12 w-12 text-black" />
        </Button>
        <Button variant="mood" size="mood" className="bg-primaryBlue-light">
          <CloudSun className="h-12 w-12 text-primaryBlue-main" />
        </Button>
        <Button variant="mood" size="mood" className="bg-primaryGreen-light">
          <SunDim className="h-12 w-12 text-black" />
        </Button>
        <Button variant="mood" size="mood" className="bg-primaryGreen-main">
          <Sun className="h-12 w-12 text-black" />
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default HappinessWeatherSurvey;
