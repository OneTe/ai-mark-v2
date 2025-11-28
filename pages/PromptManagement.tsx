import React, { useState, useEffect } from 'react';
import { PromptVersion } from '../types';

// Mock data for prompt versions
const mockPromptVersions: PromptVersion[] = [
  {
    id: '1',
    version: 'v1.0',
    content: 'Generate tags for an image of a city scene. Identify key elements such as \'building\', \'skyscraper\', \'street\', \'car\', \'pedestrian\', \'traffic light\', and \'tree\'. Also, determine the time of day: \'day\', \'night\', \'dusk\', \'dawn\'. Assess the overall atmosphere, like \'bustling\', \'quiet\', or \'modern\'. The final output should be a comma-separated list of relevant tags.',
    createdAt: '2023-10-20 09:00',
    updatedAt: '2023-10-20 09:00',
    isActive: false,
    author: 'System'
  },
  {
    id: '2',
    version: 'v1.1',
    content: 'Generate tags for an image of a city scene. Identify key elements such as \'building\', \'skyscraper\', \'street\', \'car\', \'pedestrian\', \'traffic light\', and \'tree\'. Also, determine the time of day: \'day\', \'night\', \'dusk\', \'dawn\'. Assess the overall atmosphere, like \'bustling\', \'quiet\', or \'modern\'. Include weather conditions if visible: \'sunny\', \'rainy\', \'cloudy\', \'foggy\'. The final output should be a comma-separated list of relevant tags.',
    createdAt: '2023-10-22 14:30',
    updatedAt: '2023-10-22 14:30',
    isActive: false,
    author: 'Admin'
  },
  {
    id: '3',
    version: 'v2.0',
    content: 'Analyze the provided city scene image and generate comprehensive tags. \n\nKey elements to identify:\n- Architecture: \'building\', \'skyscraper\', \'residential\', \'commercial\', \'historical\'\n- Transportation: \'car\', \'bus\', \'bicycle\', \'pedestrian\', \'traffic light\', \'crosswalk\'\n- Nature: \'tree\', \'park\', \'garden\', \'plants\'\n- Time: \'day\', \'night\', \'dusk\', \'dawn\'\n- Weather: \'sunny\', \'rainy\', \'cloudy\', \'foggy\', \'snowy\'\n- Atmosphere: \'bustling\', \'quiet\', \'modern\', \'vintage\', \'crowded\'\n- Urban features: \'street sign\', \'billboard\', \'bench\', \'street lamp\'\n\nOutput format: Return a comma-separated list of relevant tags only.',
    createdAt: '2023-10-25 16:45',
    updatedAt: '2023-10-27 14:30',
    isActive: true,
    author: 'Admin'
  },
  {
    id: '4',
    version: 'v2.1',
    content: 'Analyze the provided city scene image and generate comprehensive tags. \n\nKey elements to identify:\n- Architecture: \'building\', \'skyscraper\', \'residential\', \'commercial\', \'historical\'\n- Transportation: \'car\', \'bus\', \'bicycle\', \'pedestrian\', \'traffic light\', \'crosswalk\'\n- Nature: \'tree\', \'park\', \'garden\', \'plants\'\n- Time: \'day\', \'night\', \'dusk\', \'dawn\'\n- Weather: \'sunny\', \'rainy\', \'cloudy\', \'foggy\', \'snowy\'\n- Atmosphere: \'bustling\', \'quiet\', \'modern\', \'vintage\', \'crowded\'\n- Urban features: \'street sign\', \'billboard\', \'bench\', \'street lamp\'\n- Additional context: \'downtown\', \'suburb\', \'intersection\'\n\nOutput format: Return a comma-separated list of relevant tags only. Ensure accuracy and relevance.',
    createdAt: '2023-11-01 10:20',
    updatedAt: '2023-11-01 10:20',
    isActive: false,
    author: 'Admin'
  },
  {
    id: '5',
    version: 'v2.2',
    content: 'Analyze the provided city scene image and generate comprehensive tags for image classification and search optimization.\n\nKey elements to identify:\n- Architecture: \'building\', \'skyscraper\', \'residential\', \'commercial\', \'historical\', \'modern architecture\'\n- Transportation: \'car\', \'bus\', \'bicycle\', \'pedestrian\', \'traffic light\', \'crosswalk\', \'parking\'\n- Nature: \'tree\', \'park\', \'garden\', \'plants\', \'flowers\'\n- Time: \'day\', \'night\', \'dusk\', \'dawn\', \'sunrise\', \'sunset\'\n- Weather: \'sunny\', \'rainy\', \'cloudy\', \'foggy\', \'snowy\', \'clear sky\'\n- Atmosphere: \'bustling\', \'quiet\', \'modern\', \'vintage\', \'crowded\', \'peaceful\'\n- Urban features: \'street sign\', \'billboard\', \'bench\', \'street lamp\', \'fountain\', \'statue\'\n- Additional context: \'downtown\', \'suburb\', \'intersection\', \'plaza\', \'waterfront\'\n\nOutput format: Return a comma-separated list of relevant tags only. Prioritize the most prominent and distinctive features. Ensure accuracy and relevance to improve searchability.',
    createdAt: '2023-11-05 09:15',
    updatedAt: '2023-11-05 09:15',
    isActive: false,
    author: 'System'
  }
];

const PromptManagement: React.FC = () => {
  const [prompts, setPrompts] = useState<PromptVersion[]>(mockPromptVersions);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<PromptVersion | null>(null);
  const [editContent, setEditContent] = useState('');
  const [displayCount, setDisplayCount] = useState(10);

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      const scrollableDiv = document.getElementById('prompt-list-container');
      if (!scrollableDiv) return;

      const { scrollTop, scrollHeight, clientHeight } = scrollableDiv;
      if (scrollTop + clientHeight >= scrollHeight - 50) {
        // Load more when near bottom
        setDisplayCount(prev => Math.min(prev + 5, prompts.length));
      }
    };

    const scrollableDiv = document.getElementById('prompt-list-container');
    scrollableDiv?.addEventListener('scroll', handleScroll);

    return () => scrollableDiv?.removeEventListener('scroll', handleScroll);
  }, [prompts.length]);

  const handleCardClick = (prompt: PromptVersion) => {
    setSelectedPrompt(prompt);
    setEditContent(prompt.content);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!selectedPrompt) return;

    // Create a new version based on edit
    const updatedPrompts = prompts.map(p => {
      if (p.id === selectedPrompt.id) {
        return {
          ...p,
          content: editContent,
          updatedAt: new Date().toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          }).replace(/\//g, '-')
        };
      }
      return p;
    });

    setPrompts(updatedPrompts);
    setIsEditing(false);
    setSelectedPrompt(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedPrompt(null);
    setEditContent('');
  };

  const truncateText = (text: string, maxLength: number = 120) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // List View
  if (!isEditing) {
    return (
      <div className="flex-1 overflow-hidden bg-gray-50 dark:bg-background-dark">
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="bg-white dark:bg-panel-dark border-b border-gray-200 dark:border-gray-700 px-8 py-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Prompt 管理</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              管理和编辑所有 Prompt 版本
            </p>
          </div>

          {/* Prompt Cards List */}
          <div
            id="prompt-list-container"
            className="flex-1 overflow-y-auto px-8 py-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {prompts.slice(0, displayCount).map((prompt) => (
                <div
                  key={prompt.id}
                  onClick={() => handleCardClick(prompt)}
                  className="bg-white dark:bg-panel-dark rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5 cursor-pointer transition-all hover:shadow-md hover:border-primary hover:scale-[1.02] group"
                >
                  {/* Header with version and status */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-xl">
                        code
                      </span>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {prompt.version}
                      </h3>
                    </div>
                    {prompt.isActive && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        当前使用
                      </span>
                    )}
                  </div>

                  {/* Content preview */}
                  <div className="bg-gray-50 dark:bg-gray-900/50 rounded-md p-3 mb-3">
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-mono">
                      {truncateText(prompt.content)}
                    </p>
                  </div>

                  {/* Footer with metadata */}
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">
                        schedule
                      </span>
                      <span>{prompt.updatedAt}</span>
                    </div>
                    {prompt.author && (
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">
                          person
                        </span>
                        <span>{prompt.author}</span>
                      </div>
                    )}
                  </div>

                  {/* Hover indicator */}
                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex items-center gap-1 text-primary text-sm font-medium">
                      <span>点击编辑</span>
                      <span className="material-symbols-outlined text-sm">
                        arrow_forward
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load more indicator */}
            {displayCount < prompts.length && (
              <div className="text-center py-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  向下滚动加载更多...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Edit View
  return (
    <div className="flex-1 overflow-hidden bg-gray-50 dark:bg-background-dark">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="bg-white dark:bg-panel-dark border-b border-gray-200 dark:border-gray-700 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleCancel}
                  className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <span className="material-symbols-outlined text-gray-600 dark:text-gray-400">
                    arrow_back
                  </span>
                </button>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  编辑 Prompt {selectedPrompt?.version}
                </h1>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 ml-11">
                创建时间: {selectedPrompt?.createdAt} | 最近修改: {selectedPrompt?.updatedAt}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">
                  save
                </span>
                保存
              </button>
            </div>
          </div>
        </div>

        {/* Editor Content */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-panel-dark rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Prompt 内容
              </label>
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full h-96 px-4 py-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                placeholder="输入 Prompt 内容..."
              />

              {/* Metadata */}
              <div className="mt-6 grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                    版本号
                  </label>
                  <p className="text-sm text-gray-900 dark:text-white font-medium">
                    {selectedPrompt?.version}
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                    作者
                  </label>
                  <p className="text-sm text-gray-900 dark:text-white font-medium">
                    {selectedPrompt?.author || 'N/A'}
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                    创建时间
                  </label>
                  <p className="text-sm text-gray-900 dark:text-white">
                    {selectedPrompt?.createdAt}
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                    状态
                  </label>
                  <p className="text-sm">
                    {selectedPrompt?.isActive ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        当前使用
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                        历史版本
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptManagement;
