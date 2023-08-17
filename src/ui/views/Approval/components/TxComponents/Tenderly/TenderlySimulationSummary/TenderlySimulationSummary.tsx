import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import TenderlySvg from 'ui/assets/tenderly/tenderly.svg';
import { ReactComponent as IconRightArrow } from '@/ui/assets/arrow-right-gray.svg';
import { TenderlyNetwork } from 'ui/utils/tenderly';

import './style.less';

const TenderlySimulationSummary = ({
  simulation,
}: {
  simulation: Record<string, any> | null;
}) => {
  const { t } = useTranslation();
  const isSuccess = !!simulation?.status;
  const simulationUrl = `https://dashboard.tenderly.co/${process.env.TENDERLY_ACCOUNT}/${process.env.TENDERLY_PROJECT_ID}/simulator/${simulation?.id}`;
  const sharedSimulationUrl = `https://dashboard.tenderly.co/shared/simulation/${simulation?.id}`;

  return (
    <div className="tenderly-simulation-summary container">
      <p className="text-16 text-gray-title font-medium mb-12">
        {t('Tenderly Simulation Summary')}
      </p>
      {!simulation && <div>Something went wrong.</div>}
      {simulation && (
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between gap-2">
            <div>Status</div>
            <div className={isSuccess ? 'text-green' : 'text-red'}>
              {isSuccess ? 'Success' : 'Failed'}
            </div>
          </div>
          <div className="flex items-center justify-between gap-2">
            <div>Network</div>
            <div className="flex items-center gap-4">
              <div className="flex items-center rounded-full">
                <img
                  src={TenderlyNetwork[simulation.network_id]?.image}
                  className="h-16 rounded-full"
                  alt="Tenderly"
                />
              </div>
              <div>{TenderlyNetwork[simulation.network_id]?.name}</div>
            </div>
          </div>
          <div className="flex items-center justify-between gap-2">
            <div>Gas</div>
            <div>{simulation.gas}</div>
          </div>
          <Button
            className="tenderly-simulation-summary-button flex items-center justify-between gap-2 pb-0"
            href={simulationUrl}
            target="_blank"
            rel="noreferrer"
            size="large"
            block
          >
            <div>View details</div>
            <div className="flex items-center gap-2">
              <img src={TenderlySvg} className="h-32" alt="Tenderly" />
              <IconRightArrow />
            </div>
          </Button>
          <Button
            className="text-[#6E56CF] bg-white flex items-center justify-center gap-2 pb-0"
            href={sharedSimulationUrl}
            target="_blank"
            rel="noreferrer"
            type="link"
            size="middle"
            block
          >
            <div>Share simulation ✨</div>
          </Button>
        </div>
      )}
    </div>
  );
};

export default TenderlySimulationSummary;
