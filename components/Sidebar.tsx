import React from 'react';

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, onNavigate }) => {
  const menuItems = [
    { id: 'datasets', label: '数据集管理', icon: 'dataset' },
    { id: 'prompt-management', label: 'Prompt管理', icon: 'code' },
  ];

  return (
    <aside class="flex flex-col w-64 h-screen fixed left-0 top-0 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-panel-dark z-20">
      <div class="flex items-center gap-3 px-6 py-5">
        <div 
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" 
          style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDE70DRHf5bEeCbTeJqpdIpaz2_kT3QtG2l33LvEIy-gRmxiXf-U9RZwQ_mDejWEvRN5nv0wo81ctFs50kPsZGzSKr61xHNOlWSgqx8klvj9F8XzVdOCtVnFJUEtfBqXosmS5b7PBeIfav4Y7iUYvX9EJOSiu5kzazvbgZqWXJd2pjWe9pr0hthdvIPl1TLn5PUFusO7amJ7w7_FYTpJEBHF2TiosacTPdzktcgmBvv6LPHf5CfsXVnxNUgkP6-KJGU3zgVJGjwEw")' }}
        ></div>
        <div class="flex flex-col">
          <h1 class="text-gray-900 dark:text-white text-base font-bold leading-normal">AI Tagging</h1>
          <p class="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">Workspace</p>
        </div>
      </div>
      
      <nav class="flex flex-col gap-2 mt-4 px-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm font-medium leading-normal
              ${activePage === item.id 
                ? 'bg-primary/10 text-primary dark:text-primary' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
          >
            <span className={`material-symbols-outlined ${activePage === item.id ? 'filled' : ''}`}>
              {item.icon}
            </span>
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
