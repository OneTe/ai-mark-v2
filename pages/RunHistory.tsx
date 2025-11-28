import React, { useState } from 'react';

interface RunHistoryProps {
  onViewExecution: (id: string) => void;
}

interface ExecutionRecord {
  id: string;
  promptVersion: string;
  executionTime: string;
  model: string;
  status: 'Completed' | 'Failed';
  processedImages: number;
  totalImages: number;
  accuracy?: string;
}

// Mock execution history data
const mockExecutionHistory: ExecutionRecord[] = [
  {
    id: '#10234',
    promptVersion: 'v2.1',
    executionTime: '2024-05-19 14:30',
    model: 'Gemini 2.5 Flash',
    status: 'Completed',
    processedImages: 1500,
    totalImages: 1500,
    accuracy: '96.5%'
  },
  {
    id: '#10233',
    promptVersion: 'v2.0',
    executionTime: '2024-05-18 10:15',
    model: 'Gemini 2.5 Flash',
    status: 'Completed',
    processedImages: 1500,
    totalImages: 1500,
    accuracy: '94.2%'
  },
  {
    id: '#10232',
    promptVersion: 'v1.3',
    executionTime: '2024-05-17 09:00',
    model: 'Gemini Pro',
    status: 'Failed',
    processedImages: 850,
    totalImages: 1500
  },
  {
    id: '#10231',
    promptVersion: 'v2.0',
    executionTime: '2024-05-16 16:20',
    model: 'Gemini 2.5 Flash',
    status: 'Completed',
    processedImages: 1500,
    totalImages: 1500,
    accuracy: '93.8%'
  },
  {
    id: '#10230',
    promptVersion: 'v1.2',
    executionTime: '2024-05-15 11:45',
    model: 'Gemini Flash',
    status: 'Completed',
    processedImages: 1500,
    totalImages: 1500,
    accuracy: '89.5%'
  },
  {
    id: '#10229',
    promptVersion: 'v1.1',
    executionTime: '2024-05-14 08:30',
    model: 'Gemini Pro',
    status: 'Failed',
    processedImages: 320,
    totalImages: 1500
  },
  {
    id: '#10228',
    promptVersion: 'v1.0',
    executionTime: '2024-05-13 15:10',
    model: 'Gemini Flash',
    status: 'Completed',
    processedImages: 1500,
    totalImages: 1500,
    accuracy: '85.3%'
  },
  {
    id: '#10227',
    promptVersion: 'v1.0',
    executionTime: '2024-05-12 13:25',
    model: 'Gemini Flash',
    status: 'Completed',
    processedImages: 1500,
    totalImages: 1500,
    accuracy: '84.9%'
  },
];

const RunHistory: React.FC<RunHistoryProps> = ({ onViewExecution }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(mockExecutionHistory.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = mockExecutionHistory.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-panel-dark p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">运行历史</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          查看数据集所有的执行记录，包括执行状态、准确率等详细信息
        </p>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-panel-dark rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">ID</th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Prompt 版本</th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">执行时间</th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">使用模型</th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">处理进度</th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">准确率</th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">状态</th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {currentData.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  {/* ID */}
                  <td className="px-6 py-4">
                    <span className="font-mono text-xs text-gray-600 dark:text-gray-400">{record.id}</span>
                  </td>

                  {/* Prompt Version */}
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">
                      {record.promptVersion}
                    </span>
                  </td>

                  {/* Execution Time */}
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900 dark:text-white">{record.executionTime}</span>
                  </td>

                  {/* Model */}
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{record.model}</span>
                  </td>

                  {/* Progress */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm text-gray-900 dark:text-white">
                        {record.processedImages} / {record.totalImages}
                      </span>
                      <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${
                            record.status === 'Completed' ? 'bg-success' : 'bg-danger'
                          }`}
                          style={{ width: `${(record.processedImages / record.totalImages) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>

                  {/* Accuracy */}
                  <td className="px-6 py-4">
                    {record.accuracy ? (
                      <span className="text-sm font-semibold text-success">{record.accuracy}</span>
                    ) : (
                      <span className="text-sm text-gray-400">N/A</span>
                    )}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium
                      ${record.status === 'Completed' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${record.status === 'Completed' ? 'bg-success' : 'bg-danger'}`}></span>
                      {record.status === 'Completed' ? '已完成' : '失败'}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => onViewExecution(record.id)}
                      className="text-primary hover:text-primary-dark font-medium text-xs hover:underline transition-colors"
                    >
                      查看详情
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <span>共 {mockExecutionHistory.length} 条记录</span>
            <span>·</span>
            <span>
              显示 {startIndex + 1} - {Math.min(endIndex, mockExecutionHistory.length)} 条
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="flex items-center justify-center w-8 h-8 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-panel-dark text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span className="material-symbols-outlined text-lg">chevron_left</span>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`flex items-center justify-center w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === page
                    ? 'bg-primary text-white'
                    : 'border border-gray-300 dark:border-gray-600 bg-white dark:bg-panel-dark text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center justify-center w-8 h-8 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-panel-dark text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span className="material-symbols-outlined text-lg">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RunHistory;
