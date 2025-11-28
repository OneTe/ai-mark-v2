import React, { useState } from 'react';

interface ExecutionDetailProps {
  executionId: string;
  onBack: () => void;
}

interface ImageResult {
  id: string;
  imageUrl: string;
  status: 'Success' | 'Failed';
  tags?: string[];
  error?: string;
}

// Mock execution detail data
const mockExecutionDetails = {
  '#10234': {
    id: '#10234',
    promptVersion: 'v2.1',
    promptContent: 'Analyze the provided city scene image and generate comprehensive tags. \n\nKey elements to identify:\n- Architecture: \'building\', \'skyscraper\', \'residential\', \'commercial\', \'historical\'\n- Transportation: \'car\', \'bus\', \'bicycle\', \'pedestrian\', \'traffic light\', \'crosswalk\'\n- Nature: \'tree\', \'park\', \'garden\', \'plants\'\n- Time: \'day\', \'night\', \'dusk\', \'dawn\'\n- Weather: \'sunny\', \'rainy\', \'cloudy\', \'foggy\', \'snowy\'\n- Atmosphere: \'bustling\', \'quiet\', \'modern\', \'vintage\', \'crowded\'\n- Urban features: \'street sign\', \'billboard\', \'bench\', \'street lamp\'\n\nOutput format: Return a comma-separated list of relevant tags only.',
    executionTime: '2024-05-19 14:30',
    model: 'Gemini 2.5 Flash',
    status: 'Completed' as const,
    processedImages: 1500,
    totalImages: 1500,
    accuracy: '96.5%',
    successCount: 1448,
    failedCount: 52,
    imageResults: Array.from({ length: 20 }, (_, i) => ({
      id: `IMG_${8821 + i}.jpg`,
      imageUrl: `https://picsum.photos/400/300?random=${i + 100}`,
      status: i % 15 === 0 ? 'Failed' : 'Success',
      tags: i % 15 === 0 ? undefined : ['City', 'Building', 'Street', 'Day', 'Modern'],
      error: i % 15 === 0 ? '图像处理超时' : undefined,
    })) as ImageResult[],
  },
  '#10233': {
    id: '#10233',
    promptVersion: 'v2.0',
    promptContent: 'Generate comprehensive tags for city scenes...',
    executionTime: '2024-05-18 10:15',
    model: 'Gemini 2.5 Flash',
    status: 'Completed' as const,
    processedImages: 1500,
    totalImages: 1500,
    accuracy: '94.2%',
    successCount: 1413,
    failedCount: 87,
    imageResults: [] as ImageResult[],
  },
  '#10232': {
    id: '#10232',
    promptVersion: 'v1.3',
    promptContent: 'Identify key elements in city images...',
    executionTime: '2024-05-17 09:00',
    model: 'Gemini Pro',
    status: 'Failed' as const,
    processedImages: 850,
    totalImages: 1500,
    successCount: 750,
    failedCount: 100,
    errorMessage: 'API 调用限额超出，执行中断',
    imageResults: [] as ImageResult[],
  },
};

const ExecutionDetail: React.FC<ExecutionDetailProps> = ({ executionId, onBack }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState<'all' | 'success' | 'failed'>('all');
  const itemsPerPage = 12;

  const executionData = mockExecutionDetails[executionId as keyof typeof mockExecutionDetails];

  if (!executionData) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <span className="material-symbols-outlined text-6xl text-gray-300">error</span>
        <p className="text-gray-500 dark:text-gray-400">未找到执行记录</p>
        <button onClick={onBack} className="px-4 py-2 text-primary hover:text-primary-dark font-medium">
          返回列表
        </button>
      </div>
    );
  }

  // Filter images
  const filteredImages = executionData.imageResults.filter(img => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'success') return img.status === 'Success';
    if (filterStatus === 'failed') return img.status === 'Failed';
    return true;
  });

  const totalPages = Math.ceil(filteredImages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentImages = filteredImages.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Breadcrumb & Back Button */}
      <div className="flex items-center gap-2 text-sm">
        <button onClick={onBack} className="text-gray-500 dark:text-gray-400 hover:text-primary transition-colors">
          运行历史
        </button>
        <span className="text-gray-400">/</span>
        <span className="text-gray-900 dark:text-white font-medium">执行详情 {executionId}</span>
      </div>

      {/* Header */}
      <div className="bg-white dark:bg-panel-dark p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">执行详情</h2>
              <span className="font-mono text-sm text-gray-600 dark:text-gray-400">{executionData.id}</span>
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium
                ${executionData.status === 'Completed' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${executionData.status === 'Completed' ? 'bg-success' : 'bg-danger'}`}></span>
                {executionData.status === 'Completed' ? '已完成' : '失败'}
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              执行时间: {executionData.executionTime} · 模型: {executionData.model}
            </p>
          </div>
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-4 py-2 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            返回
          </button>
        </div>

        {/* Prompt Version Info */}
        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">使用的 Prompt 版本:</span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">
              {executionData.promptVersion}
            </span>
          </div>
          <details className="mt-2">
            <summary className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer hover:text-primary">
              查看 Prompt 内容
            </summary>
            <pre className="mt-2 p-3 bg-white dark:bg-gray-900 rounded text-xs text-gray-800 dark:text-gray-200 whitespace-pre-wrap border border-gray-200 dark:border-gray-700">
              {executionData.promptContent}
            </pre>
          </details>
        </div>

        {/* Error Message (if failed) */}
        {executionData.status === 'Failed' && executionData.errorMessage && (
          <div className="mt-4 p-4 bg-danger/10 border border-danger/30 rounded-lg">
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-danger text-xl">error</span>
              <div>
                <p className="text-sm font-medium text-danger mb-1">执行失败原因</p>
                <p className="text-sm text-danger/80">{executionData.errorMessage}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-panel-dark p-5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">处理进度</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {executionData.processedImages}/{executionData.totalImages}
              </p>
            </div>
            <span className="material-symbols-outlined text-4xl text-primary opacity-20">pending_actions</span>
          </div>
          <div className="mt-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${executionData.status === 'Completed' ? 'bg-success' : 'bg-danger'}`}
              style={{ width: `${(executionData.processedImages / executionData.totalImages) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white dark:bg-panel-dark p-5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">准确率</p>
              <p className="text-2xl font-bold text-success">
                {executionData.accuracy || 'N/A'}
              </p>
            </div>
            <span className="material-symbols-outlined text-4xl text-success opacity-20">assessment</span>
          </div>
        </div>

        <div className="bg-white dark:bg-panel-dark p-5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">成功</p>
              <p className="text-2xl font-bold text-success">{executionData.successCount}</p>
            </div>
            <span className="material-symbols-outlined text-4xl text-success opacity-20">check_circle</span>
          </div>
        </div>

        <div className="bg-white dark:bg-panel-dark p-5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">失败</p>
              <p className="text-2xl font-bold text-danger">{executionData.failedCount}</p>
            </div>
            <span className="material-symbols-outlined text-4xl text-danger opacity-20">cancel</span>
          </div>
        </div>
      </div>

      {/* Image Results */}
      <div className="bg-white dark:bg-panel-dark rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">图片处理结果</h3>
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
              {(['all', 'success', 'failed'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    setFilterStatus(status);
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md whitespace-nowrap transition-all ${
                    filterStatus === status
                      ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {status === 'all' ? '全部' : status === 'success' ? '成功' : '失败'}
                  <span className="ml-1.5 text-xs opacity-75">
                    ({status === 'all' ? executionData.imageResults.length :
                      status === 'success' ? executionData.successCount : executionData.failedCount})
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Image Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {currentImages.map((img) => (
              <div
                key={img.id}
                className={`bg-white dark:bg-panel-dark rounded-lg border overflow-hidden hover:shadow-md transition-all ${
                  img.status === 'Success'
                    ? 'border-gray-200 dark:border-gray-700'
                    : 'border-danger/30 ring-1 ring-danger/20'
                }`}
              >
                <div className="relative aspect-video bg-gray-100 dark:bg-gray-800">
                  <img src={img.imageUrl} alt={img.id} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium shadow-sm backdrop-blur-md ${
                        img.status === 'Success' ? 'bg-white/90 text-success' : 'bg-white/90 text-danger'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${img.status === 'Success' ? 'bg-success' : 'bg-danger'}`}></span>
                      {img.status === 'Success' ? '成功' : '失败'}
                    </span>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{img.id}</p>
                  {img.status === 'Success' && img.tags && (
                    <div className="flex flex-wrap gap-1">
                      {img.tags.map((tag, idx) => (
                        <span key={idx} className="px-1.5 py-0.5 rounded bg-primary/10 text-primary text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  {img.status === 'Failed' && (
                    <p className="text-xs text-danger">{img.error}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-6">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="flex items-center justify-center w-8 h-8 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-panel-dark text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <span className="material-symbols-outlined text-lg">chevron_left</span>
              </button>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map((page) => (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default ExecutionDetail;
