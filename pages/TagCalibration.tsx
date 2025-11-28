import React, { useState } from 'react';

interface Image {
  id: string;
  url: string;
  tags: string[];
  status: 'Correct' | 'Incorrect' | null;
}

interface ExecutionRecord {
  id: string;
  promptVersion: string;
  executionTime: string;
  model: string;
  totalImages: number;
  status: 'Completed' | 'Failed';
}

// Mock execution records
const mockExecutionRecords: ExecutionRecord[] = [
  {
    id: '#10234',
    promptVersion: 'v2.1',
    executionTime: '2024-05-19 14:30',
    model: 'Gemini 2.5 Flash',
    totalImages: 1500,
    status: 'Completed'
  },
  {
    id: '#10233',
    promptVersion: 'v2.0',
    executionTime: '2024-05-18 10:15',
    model: 'Gemini 2.5 Flash',
    totalImages: 1500,
    status: 'Completed'
  },
  {
    id: '#10230',
    promptVersion: 'v1.3',
    executionTime: '2024-05-15 16:20',
    model: 'Gemini Pro',
    totalImages: 1200,
    status: 'Completed'
  },
];

const TagCalibration: React.FC = () => {
  const [selectedExecutionId, setSelectedExecutionId] = useState(mockExecutionRecords[0].id);
  const [images, setImages] = useState<Image[]>([
    { id: 'a3b8c1d9', url: 'https://picsum.photos/400/400?random=10', tags: ['狗', '宠物', '户外'], status: null },
    { id: 'e4f5g2h1', url: 'https://picsum.photos/400/400?random=11', tags: ['狗', '宠物'], status: 'Correct' },
    { id: 'i6j7k8l9', url: 'https://picsum.photos/400/400?random=12', tags: ['狗', '宠物', '肖像'], status: 'Incorrect' },
    { id: 'm0n1o2p3', url: 'https://picsum.photos/400/400?random=13', tags: ['狗', '宠物'], status: null },
    { id: 'q4r5s6t7', url: 'https://picsum.photos/400/400?random=14', tags: ['狗', '宠物', '可爱'], status: null },
  ]);

  const handleMarkCorrect = (id: string) => {
    setImages(images.map(img =>
      img.id === id ? { ...img, status: 'Correct' as const } : img
    ));
  };

  const handleMarkIncorrect = (id: string) => {
    setImages(images.map(img =>
      img.id === id ? { ...img, status: 'Incorrect' as const } : img
    ));
  };

  const handleUndo = (id: string) => {
    setImages(images.map(img =>
      img.id === id ? { ...img, status: null } : img
    ));
  };

  const handleMarkAllCorrect = () => {
    setImages(images.map(img => ({ ...img, status: 'Correct' as const })));
  };

  const handleMarkTagAsCompleted = () => {
    // TODO: Mark this tag as completed/passed
    alert('标签"狗"已标记为通过！');
  };

  const evaluatedCount = images.filter(img => img.status !== null).length;
  const correctCount = images.filter(img => img.status === 'Correct').length;
  const currentAccuracy = evaluatedCount > 0 ? ((correctCount / evaluatedCount) * 100).toFixed(1) : 'N/A';

  const selectedExecution = mockExecutionRecords.find(r => r.id === selectedExecutionId) || mockExecutionRecords[0];

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Execution Record Selector */}
      <div className="bg-white dark:bg-panel-dark p-5 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-xl">history</span>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                执行记录:
              </label>
            </div>
            <select
              value={selectedExecutionId}
              onChange={(e) => setSelectedExecutionId(e.target.value)}
              className="px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary cursor-pointer min-w-[280px]"
            >
              {mockExecutionRecords.map(record => (
                <option key={record.id} value={record.id}>
                  {record.id} - {record.promptVersion} - {record.executionTime}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 dark:bg-primary/20 rounded-md">
              <span className="material-symbols-outlined text-primary text-base">code</span>
              <span className="font-medium text-primary">Prompt {selectedExecution.promptVersion}</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
              <span className="material-symbols-outlined text-base">memory</span>
              <span>{selectedExecution.model}</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
              <span className="material-symbols-outlined text-base">photo_library</span>
              <span>{selectedExecution.totalImages} 张图片</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Calibration Area */}
      <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-320px)]">
      {/* Left Sidebar List */}
      <aside className="w-full lg:w-80 flex flex-col gap-4 flex-shrink-0">
        <div className="bg-white dark:bg-panel-dark border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden flex flex-col h-full">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <h2 className="font-semibold text-gray-900 dark:text-white mb-3">标签列表</h2>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">search</span>
              <input 
                type="text" 
                placeholder="搜索标签名" 
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
          <div className="overflow-y-auto flex-1 p-2 space-y-1">
            {[
              { name: '猫', count: 1500, eval: 1500, acc: '98%', status: 'success' },
              { name: '狗', count: 2300, eval: 850, acc: '91%', status: 'warning', active: true },
              { name: '汽车', count: 1240, eval: 1240, acc: '85%', status: 'danger' },
              { name: '建筑', count: 3100, eval: 0, acc: 'N/A', status: 'grey' },
            ].map((item, idx) => (
              <div 
                key={idx} 
                className={`p-3 rounded-lg cursor-pointer transition-colors group
                  ${item.active 
                    ? 'bg-primary/10 dark:bg-primary/20' 
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full 
                      ${item.status === 'success' ? 'bg-success' : 
                        item.status === 'warning' ? 'bg-warning' : 
                        item.status === 'danger' ? 'bg-danger' : 'bg-gray-400'}`}></span>
                    <span className={`font-medium ${item.active ? 'text-primary' : 'text-gray-900 dark:text-white'}`}>{item.name}</span>
                  </div>
                  <span className={`text-xs font-mono font-bold 
                    ${item.status === 'success' ? 'text-success' : 
                      item.status === 'warning' ? 'text-warning' : 
                      item.status === 'danger' ? 'text-danger' : 'text-gray-400'}`}>
                    {item.acc}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>{item.count} 张图片</span>
                  <span>已评估 {item.eval}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <section className="flex-1 flex flex-col gap-6 overflow-hidden">
        <div className="bg-white dark:bg-panel-dark p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                校准标签: <span className="text-primary">狗</span>
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                共 2300 张图片 · 已评估 {evaluatedCount} 张 · 当前准确率 {currentAccuracy}%
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* 全部正确按钮 */}
              <button
                onClick={handleMarkAllCorrect}
                className="flex items-center gap-2 px-4 py-2 bg-success/10 hover:bg-success/20 text-success border border-success/30 rounded-lg text-sm font-medium transition-colors"
              >
                <span className="material-symbols-outlined text-lg">done_all</span>
                全部正确
              </button>

              {/* 标记标签为已通过按钮 - 重新设计 */}
              <button
                onClick={handleMarkTagAsCompleted}
                disabled={evaluatedCount === 0}
                className="flex items-center gap-2 px-5 py-2 bg-primary hover:bg-primary-dark disabled:bg-gray-200 dark:disabled:bg-gray-700 text-white disabled:text-gray-400 dark:disabled:text-gray-500 rounded-lg text-sm font-bold transition-colors shadow-sm disabled:cursor-not-allowed disabled:opacity-70"
                title={evaluatedCount === 0 ? '请先评估至少一张图片' : '标记该标签校准已完成'}
              >
                <span className="material-symbols-outlined text-lg">verified</span>
                <span>通过校准</span>
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-y-auto flex-1 pr-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {images.map((img) => (
              <div 
                key={img.id} 
                className={`flex flex-col bg-white dark:bg-panel-dark rounded-lg overflow-hidden border transition-all
                  ${img.status === 'Correct' ? 'border-success ring-1 ring-success' : 
                    img.status === 'Incorrect' ? 'border-danger ring-1 ring-danger' : 
                    'border-gray-200 dark:border-gray-700 hover:shadow-md'}`}
              >
                <div className="aspect-square bg-gray-100 dark:bg-gray-800 relative group">
                  <img src={img.url} alt="Dog" className="w-full h-full object-cover" />
                  {img.status && (
                    <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                      <span className={`material-symbols-outlined text-4xl bg-white rounded-full p-2 shadow-lg
                        ${img.status === 'Correct' ? 'text-success' : 'text-danger'}`}>
                        {img.status === 'Correct' ? 'thumb_up' : 'thumb_down'}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-3 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                     <span className="text-xs text-gray-500 dark:text-gray-400">ID: {img.id}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {img.tags.map((tag, i) => (
                      <span key={i} className={`px-2 py-0.5 rounded-full text-xs font-medium 
                        ${tag === '狗' 
                          ? 'bg-primary/20 text-primary' 
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  {img.status ? (
                    <button
                      onClick={() => handleUndo(img.id)}
                      className={`w-full flex items-center justify-center gap-1.5 py-1.5 text-sm font-medium rounded-md mt-auto transition-colors
                      ${img.status === 'Correct'
                        ? 'bg-success/10 text-success hover:bg-success/20'
                        : 'bg-danger/10 text-danger hover:bg-danger/20'}`}
                    >
                      <span className="material-symbols-outlined text-base">undo</span>
                      撤销 ({img.status === 'Correct' ? '正确' : '错误'})
                    </button>
                  ) : (
                    <div className="grid grid-cols-2 gap-2 mt-auto">
                      <button
                        onClick={() => handleMarkCorrect(img.id)}
                        className="flex items-center justify-center gap-1.5 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm transition-colors group"
                      >
                        <span className="material-symbols-outlined text-base text-success group-hover:scale-110 transition-transform">thumb_up</span>
                        正确
                      </button>
                      <button
                        onClick={() => handleMarkIncorrect(img.id)}
                        className="flex items-center justify-center gap-1.5 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm transition-colors group"
                      >
                        <span className="material-symbols-outlined text-base text-danger group-hover:scale-110 transition-transform">thumb_down</span>
                        错误
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </div>
    </div>
  );
};

export default TagCalibration;
