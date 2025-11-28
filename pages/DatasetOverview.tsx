import React, { useState } from 'react';

interface ExecutionRecord {
  id: string;
  version: string;
  time: string;
  model: string;
  status: string;
}

// Mock execution records for export selection
const mockExecutionRecords: ExecutionRecord[] = [
  { id: '#10234', version: 'v2.1', time: '2024-05-19 14:30', model: 'Gemini 2.5 Flash', status: 'Completed' },
  { id: '#10233', version: 'v2.0', time: '2024-05-18 10:15', model: 'Gemini 2.5 Flash', status: 'Completed' },
  { id: '#10230', version: 'v1.3', time: '2024-05-15 16:20', model: 'Gemini Pro', status: 'Completed' },
];

const DatasetOverview: React.FC = () => {
  const [copySuccess, setCopySuccess] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportType, setExportType] = useState<'latest' | 'specific'>('latest');
  const [selectedExecutionId, setSelectedExecutionId] = useState(mockExecutionRecords[0].id);

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

  const handleExport = () => {
    // Mock data for export - in real implementation, this would fetch from API
    const mockData = [
      { id: 'img_001', url: 'https://example.com/image1.jpg', tags: '建筑,白天,晴天' },
      { id: 'img_002', url: 'https://example.com/image2.jpg', tags: '车辆,街道,行人' },
      { id: 'img_003', url: 'https://example.com/image3.jpg', tags: '树木,公园,自然' },
      // Add more mock data as needed
    ];

    // Create CSV content
    const headers = ['图片ID', '图片URL', '标签'];
    const csvContent = [
      headers.join(','),
      ...mockData.map(row => `${row.id},${row.url},"${row.tags}"`)
    ].join('\n');

    // Create blob and download
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', `dataset_export_${exportType === 'latest' ? 'latest' : selectedExecutionId}_${Date.now()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setShowExportModal(false);
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Page Header with Export Button */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">数据集概览</h1>
        <button
          onClick={() => setShowExportModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
        >
          <span className="material-symbols-outlined text-lg">download</span>
          导出数据
        </button>
      </div>

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

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-panel-dark rounded-lg shadow-xl max-w-lg w-full border border-gray-200 dark:border-gray-700">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">导出数据</h3>
              <button
                onClick={() => setShowExportModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  选择导出内容
                </label>
                <div className="space-y-3">
                  {/* Latest Results Option */}
                  <label className="flex items-start gap-3 p-4 border border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <input
                      type="radio"
                      name="exportType"
                      value="latest"
                      checked={exportType === 'latest'}
                      onChange={(e) => setExportType(e.target.value as 'latest')}
                      className="mt-0.5 h-4 w-4 text-primary focus:ring-primary"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">最新标注结果</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        导出最新一次执行的标注结果
                      </div>
                    </div>
                  </label>

                  {/* Specific Execution Option */}
                  <label className="flex items-start gap-3 p-4 border border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <input
                      type="radio"
                      name="exportType"
                      value="specific"
                      checked={exportType === 'specific'}
                      onChange={(e) => setExportType(e.target.value as 'specific')}
                      className="mt-0.5 h-4 w-4 text-primary focus:ring-primary"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">指定执行记录的结果</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        选择特定的执行记录进行导出
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Execution Record Selector - shown when 'specific' is selected */}
              {exportType === 'specific' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    选择执行记录
                  </label>
                  <select
                    value={selectedExecutionId}
                    onChange={(e) => setSelectedExecutionId(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  >
                    {mockExecutionRecords.map(record => (
                      <option key={record.id} value={record.id}>
                        {record.id} - {record.version} - {record.time}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Export Format Info */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex gap-2">
                  <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-lg">info</span>
                  <div className="text-sm text-blue-700 dark:text-blue-300">
                    <div className="font-medium mb-1">导出格式说明</div>
                    <div className="text-xs">
                      导出文件为 CSV 格式，包含以下列：图片ID、图片URL、标签
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setShowExportModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm font-medium transition-colors"
              >
                <span className="material-symbols-outlined text-lg">download</span>
                确认导出
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatasetOverview;
