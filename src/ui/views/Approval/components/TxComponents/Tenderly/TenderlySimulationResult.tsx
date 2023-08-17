import React from 'react';
import { ActionWrapper } from 'ui/views/Approval/components/Actions';
import {
  TenderlyAssetChanges,
  TenderlySimulationSummary,
  TenderlyWalletChanges,
} from 'ui/views/Approval/components/TxComponents/Tenderly';
import { useWallet } from 'ui/utils';
import { Account } from 'background/service/preference';

const TenderlySimulationResult = ({
  data,
}: {
  data: Record<string, any> | null;
}) => {
  const [account, setAccount] = React.useState<Account>();
  const wallet = useWallet();

  const init = async () => {
    const currentAccount = await wallet.syncGetCurrentAccount();

    if (currentAccount) {
      setAccount(currentAccount);
    }
  };

  React.useEffect(() => {
    init();
  }, []);

  return (
    <div className="tenderly-simulation-result mt-16">
      <ActionWrapper>
        {!data && (
          <div className="bg-[#f5f6fa] sticky top-[64px] z-10">
            Something went wrong.
          </div>
        )}
        {data && <TenderlySimulationSummary simulation={data.simulation} />}
      </ActionWrapper>
      {data?.transaction?.transaction_info.asset_changes && (
        <>
          <ActionWrapper>
            <TenderlyWalletChanges
              account={account}
              assetChanges={data.transaction.transaction_info.asset_changes}
            />
          </ActionWrapper>
          <ActionWrapper>
            <TenderlyAssetChanges
              assetChanges={data.transaction.transaction_info.asset_changes}
              contracts={data.contracts}
            />
          </ActionWrapper>
        </>
      )}
    </div>
  );
};

export default TenderlySimulationResult;
