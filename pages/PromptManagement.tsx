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
  const [isCreating, setIsCreating] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<PromptVersion | null>(null);
  const [editContent, setEditContent] = useState('');
  const [displayCount, setDisplayCount] = useState(10);
  const [showComparison, setShowComparison] = useState(false);
  const [selectedHistoryVersion, setSelectedHistoryVersion] = useState<string>('');
  const [showSaveDropdown, setShowSaveDropdown] = useState(false);

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showSaveDropdown) {
        const target = event.target as HTMLElement;
        if (!target.closest('.save-dropdown-container')) {
          setShowSaveDropdown(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showSaveDropdown]);

  const handleCardClick = (prompt: PromptVersion) => {
    setSelectedPrompt(prompt);
    setEditContent(prompt.content);
    setIsEditing(true);
    setIsCreating(false);
    setShowComparison(false);
    // Set default comparison to previous version if available
    const currentIndex = prompts.findIndex(p => p.id === prompt.id);
    if (currentIndex < prompts.length - 1) {
      setSelectedHistoryVersion(prompts[currentIndex + 1].id);
    } else if (prompts.length > 1) {
      setSelectedHistoryVersion(prompts[0].id);
    }
  };

  const calculateNextVersion = (): string => {
    if (prompts.length === 0) {
      return 'v1';
    }

    // Extract all version numbers
    const versions = prompts.map(p => {
      const match = p.version.match(/v(\d+)(?:\.(\d+))?/);
      if (match) {
        const major = parseInt(match[1]);
        const minor = match[2] ? parseInt(match[2]) : 0;
        return { major, minor };
      }
      return { major: 0, minor: 0 };
    });

    // Find max major version
    const maxMajor = Math.max(...versions.map(v => v.major));

    // Return next version
    return `v${maxMajor + 1}`;
  };

  const handleCreateNew = () => {
    const newVersion = calculateNextVersion();
    const newPrompt: PromptVersion = {
      id: 'temp-new',
      version: newVersion,
      content: '',
      createdAt: new Date().toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }).replace(/\//g, '-'),
      updatedAt: new Date().toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }).replace(/\//g, '-'),
      isActive: false,
      author: 'Admin'
    };

    setSelectedPrompt(newPrompt);
    setEditContent('');
    setIsCreating(true);
    setIsEditing(true);
    setShowComparison(false);
  };

  const handleSave = () => {
    if (!selectedPrompt) return;

    if (isCreating) {
      // Create new prompt
      const newPrompt: PromptVersion = {
        id: String(prompts.length + 1),
        version: selectedPrompt.version,
        content: editContent,
        createdAt: selectedPrompt.createdAt,
        updatedAt: new Date().toLocaleString('zh-CN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }).replace(/\//g, '-'),
        isActive: false,
        author: 'Admin'
      };

      setPrompts([newPrompt, ...prompts]);
    } else {
      // Update existing version
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
    }

    setIsEditing(false);
    setIsCreating(false);
    setSelectedPrompt(null);
    setShowSaveDropdown(false);
  };

  const handleSaveAsNewVersion = () => {
    if (!selectedPrompt) return;

    // Parse version number and increment
    const versionMatch = selectedPrompt.version.match(/v(\d+)\.(\d+)/);
    let newVersion = 'v1.0';

    if (versionMatch) {
      const major = parseInt(versionMatch[1]);
      const minor = parseInt(versionMatch[2]);
      newVersion = `v${major}.${minor + 1}`;
    }

    // Create new version
    const newPrompt: PromptVersion = {
      id: String(prompts.length + 1),
      version: newVersion,
      content: editContent,
      createdAt: new Date().toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }).replace(/\//g, '-'),
      updatedAt: new Date().toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }).replace(/\//g, '-'),
      isActive: false,
      author: 'Admin'
    };

    setPrompts([newPrompt, ...prompts]);
    setIsEditing(false);
    setSelectedPrompt(null);
    setShowSaveDropdown(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsCreating(false);
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
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Prompt 管理</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  管理和编辑所有 Prompt 版本
                </p>
              </div>
              <button
                onClick={handleCreateNew}
                className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white text-sm font-bold rounded-lg transition-colors shadow-sm"
              >
                <span className="material-symbols-outlined text-lg">
                  add
                </span>
                创建新 Prompt
              </button>
            </div>
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
  const selectedHistoryPrompt = prompts.find(p => p.id === selectedHistoryVersion);

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
                  {isCreating ? '创建新 Prompt' : `编辑 Prompt ${selectedPrompt?.version}`}
                </h1>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 ml-11">
                创建时间: {selectedPrompt?.createdAt} | 最近修改: {selectedPrompt?.updatedAt}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {!isCreating && (
                <button
                  onClick={() => setShowComparison(!showComparison)}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">
                    {showComparison ? 'visibility_off' : 'compare'}
                  </span>
                  {showComparison ? '隐藏对比' : '历史对比'}
                </button>
              )}
              <button
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                取消
              </button>

              {/* Split button for Save options */}
              {isCreating ? (
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">
                    save
                  </span>
                  创建
                </button>
              ) : (
                <div className="relative save-dropdown-container">
                  <div className="flex">
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-l-lg transition-colors flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-sm">
                        save
                      </span>
                      保存
                    </button>
                    <button
                      onClick={() => setShowSaveDropdown(!showSaveDropdown)}
                      className="px-2 py-2 bg-primary hover:bg-primary-dark text-white border-l border-white/20 rounded-r-lg transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">
                        {showSaveDropdown ? 'expand_less' : 'expand_more'}
                      </span>
                    </button>
                  </div>

                  {/* Dropdown menu */}
                  {showSaveDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                      <button
                        onClick={handleSave}
                        className="w-full px-4 py-2.5 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 rounded-t-lg transition-colors"
                      >
                        <span className="material-symbols-outlined text-sm">
                          save
                        </span>
                        保存当前版本
                      </button>
                      <button
                        onClick={handleSaveAsNewVersion}
                        className="w-full px-4 py-2.5 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 rounded-b-lg transition-colors border-t border-gray-100 dark:border-gray-700"
                      >
                        <span className="material-symbols-outlined text-sm">
                          add_circle
                        </span>
                        保存为新版本
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Editor Content */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white dark:bg-panel-dark rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              {/* Comparison Mode */}
              {showComparison && !isCreating ? (
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Left: Historical Version */}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">历史版本参考</label>
                        <select
                          value={selectedHistoryVersion}
                          onChange={(e) => setSelectedHistoryVersion(e.target.value)}
                          className="text-xs px-2 py-1 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                        >
                          {prompts.filter(p => p.id !== selectedPrompt?.id).map(p => (
                            <option key={p.id} value={p.id}>
                              {p.version} {p.isActive ? '(当前使用)' : ''}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="relative">
                        <textarea
                          className="w-full h-[500px] p-4 text-sm leading-relaxed border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-400 resize-none font-mono"
                          value={selectedHistoryPrompt?.content || ''}
                          readOnly
                        />
                        <div className="absolute top-2 right-2 px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs text-gray-600 dark:text-gray-400">
                          只读
                        </div>
                      </div>
                      {selectedHistoryPrompt && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                          <div>创建时间: {selectedHistoryPrompt.createdAt}</div>
                          <div>作者: {selectedHistoryPrompt.author}</div>
                        </div>
                      )}
                    </div>

                    {/* Right: Current Editing */}
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        当前编辑 <span className="text-primary">({selectedPrompt?.version})</span>
                      </label>
                      <textarea
                        className="w-full h-[500px] p-4 text-sm leading-relaxed border-2 border-primary/50 dark:border-primary/50 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none resize-none font-mono"
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        placeholder="请输入 Prompt 内容..."
                      />
                    </div>
                  </div>
                </div>
              ) : (
                /* Normal Edit Mode */
                <div className="flex flex-col gap-3">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Prompt 内容
                  </label>
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full h-96 px-4 py-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100 font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    placeholder="输入 Prompt 内容..."
                  />
                </div>
              )}

              {/* Metadata */}
              <div className="mt-6 grid grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptManagement;
