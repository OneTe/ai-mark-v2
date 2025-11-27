import React, { useState } from 'react';
import { generateTagsForImage, testPromptWithMock } from '../services/geminiService';

interface Log {
  version: string;
  time: string;
  model: string;
  status: 'Completed' | 'Failed';
  accuracy?: string;
}

const PromptConfig: React.FC = () => {
  const [prompt, setPrompt] = useState(`Identify key elements such as 'building', 'skyscraper', 'street', 'car', 'pedestrian', 'traffic light', and 'tree'. Also, determine the time of day: 'day', 'night', 'dusk', 'dawn'. Assess the overall atmosphere, like 'bustling', 'quiet', or 'modern'. The final output should be a comma-separated list of relevant tags.`);
  const [model, setModel] = useState('gemini-2.5-flash');
  const [isExecuting, setIsExecuting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [testResult, setTestResult] = useState<string | null>(null);

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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Editor Column */}
      <div className="flex flex-col gap-6 bg-white dark:bg-panel-dark p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 h-fit">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Prompt 编辑区</h2>
        
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">标签提取 Prompt</label>
          <textarea 
            className="w-full min-h-[300px] p-4 text-sm leading-relaxed border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none resize-y"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="请输入用于从图片中提取标签的 Prompt..."
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            恢复默认
          </button>
          <button className="px-4 py-2 text-sm font-bold text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors shadow-sm">
            保存
          </button>
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
                  <th className="px-4 py-3">版本号</th>
                  <th className="px-4 py-3">执行时间</th>
                  <th className="px-4 py-3">使用模型</th>
                  <th className="px-4 py-3">执行状态</th>
                  <th className="px-4 py-3 text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {[
                  { v: 'v2.1', t: '2024-05-19 14:30', m: 'Gemini 2.5 Flash', s: 'Completed' },
                  { v: 'v2.0', t: '2024-05-18 10:15', m: 'Gemini 2.5 Flash', s: 'Completed' },
                  { v: 'v1.3', t: '2024-05-17 09:00', m: 'Gemini Pro', s: 'Failed' },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{row.v}</td>
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
                      <button className="text-primary hover:text-primary-dark font-medium text-xs hover:underline">查看详情</button>
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
