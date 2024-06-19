import * as React from 'react';
import Image from 'next/image';

interface Props {
  className?: string | undefined;
}

const Logo: React.FC<Props> = ({ className }) => (
  <div className={className}>
    <Image
      src="/assets/Logos/yappi_name_dark.svg"
      alt="yappi Logo"
      width={150}
      height={150}
    />
  </div>
);

export default Logo;
