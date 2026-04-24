import React from 'react';
import { SimplifiedView } from './unified/SimplifiedView';
import { AnalystView } from './unified/AnalystView';

interface UnifiedOverviewProps {
  onTabSelection: (tabId: string) => void;
  onTotalAssetsClick: () => void;
  view: 'simplified' | 'analyst';
}

export const UnifiedOverview: React.FC<UnifiedOverviewProps> = ({ view }) => {
  return (
    <div className="w-full flex flex-col gap-6">
      {view === 'simplified' ? <SimplifiedView /> : <AnalystView />}
    </div>
  );
};

export default UnifiedOverview;
