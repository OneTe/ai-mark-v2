import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import DatasetList from './pages/DatasetList';
import DatasetOverview from './pages/DatasetOverview';
import ImageList from './pages/ImageList';
import TagCalibration from './pages/TagCalibration';
import PromptConfig from './pages/PromptConfig';
import { Tab } from './types';

const App: React.FC = () => {
  // Simple state-based routing for this demo
  const [currentPage, setCurrentPage] = useState('datasets');
  const [selectedDatasetId, setSelectedDatasetId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Overview);

  const handleNavigate = (pageId: string) => {
    setCurrentPage(pageId);
    if (pageId === 'datasets') {
      setSelectedDatasetId(null);
    }
  };

  const handleSelectDataset = (id: string) => {
    setSelectedDatasetId(id);
    setActiveTab(Tab.Overview);
  };

  const renderContent = () => {
    if (currentPage === 'datasets' && !selectedDatasetId) {
      return <DatasetList onSelectDataset={handleSelectDataset} />;
    }

    if (selectedDatasetId) {
      // Dataset Details View with Tabs
      return (
        <div className="w-full max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 mb-6 text-sm">
                <button onClick={() => setSelectedDatasetId(null)} className="text-gray-500 hover:text-primary transition-colors">数据集列表</button>
                <span className="text-gray-400">/</span>
                <span className="font-medium text-gray-900 dark:text-white">夏日城市风光数据集</span>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 dark:border-gray-700 mb-8 overflow-x-auto">
                {[
                    { id: Tab.Overview, label: '概览' },
                    { id: Tab.Prompt, label: 'Prompt 配置与执行' },
                    { id: Tab.Images, label: '图片列表' },
                    { id: Tab.Calibration, label: '标签校准' },
                    { id: Tab.History, label: '运行历史' },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap
                            ${activeTab === tab.id 
                                ? 'border-primary text-primary' 
                                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[500px]">
                {activeTab === Tab.Overview && <DatasetOverview />}
                {activeTab === Tab.Prompt && <PromptConfig />}
                {activeTab === Tab.Images && <ImageList />}
                {activeTab === Tab.Calibration && <TagCalibration />}
                {activeTab === Tab.History && (
                    <div className="p-12 text-center text-gray-500">
                        <span className="material-symbols-outlined text-4xl mb-2">history</span>
                        <p>History view not implemented in this demo.</p>
                    </div>
                )}
            </div>
        </div>
      );
    }

    return (
        <div className="flex flex-col items-center justify-center h-full text-gray-500">
             <span className="material-symbols-outlined text-6xl mb-4 text-gray-300">construction</span>
             <p className="text-lg">Page "{currentPage}" is under construction.</p>
        </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-background-light dark:bg-background-dark text-gray-900 dark:text-gray-100">
      <Sidebar activePage={selectedDatasetId ? 'datasets' : currentPage} onNavigate={handleNavigate} />
      <main className="flex-1 ml-64 transition-all duration-300">
          {renderContent()}
      </main>
    </div>
  );
};

export default App;
