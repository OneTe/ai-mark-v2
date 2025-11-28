import React, { useState } from 'react';

const DatasetOverview: React.FC = () => {
  const [copySuccess, setCopySuccess] = useState(false);

  // Current active prompt version
  const currentPromptVersion = 'v2.0';
  const currentPromptContent = `Analyze the provided city scene image and generate comprehensive tags.

Key elements to identify:
- Architecture: 'building', 'skyscraper', 'residential', 'commercial', 'historical'
- Transportation: 'car', 'bus', 'bicycle', 'pedestrian', 'traffic light', 'crosswalk'
- Nature: 'tree', 'park', 'garden', 'plants'
- Time: 'day', 'night', 'dusk', 'dawn'
- Weather: 'sunny', 'rainy', 'cloudy', 'foggy', 'snowy'
- Atmosphere: 'bustling', 'quiet', 'modern', 'vintage', 'crowded'
- Urban features: 'street sign', 'billboard', 'bench', 'street lamp'

Output format: Return a comma-separated list of relevant tags only.`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentPromptContent);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Summary Card */}
      <div className="bg-white dark:bg-panel-dark p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-gray-900 dark:text-white text-lg font-bold pb-4">数据集信息</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div className="flex flex-col gap-1 border-t border-gray-100 dark:border-gray-700 pt-4">
            <span className="text-gray-500 dark:text-gray-400 text-sm">数据集名称</span>
            <span className="text-gray-900 dark:text-white text-sm font-medium">夏日城市风光数据集</span>
          </div>
          <div className="flex flex-col gap-1 border-t border-gray-100 dark:border-gray-700 pt-4">
            <span className="text-gray-500 dark:text-gray-400 text-sm">图片总数</span>
            <span className="text-gray-900 dark:text-white text-sm font-medium">1,500</span>
          </div>
          <div className="flex flex-col gap-1 border-t border-gray-100 dark:border-gray-700 pt-4">
            <span className="text-gray-500 dark:text-gray-400 text-sm">创建时间</span>
            <span className="text-gray-900 dark:text-white text-sm font-medium">2023-10-26 10:00</span>
          </div>
          <div className="flex flex-col gap-1 border-t border-gray-100 dark:border-gray-700 pt-4">
            <span className="text-gray-500 dark:text-gray-400 text-sm">最近一次执行时间</span>
            <span className="text-gray-900 dark:text-white text-sm font-medium">2023-10-27 14:30</span>
          </div>
          <div className="flex flex-col gap-1 border-t border-gray-100 dark:border-gray-700 pt-4 col-span-full">
            <span className="text-gray-500 dark:text-gray-400 text-sm">执行状态</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2.5 h-2.5 bg-success rounded-full"></span>
              <span className="text-gray-900 dark:text-white text-sm font-medium">执行成功</span>
            </div>
          </div>
        </div>
      </div>

      {/* Current Prompt Card */}
      <div className="bg-white dark:bg-panel-dark p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center pb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-gray-900 dark:text-white text-lg font-bold">当前 Prompt</h2>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
              {currentPromptVersion}
            </span>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-sm">
              {copySuccess ? 'check' : 'content_copy'}
            </span>
            {copySuccess ? '已复制' : '复制'}
          </button>
        </div>
        <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-md border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-mono whitespace-pre-wrap select-all">
            {currentPromptContent}
          </p>
        </div>
      </div>

      {/* Stats Table */}
      <div className="bg-white dark:bg-panel-dark p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-gray-900 dark:text-white text-lg font-bold pb-4">标签整体效果概览表</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 rounded-l-md">标签名</th>
                <th className="px-6 py-3">图片数量</th>
                <th className="px-6 py-3">已评估数量</th>
                <th className="px-6 py-3">准确率</th>
                <th className="px-6 py-3 rounded-r-md">状态</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {[
                { name: '建筑', count: 1230, eval: 1230, acc: '98.5%', status: 'Passed' },
                { name: '车辆', count: 890, eval: 890, acc: '95.2%', status: 'Passed' },
                { name: '行人', count: 750, eval: 400, acc: '91.0%', status: 'Calibrating' },
                { name: '树木', count: 420, eval: 150, acc: '88.7%', status: 'Calibrating' },
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{row.name}</td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{row.count}</td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{row.eval}</td>
                  <td className={`px-6 py-4 font-semibold ${
                    parseFloat(row.acc) > 90 ? 'text-success' : 'text-warning'
                  }`}>{row.acc}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                      row.status === 'Passed' 
                        ? 'bg-success/10 text-success' 
                        : 'bg-warning/10 text-warning'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        row.status === 'Passed' ? 'bg-success' : 'bg-warning'
                      }`}></span>
                      {row.status === 'Passed' ? '已通过' : '校准中'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DatasetOverview;
