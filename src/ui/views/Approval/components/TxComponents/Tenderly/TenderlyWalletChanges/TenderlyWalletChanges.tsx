import React from 'react';
import clsx from 'clsx';
import BigNumber from 'bignumber.js';
import { formatAmount } from 'ui/utils/number';
import { formatUsdValue } from 'ui/utils/number';
import { Account } from 'background/service/preference';
import { TenderlyCredits } from 'ui/views/Approval/components/TxComponents/Tenderly';

import './TenderlyWalletChanges.less';

const TenderlyWalletChanges = ({
  account,
  assetChanges,
}: {
  account?: Account;
  assetChanges: any;
}) => {
  const { assetsInList, assetsOutList } = React.useMemo(() => {
    const assetsInList =
      assetChanges.filter((asset) => asset.to === account?.address) || [];
    const assetsOutList =
      assetChanges.filter((asset) => asset.from === account?.address) || [];

    return {
      assetsInList,
      assetsOutList,
    };
  }, [account, assetChanges]);

  return (
    <div className="TenderlyWalletChanges">
      <div className="TenderlyWalletChanges__Content">
        {/* Assets Out */}
        {assetsOutList?.length > 0 && (
          <>
            <p className="text-16 text-gray-title font-medium mb-4">
              Assets Out
            </p>
            <div className="flex flex-col gap-4 border border-gray-divider rounded-sm">
              {assetsOutList.map((token, index) => (
                <div
                  key={index}
                  className={clsx('flex gap-4 p-4', {
                    'border-t-[1px] border-gray-divider': index !== 0,
                  })}
                >
                  <div className="flex items-center justify-center p-4">
                    <img
                      src={token.token_info.logo}
                      className="w-60 rounded"
                      alt="Tenderly"
                    />
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                      <div className="font-semibold">
                        {token.token_info.symbol.toUpperCase()}
                        {token.token_id && (
                          <span className="ml-2">
                            #{Number(token.token_id)}
                          </span>
                        )}
                      </div>
                      <div className="text-12 text-gray-content">
                        {token.token_info.name}
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="font-semibold">{token.type}:</div>
                      <div className="text-red-forbidden">
                        - {formatAmount(token.amount)}
                      </div>
                      <div className="text-12 text-gray-content">
                        (≈{' '}
                        {formatUsdValue(
                          new BigNumber(token.dollar_value).toFixed()
                        )}
                        )
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Assets In */}
        {assetsInList?.length > 0 && (
          <>
            <p className="text-16 text-gray-title font-medium mt-4 mb-4">
              Assets In
            </p>
            <div className="flex flex-col gap-4 border border-gray-divider rounded-sm">
              {assetsInList.map((token, index) => (
                <div
                  key={index}
                  className={clsx('flex gap-4 p-4', {
                    'border-t-[1px] border-gray-divider': index !== 0,
                  })}
                >
                  <div className="flex items-center justify-center p-4">
                    <img
                      src={token.token_info.logo}
                      className="w-60 rounded"
                      alt="Tenderly"
                    />
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                      <div className="font-semibold">
                        {token.token_info.symbol.toUpperCase()}
                        {token.token_id && (
                          <span className="ml-2">
                            #{Number(token.token_id)}
                          </span>
                        )}
                      </div>
                      <div className="text-12 text-gray-content">
                        {token.token_info.name}
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="font-semibold">{token.type}:</div>
                      <div className="text-green">
                        + {formatAmount(token.amount)}
                      </div>
                      <div className="text-12 text-gray-content">
                        (≈{' '}
                        {formatUsdValue(
                          new BigNumber(token.dollar_value).toFixed()
                        )}
                        )
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <TenderlyCredits classname="mt-12" />
    </div>
  );
};

export default TenderlyWalletChanges;
