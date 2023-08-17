import React from 'react';
import clsx from 'clsx';
import TenderlySvg from 'ui/assets/tenderly/tenderly.svg';

const TenderlyCredits = ({ classname }) => {
  return (
    <div
      className={clsx(
        'TenderlyCredits flex items-center justify-center gap-1',
        classname
      )}
    >
      <span className="text-12 text-gray-content">Powered by</span>
      <img src={TenderlySvg} className="h-20" alt="Tenderly" />
    </div>
  );
};

export default TenderlyCredits;
