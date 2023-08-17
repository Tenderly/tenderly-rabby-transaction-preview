import React from 'react';
import classNames from 'classnames';
import { noop } from 'lodash';
import {
  AssetChangesTabs,
  TransactionAssetChangeData,
} from './TenderlyAssetChanges';
import EthereumBlockie from 'ui/views/Approval/components/TxComponents/Tenderly/EthereumBlockie/EthereumBlockie';
import { formatToLocaleString, generateShortAddress } from 'ui/utils/tenderly';
import ChronologicalContent from 'ui/views/Approval/components/TxComponents/Tenderly/AssetChanges/ChronologicalContent';
import Accordion from 'ui/component/Accordion/Accordion';

import './PerAddressContent.less';

const MinAssetChangesToDisplay = 10;

interface Props {
  assetChanges: TransactionAssetChangeData[];
  contracts: any[];
  viewAll?: boolean;
  shouldShowApproximateSign: (value: number) => boolean;
  activeTabValue?: AssetChangesTabs;
  onViewAllToggle?: () => void;
}

function PerAddressContent({
  assetChanges,
  contracts,
  viewAll = false,
  shouldShowApproximateSign,
  onViewAllToggle = noop,
  activeTabValue,
}: Props) {
  function ifValueNearZero(value: number) {
    return Number(value.toFixed(3)) === 0;
  }

  function ifValuePositive(value: number) {
    return value > 0;
  }

  function ifValueNegative(value: number) {
    return value < 0;
  }

  const dollarValuePerAddress: Record<string, number> = {};

  const assetChangesPerAddress: Record<
    string,
    TransactionAssetChangeData[]
  > = assetChanges.reduce(
    (acc: Record<string, TransactionAssetChangeData[]>, assetChange) => {
      let updatedAcc = {};

      if (assetChange.from) {
        dollarValuePerAddress[assetChange.from] =
          (dollarValuePerAddress[assetChange.from] || 0) -
          Number(assetChange.dollarValue);

        updatedAcc = {
          [assetChange.from]: [...(acc?.[assetChange.from] || []), assetChange],
        };
      }

      if (assetChange.to) {
        dollarValuePerAddress[assetChange.to] =
          (dollarValuePerAddress[assetChange.to] || 0) +
          Number(assetChange.dollarValue);

        updatedAcc = {
          ...updatedAcc,
          [assetChange.to]: [...(acc?.[assetChange.to] || []), assetChange],
        };
      }

      return {
        ...acc,
        ...updatedAcc,
      };
    },
    {}
  );

  const showViewAll =
    Object.keys(assetChangesPerAddress).length > MinAssetChangesToDisplay;
  const showAll = !showViewAll || viewAll;

  let assetChangesAddressesToDisplay = Object.keys(assetChangesPerAddress);
  if (!showAll) {
    assetChangesAddressesToDisplay = assetChangesAddressesToDisplay.slice(
      0,
      MinAssetChangesToDisplay
    );
  }

  return (
    <div className="PerAddressContent">
      {assetChangesAddressesToDisplay.map((address, index) => (
        <Accordion
          key={`${activeTabValue}${index}`}
          initiallyOpened={index === 0}
          className="mt-2"
          size="small"
          headerClassName="PerAddressContent__Accordion__Header"
          contentClassName="PerAddressContent__Accordion"
          renderHeader={() => {
            const sumDollarValue = dollarValuePerAddress[address] || 0;
            const contract = contracts.find(
              (contract) => contract.address === address
            );

            return (
              <>
                <div className="flex items-center">
                  <EthereumBlockie className="mr-4" hex={address} size={16} />
                  <div className="TextOverflowEllipsis">
                    {contract?.name || generateShortAddress(address, 8, 6)}
                  </div>
                </div>
                <div className="flex items-center ml-auto">
                  {(ifValuePositive(sumDollarValue) ||
                    ifValueNearZero(sumDollarValue)) && (
                    <div
                      // eslint-disable-next-line react/forbid-dom-props
                      id={`asset-changes-per-address-content-sum-change-${address}`}
                      className={classNames('mr-4 font-semibold', {
                        'text-green': !ifValueNearZero(sumDollarValue),
                      })}
                    >
                      {shouldShowApproximateSign(sumDollarValue) && (
                        <span>≈</span>
                      )}
                      <span>
                        $
                        {formatToLocaleString(
                          Math.abs(sumDollarValue).toString(),
                          3,
                          4
                        )}
                      </span>
                    </div>
                  )}
                  {ifValueNegative(sumDollarValue) &&
                    !ifValueNearZero(sumDollarValue) && (
                      <div
                        // eslint-disable-next-line react/forbid-dom-props
                        id={`asset-changes-per-address-content-sum-change-${address}`}
                        className="mr-4 font-semibold text-red"
                      >
                        {shouldShowApproximateSign(sumDollarValue) && (
                          <span>≈</span>
                        )}
                        <span>
                          -$
                          {formatToLocaleString(
                            Math.abs(sumDollarValue).toString(),
                            3,
                            4
                          )}
                        </span>
                      </div>
                    )}
                </div>
              </>
            );
          }}
        >
          <ChronologicalContent
            className="ml-2"
            assetChanges={assetChangesPerAddress[address]}
            contracts={contracts}
            groupAddress={address}
            shouldShowApproximateSign={shouldShowApproximateSign}
            // activeTabValue={activeTabValue}
          />
        </Accordion>
      ))}
      {showViewAll && (
        <div className="PerAddressContent__LinkButton">
          <a onClick={onViewAllToggle}>
            {!viewAll && <span>Show all</span>}
            {viewAll && <span>Show less</span>}
          </a>
        </div>
      )}
    </div>
  );
}

export default PerAddressContent;
