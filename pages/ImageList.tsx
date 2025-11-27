import React from 'react';

const mockImages = [
  { id: 'IMG_8821.jpg', url: 'https://picsum.photos/400/300?random=1', status: 'Success', tags: ['Mountain', 'Nature', 'Landscape'] },
  { id: 'IMG_8822.jpg', url: 'https://picsum.photos/400/300?random=2', status: 'Failed', error: '分析超时，无法生成标签。' },
  { id: 'IMG_8823.jpg', url: 'https://picsum.photos/400/300?random=3', status: 'Unprocessed' },
  { id: 'IMG_8824.jpg', url: 'https://picsum.photos/400/300?random=4', status: 'Success', tags: ['Lake', 'Kayak', 'Water'] },
  { id: 'IMG_8825.jpg', url: 'https://picsum.photos/400/300?random=5', status: 'Success', tags: ['Ocean', 'Sunset', 'Boat'] },
  { id: 'IMG_8826.jpg', url: 'https://picsum.photos/400/300?random=6', status: 'Success', tags: ['City', 'Building', 'Night'] },
  { id: 'IMG_8827.jpg', url: 'https://picsum.photos/400/300?random=7', status: 'Success', tags: ['Forest', 'Tree', 'Green'] },
  { id: 'IMG_8828.jpg', url: 'https://picsum.photos/400/300?random=8', status: 'Failed', error: 'Image corrupted.' },
];

const ImageList: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Filter Bar */}
      <div className="bg-white dark:bg-panel-dark p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:max-w-xs">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-gray-500">search</span>
          </div>
          <input 
            type="text" 
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg leading-5 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
            placeholder="搜索图片 ID"
          />
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto">
          <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            {['全部', '成功', '失败', '未处理'].map((filter, idx) => (
              <button 
                key={filter}
                className={`px-3 py-1.5 text-sm font-medium rounded-md whitespace-nowrap transition-all
                  ${idx === 0 
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1 border-l border-gray-200 dark:border-gray-700 pl-4">
            <button className="p-2 text-primary bg-primary/10 rounded-lg">
              <span className="material-symbols-outlined text-xl">grid_view</span>
            </button>
            <button className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
              <span className="material-symbols-outlined text-xl">view_list</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {mockImages.map((img) => (
          <div key={img.id} className="group bg-white dark:bg-panel-dark rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-all duration-200 hover:-translate-y-1">
            <div className="relative aspect-video bg-gray-100 dark:bg-gray-800">
              <img src={img.url} alt={img.id} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium shadow-sm backdrop-blur-md
                  ${img.status === 'Success' ? 'bg-white/90 text-success' : 
                    img.status === 'Failed' ? 'bg-white/90 text-danger' : 
                    'bg-white/90 text-gray-600'}`}>
                  <span className={`w-1.5 h-1.5 rounded-full 
                    ${img.status === 'Success' ? 'bg-success' : 
                      img.status === 'Failed' ? 'bg-danger' : 
                      'bg-gray-400'}`}></span>
                  {img.status === 'Success' ? '成功' : img.status === 'Failed' ? '失败' : '未处理'}
                </span>
              </div>
            </div>
            <div className="p-4">
              <div className="mb-3">
                <p className="text-xs text-gray-500 dark:text-gray-400">图片 ID</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate" title={img.id}>{img.id}</p>
              </div>
              
              {img.status === 'Success' && img.tags && (
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">预测标签</p>
                  <div className="flex flex-wrap gap-1.5">
                    {img.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {img.status === 'Failed' && (
                <div>
                  <p className="text-xs text-danger mb-1">错误信息</p>
                  <p className="text-sm text-danger line-clamp-2">{img.error}</p>
                </div>
              )}

              {img.status === 'Unprocessed' && (
                <div>
                   <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">预测标签</p>
                   <p className="text-sm text-gray-400 italic">待处理</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between bg-white dark:bg-panel-dark px-4 py-3 border-t border-gray-200 dark:border-gray-700 sm:px-6 rounded-lg">
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700 dark:text-gray-400">
              Showing <span className="font-medium text-gray-900 dark:text-white">1</span> to <span className="font-medium text-gray-900 dark:text-white">8</span> of <span className="font-medium text-gray-900 dark:text-white">97</span> results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-panel-dark text-sm font-medium text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800">
                <span className="material-symbols-outlined text-lg">chevron_left</span>
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-primary/10 border-primary text-sm font-medium text-primary z-10">
                1
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-panel-dark text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                2
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-panel-dark text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                3
              </button>
              <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-panel-dark text-sm font-medium text-gray-700 dark:text-gray-300">
                ...
              </span>
              <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-panel-dark text-sm font-medium text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800">
                <span className="material-symbols-outlined text-lg">chevron_right</span>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageList;
