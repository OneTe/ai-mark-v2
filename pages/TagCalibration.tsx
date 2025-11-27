import React from 'react';

const TagCalibration: React.FC = () => {
  const images = [
    { id: 'a3b8c1d9', url: 'https://picsum.photos/400/400?random=10', tags: ['狗', '宠物', '户外'], status: null },
    { id: 'e4f5g2h1', url: 'https://picsum.photos/400/400?random=11', tags: ['狗', '宠物'], status: 'Correct' },
    { id: 'i6j7k8l9', url: 'https://picsum.photos/400/400?random=12', tags: ['狗', '宠物', '肖像'], status: 'Incorrect' },
    { id: 'm0n1o2p3', url: 'https://picsum.photos/400/400?random=13', tags: ['狗', '宠物'], status: null },
    { id: 'q4r5s6t7', url: 'https://picsum.photos/400/400?random=14', tags: ['狗', '宠物', '可爱'], status: null },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-200px)] animate-in fade-in slide-in-from-bottom-4 duration-300">
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
        <div className="bg-white dark:bg-panel-dark p-4 rounded-lg border border-gray-200 dark:border-gray-700 flex justify-between items-center shadow-sm">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              校准标签: <span className="text-primary">狗</span>
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">共 2300 张图片, 已评估 850 张, 当前准确率 91%</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-lg text-sm font-medium cursor-not-allowed opacity-70">
            <span className="material-symbols-outlined text-lg">verified</span>
            标记该标签为已通过
          </button>
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
                    <button className={`w-full flex items-center justify-center gap-1.5 py-1.5 text-sm font-medium rounded-md mt-auto transition-colors
                      ${img.status === 'Correct' 
                        ? 'bg-success/10 text-success hover:bg-success/20' 
                        : 'bg-danger/10 text-danger hover:bg-danger/20'}`}>
                      <span className="material-symbols-outlined text-base">undo</span>
                      撤销 ({img.status === 'Correct' ? '正确' : '错误'})
                    </button>
                  ) : (
                    <div className="grid grid-cols-2 gap-2 mt-auto">
                      <button className="flex items-center justify-center gap-1.5 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm transition-colors group">
                        <span className="material-symbols-outlined text-base text-success group-hover:scale-110 transition-transform">thumb_up</span>
                        正确
                      </button>
                      <button className="flex items-center justify-center gap-1.5 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm transition-colors group">
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
  );
};

export default TagCalibration;
