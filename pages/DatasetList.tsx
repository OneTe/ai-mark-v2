import React, { useState } from 'react';
import { Dataset } from '../types';

interface DatasetListProps {
  onSelectDataset: (id: string) => void;
}

const mockDatasets: Dataset[] = [
  { id: '1', name: 'Product Images Q3', imageCount: 10450, createdTime: '2023-08-15 10:30 AM', lastProcessedStatus: 'Success', lastProcessedTime: '2023-08-16 02:00 PM' },
  { id: '2', name: 'Autonomous Vehicle Data', imageCount: 52100, createdTime: '2023-08-14 05:20 PM', lastProcessedStatus: 'Failed', lastProcessedTime: '2023-08-14 05:45 PM' },
  { id: '3', name: 'Medical Scans Batch A', imageCount: 8800, createdTime: '2023-08-12 11:00 AM', lastProcessedStatus: 'In Progress', lastProcessedTime: '2023-08-17 09:05 AM' },
];

const DatasetList: React.FC<DatasetListProps> = ({ onSelectDataset }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full max-w-7xl mx-auto p-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-gray-900 dark:text-white text-3xl font-bold leading-tight tracking-tight">数据集管理</h1>
          <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">在此处查看、创建和管理您的所有数据集。</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal hover:bg-primary-dark transition-colors"
        >
          <span className="material-symbols-outlined text-lg">add_circle</span>
          <span className="truncate">新建数据集</span>
        </button>
      </div>

      <div className="w-full overflow-hidden bg-white border rounded-lg border-gray-200 dark:bg-panel-dark dark:border-gray-700 shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
            <tr>
              <th className="px-6 py-4 text-xs font-medium leading-normal text-gray-500 uppercase dark:text-gray-400">数据集名称</th>
              <th className="px-6 py-4 text-xs font-medium leading-normal text-gray-500 uppercase dark:text-gray-400">图片数量</th>
              <th className="px-6 py-4 text-xs font-medium leading-normal text-gray-500 uppercase dark:text-gray-400">创建时间</th>
              <th className="px-6 py-4 text-xs font-medium leading-normal text-gray-500 uppercase dark:text-gray-400">最近一次处理状态</th>
              <th className="px-6 py-4 text-xs font-medium leading-normal text-gray-500 uppercase dark:text-gray-400">最近一次处理时间</th>
              <th className="px-6 py-4 text-xs font-medium leading-normal text-gray-500 uppercase dark:text-gray-400">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {mockDatasets.map((dataset) => (
              <tr key={dataset.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <td className="px-6 py-4">
                  <button onClick={() => onSelectDataset(dataset.id)} className="text-gray-900 dark:text-white font-medium hover:text-primary dark:hover:text-primary transition-colors text-left">
                    {dataset.name}
                  </button>
                </td>
                <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{dataset.imageCount.toLocaleString()}</td>
                <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{dataset.createdTime}</td>
                <td className="px-6 py-4">
                  <div className={`inline-flex items-center gap-2 px-2.5 py-1 text-xs font-medium rounded-full 
                    ${dataset.lastProcessedStatus === 'Success' ? 'bg-success/10 text-success' : 
                      dataset.lastProcessedStatus === 'Failed' ? 'bg-danger/10 text-danger' : 
                      'bg-primary/10 text-primary'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full 
                      ${dataset.lastProcessedStatus === 'Success' ? 'bg-success' : 
                        dataset.lastProcessedStatus === 'Failed' ? 'bg-danger' : 
                        'bg-primary'}`}></span>
                    {dataset.lastProcessedStatus}
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{dataset.lastProcessedTime}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button onClick={() => onSelectDataset(dataset.id)} className="p-1.5 text-gray-500 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-400 transition-colors">
                      <span className="material-symbols-outlined text-xl">visibility</span>
                    </button>
                    <button className="p-1.5 text-gray-500 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-400 transition-colors">
                      <span className="material-symbols-outlined text-xl">play_arrow</span>
                    </button>
                    <button className="p-1.5 text-red-500 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                      <span className="material-symbols-outlined text-xl">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mock Pagination */}
      <div className="flex items-center justify-center mt-6 gap-2">
        <button className="flex items-center justify-center text-gray-500 w-9 h-9 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
          <span className="material-symbols-outlined text-xl">chevron_left</span>
        </button>
        <button className="flex items-center justify-center text-sm font-bold text-white bg-primary rounded-lg w-9 h-9 shadow-sm">1</button>
        <button className="flex items-center justify-center text-sm font-normal text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg w-9 h-9">2</button>
        <button className="flex items-center justify-center text-sm font-normal text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg w-9 h-9">3</button>
        <span className="flex items-center justify-center text-sm font-normal text-gray-500 dark:text-gray-400 w-9 h-9">...</span>
        <button className="flex items-center justify-center text-sm font-normal text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg w-9 h-9">10</button>
        <button className="flex items-center justify-center text-gray-500 w-9 h-9 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
          <span className="material-symbols-outlined text-xl">chevron_right</span>
        </button>
      </div>

      {/* Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl bg-white dark:bg-panel-dark rounded-xl shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">新建数据集</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">数据集名称 <span className="text-danger">*</span></label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 transition-all outline-none" 
                  placeholder="例如: Q4 Product Images" 
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">上传文件</label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:hover:bg-gray-800 dark:bg-gray-800/50 dark:border-gray-600 dark:hover:border-gray-500 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <span className="material-symbols-outlined text-4xl text-gray-400 mb-2">cloud_upload</span>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">点击上传</span> 或拖放文件</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">CSV or Excel files</p>
                    </div>
                    <input type="file" className="hidden" />
                  </label>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-bold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600 transition-colors">
                取消
              </button>
              <button className="px-4 py-2 text-sm font-bold text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors shadow-sm">
                确认
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatasetList;
