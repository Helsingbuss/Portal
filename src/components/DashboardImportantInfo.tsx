import React from 'react';

const DashboardImportantInfo: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow p-4 h-full">
      <h2 className="text-lg font-semibold mb-2 text-black">Viktig information</h2>
      <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
        <li>Nya regler för passagerarlistor gäller från 1 juli.</li>
        <li>Kom ihåg att uppdatera fordonens besiktningsdatum.</li>
        <li>Supporten har nya öppettider: vardagar 08:00-16:00.</li>
        <li>Systemunderhåll planerat den 30 juni mellan 22:00-00:00.</li>
      </ul>
    </div>
  );
};

export default DashboardImportantInfo;
