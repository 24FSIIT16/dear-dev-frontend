import React from 'react';
import Label from '@components/ui/Label/Label';
import Input from '@components/ui/Input/Input';
import Image from 'next/image';

interface SmiliesRadioButtonProps {
  value: string;
  handleChange: (value: string) => void;
  altText: string;
  imagePath: string;
  size: number;
}

const SmiliesRadioButton: React.FC<SmiliesRadioButtonProps> = ({ value, handleChange, altText, imagePath, size }) => (
  <Label className="cursor-pointer">
    <Input type="radio" value={value} onChange={() => handleChange(value)} className="hidden" />
    <Image src={imagePath} alt={altText} width={size} height={size} />
  </Label>
);

export default SmiliesRadioButton;
