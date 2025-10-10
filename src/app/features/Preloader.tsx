import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useLockBodyScroll } from 'react-use';

const MainLoaderPortal: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
    {children}
  </div>
);

interface PreloaderProps {
  minLoadingTime?: number;
}

export const Preloader: React.FC<PreloaderProps> = ({ 
  minLoadingTime = 1500,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [loadingStep, setLoadingStep] = useState('Initializing...');
  const [progress, setProgress] = useState(0);

  useLockBodyScroll();

  useEffect(() => {
    const initializeApp = async () => {
      const steps = [
        { text: 'Connecting to blockchain...', progress: 10 },
        { text: 'Checking wallet connection...', progress: 40 },
        { text: 'Loading configuration...', progress: 70 },
        { text: 'Initializing application...', progress: 90 },
      ];

      const stepDuration = minLoadingTime / steps.length;

      for (const step of steps) {
        setLoadingStep(step.text);
        setProgress(step.progress);
        await new Promise(resolve => setTimeout(resolve, stepDuration));
      }

      setProgress(100);
      setIsVisible(false);
    };

    initializeApp();
  }, [minLoadingTime]);

  if (!isVisible) return null;

  return ReactDOM.createPortal(
    <MainLoaderPortal>
      <div className="flex flex-col items-center gap-6">
        {loadingStep && (
          <div className="text-center space-y-2">
            <p className="text-white text-lg font-medium animate-pulse">
              {loadingStep}
            </p>
          </div>
        )}

        <div className="w-64 space-y-2">
          <div className="h-1.5 bg-gray-700/50 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-out"
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          </div>
          <p className="text-gray-400 text-sm text-center">
            {Math.round(progress)}%
          </p>
        </div>
      </div>
    </MainLoaderPortal>,
    document.body
  );
};
