import React, { useState } from 'react';
import { generateTagsForImage, testPromptWithMock } from '../services/geminiService';
import { PromptVersion } from '../types';

interface PromptConfigProps {
  onViewExecution: (id: string) => void;
}

interface Log {
  version: string;
  time: string;
  model: string;
  status: 'Completed' | 'Failed';
  accuracy?: string;
}

// Mock historical prompt versions
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
  }
];

const PromptConfig: React.FC<PromptConfigProps> = ({ onViewExecution }) => {
  const currentVersion = mockPromptVersions.find(p => p.isActive) || mockPromptVersions[mockPromptVersions.length - 1];

  const [prompt, setPrompt] = useState(currentVersion.content);
  const [model, setModel] = useState('gemini-2.5-flash');
  const [isExecuting, setIsExecuting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [testResult, setTestResult] = useState<string | null>(null);
  const [showComparison, setShowComparison] = useState(false);
  const [selectedHistoryVersion, setSelectedHistoryVersion] = useState<string>(mockPromptVersions[0].id);

  const handleExecute = async () => {
    setIsExecuting(true);
    setTestResult(null);
    setProgress(10);

    try {
        // Simulate progress for the "batch" execution visual
        const interval = setInterval(() => {
            setProgress(prev => Math.min(prev + 5, 90));
        }, 200);

        // Actual call to Gemini Service (Mocked or Real) for a "Sample" test
        const result = await testPromptWithMock(prompt, model);

        clearInterval(interval);
        setProgress(100);
        setTestResult(result);

        // In a real app, this would trigger a backend job
    } catch (e) {
        console.error(e);
        setTestResult("Error executing prompt.");
    } finally {
        setTimeout(() => setIsExecuting(false), 1000);
    }
  };

  const handleSave = () => {
    // TODO: Save current prompt to existing version
    alert('保存成功！');
  };

  const handleSaveAsNewVersion = () => {
    // Get the latest version number and increment
    const versionNumbers = mockPromptVersions.map(p => {
      const match = p.version.match(/v(\d+)\.(\d+)/);
      return match ? parseInt(match[1]) : 0;
    });
    const maxMajorVersion = Math.max(...versionNumbers);
    const newVersion = `v${maxMajorVersion + 1}.0`;

    // TODO: Save as new version
    alert(`已保存为新版本：${newVersion}`);
  };

  const selectedHistoryPrompt = mockPromptVersions.find(p => p.id === selectedHistoryVersion);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Editor Column */}
      <div className="flex flex-col gap-6 bg-white dark:bg-panel-dark p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 h-fit">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Prompt 编辑区</h2>
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <span className="material-symbols-outlined text-sm">
              {showComparison ? 'visibility_off' : 'compare'}
            </span>
            {showComparison ? '隐藏对比' : '历史对比'}
          </button>
        </div>

        {/* Comparison Mode */}
        {showComparison ? (
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
                    {mockPromptVersions.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.version} {p.isActive ? '(当前)' : ''}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="relative">
                  <textarea
                    className="w-full h-[400px] p-4 text-sm leading-relaxed border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-400 resize-none"
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
                  当前编辑 <span className="text-primary">({currentVersion.version})</span>
                </label>
                <textarea
                  className="w-full h-[400px] p-4 text-sm leading-relaxed border-2 border-primary/50 dark:border-primary/50 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none resize-none"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="请输入用于从图片中提取标签的 Prompt..."
                />
              </div>
            </div>
          </div>
        ) : (
          /* Normal Edit Mode */
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              标签提取 Prompt <span className="text-gray-500 text-xs">({currentVersion.version})</span>
            </label>
            <textarea
              className="w-full min-h-[300px] p-4 text-sm leading-relaxed border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none resize-y"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="请输入用于从图片中提取标签的 Prompt..."
            />
          </div>
        )}

        <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            恢复默认
          </button>
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              保存
            </button>
            <button
              onClick={handleSaveAsNewVersion}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined text-sm">add_circle</span>
              保存为新版本
            </button>
          </div>
        </div>
      </div>

      {/* Execution & History Column */}
      <div className="flex flex-col gap-6">
        {/* Execution Panel */}
        <div className="bg-white dark:bg-panel-dark p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">执行</h2>
            <div className="flex items-center gap-3">
              <div className="relative">
                <select 
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none cursor-pointer"
                >
                  <option value="gemini-2.5-flash">Gemini 2.5 Flash</option>
                  <option value="gemini-3-pro-preview">Gemini 3 Pro</option>
                  <option value="gemini-2.5-flash-image">Gemini Flash Image</option>
                </select>
                <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">expand_more</span>
              </div>
              <button 
                onClick={handleExecute}
                disabled={isExecuting}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
              >
                {isExecuting ? (
                  <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
                ) : (
                  <span className="material-symbols-outlined text-lg">play_arrow</span>
                )}
                执行
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">当前执行状态</h3>
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>{isExecuting ? 'Processing batch...' : 'Idle'}</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            {testResult && (
               <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                   <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Sample Output</h4>
                   <pre className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap font-mono">{testResult}</pre>
               </div>
            )}
          </div>
        </div>

        {/* History Panel */}
        <div className="bg-white dark:bg-panel-dark p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex-1">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">最近几次执行记录列表</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Prompt 版本</th>
                  <th className="px-4 py-3">执行时间</th>
                  <th className="px-4 py-3">使用模型</th>
                  <th className="px-4 py-3">执行状态</th>
                  <th className="px-4 py-3 text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {[
                  { id: '#10234', promptVersion: 'v2.1', t: '2024-05-19 14:30', m: 'Gemini 2.5 Flash', s: 'Completed' },
                  { id: '#10233', promptVersion: 'v2.0', t: '2024-05-18 10:15', m: 'Gemini 2.5 Flash', s: 'Completed' },
                  { id: '#10232', promptVersion: 'v1.3', t: '2024-05-17 09:00', m: 'Gemini Pro', s: 'Failed' },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-gray-600 dark:text-gray-400">{row.id}</td>
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-medium">
                        {row.promptVersion}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{row.t}</td>
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{row.m}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium
                        ${row.s === 'Completed' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${row.s === 'Completed' ? 'bg-success' : 'bg-danger'}`}></span>
                        {row.s === 'Completed' ? '已完成' : '失败'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => onViewExecution(row.id)}
                        className="text-primary hover:text-primary-dark font-medium text-xs hover:underline"
                      >
                        查看详情
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptConfig;
