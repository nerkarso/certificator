import { MoonIcon, SunIcon } from '@heroicons/react/solid';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  return (
    <div className="fixed z-20 top-4 right-6">
      {isReady && (
        <button
          className="w-8 h-8 p-1 text-yellow-600 transition duration-200 bg-yellow-200 rounded-full shadow hover:scale-110 dark:text-indigo-700 dark:bg-indigo-300 focus:bg-yellow-300 dark:focus:bg-indigo-400 focus:outline-none"
          onClick={() => setTheme(theme == 'light' ? 'dark' : 'light')}>
          {theme == 'light' ? <SunIcon /> : <MoonIcon />}
        </button>
      )}
    </div>
  );
}

export default ThemeSwitcher;
