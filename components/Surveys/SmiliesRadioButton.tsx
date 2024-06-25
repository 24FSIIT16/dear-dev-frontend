import React from 'react';
import { Label } from '@components/ui/Label/Label';
import { Input } from '@components/ui/Input/Input';

type SmiliesRadioButtonProps = {
  value: string;
  selectedValue: string | undefined;
  handleChange: (value: string) => void;
  altText: string;
  imagePath: string;
};

const SmiliesRadioButton: React.FC<SmiliesRadioButtonProps> = ({
  value,
  selectedValue,
  handleChange,
  altText,
  imagePath,
}) => {
  return (
    <Label className="cursor-pointer">
      <Input type="radio" value={value} onChange={() => handleChange(value)} className="hidden" />
      <img
        src={imagePath}
        alt={altText}
        className={`h-20 w-20 ${selectedValue === value ? '' : 'grayscale'} hover:grayscale-0`}
      />
    </Label>
  );
};

export default SmiliesRadioButton;
