import React from 'react';
import Blockies from 'react-blockies';

type BaseProps = {
  size?: number;
  className?: string;
};

type BlockieWithSeedProps = {
  seed: string;
  hex?: undefined;
} & BaseProps;

type BlockieWithHexProps = {
  hex: string;
  seed?: undefined;
} & BaseProps;

type EthereumBlockieProps = BlockieWithHexProps | BlockieWithSeedProps;

function EthereumBlockie({
  seed,
  className = '',
  hex,
  size = 36,
}: EthereumBlockieProps) {
  const blockieSeed = seed ?? hex ?? 'seed';

  return (
    <div
      className={`EthereumBlockie ${className}`}
      // eslint-disable-next-line react/forbid-dom-props
      style={{
        width: size,
        height: size,
      }}
    >
      <Blockies
        size={8}
        scale={size / 8}
        className="rounded-sm"
        seed={blockieSeed}
      />
    </div>
  );
}

export default EthereumBlockie;
