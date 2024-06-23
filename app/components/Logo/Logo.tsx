import * as React from 'react';
import Image from 'next/image';

interface Props {
  className?: string | undefined;
}

const Logo: React.FC<Props> = ({ className }) => (
  <div className={className}>
    <Image
      src="/assets/Logos/yappi_light.svg"
      alt="yappi Logo"
      width={100}
      height={100}
      priority
    />
  </div>
);

export default Logo;
