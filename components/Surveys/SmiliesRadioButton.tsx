import React from 'react';
import { Label } from '@components/ui/Label/Label';
import { Input } from '@components/ui/Input/Input';
interface SmiliesRadioButtonProps {
  value: string;
  selectedValue: string | undefined;
  handleChange: (value: string) => void;
  altText: string;
  imagePath: string;
  size: number;
}

const SmiliesRadioButton: React.FC<SmiliesRadioButtonProps> = ({
  value,
  selectedValue,
  handleChange,
  altText,
  imagePath,
  size,
}) => {
  const imageSize = `h-${size} w-${size}`; // Use Tailwind's dynamic class names
  return (
    <Label className="cursor-pointer">
      <Input type="radio" value={value} onChange={() => handleChange(value)} className="hidden" />
      <img
        src={imagePath}
        alt={altText}
        className={`${imageSize} ${selectedValue === value ? '' : 'grayscale'} hover:grayscale-0`}
      />
    </Label>
  );
};

export default SmiliesRadioButton;
