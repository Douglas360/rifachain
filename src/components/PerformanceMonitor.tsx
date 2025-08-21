import React, { useEffect, useRef } from 'react';

interface PerformanceMonitorProps {
  componentName: string;
  enabled?: boolean;
}

/**
 * Componente para monitorar a performance e detectar re-renders desnecessários
 * Só deve ser usado em desenvolvimento
 */
const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({ 
  componentName, 
  enabled = process.env.NODE_ENV === 'development' 
}) => {
  const renderCount = useRef(0);
  const lastRenderTime = useRef(Date.now());

  useEffect(() => {
    if (!enabled) return;

    renderCount.current += 1;
    const currentTime = Date.now();
    const timeSinceLastRender = currentTime - lastRenderTime.current;
    
    console.log(
      `🔄 ${componentName} renderizado ${renderCount.current} vezes. ` +
      `Tempo desde último render: ${timeSinceLastRender}ms`
    );
    
    lastRenderTime.current = currentTime;

    // Alertar se houver muitos re-renders em pouco tempo
    if (renderCount.current > 10 && timeSinceLastRender < 1000) {
      console.warn(
        `⚠️ ${componentName} está renderizando muito frequentemente! ` +
        `Considere usar useCallback, useMemo ou React.memo`
      );
    }
  });

  // Não renderizar nada, apenas monitorar
  return null;
};

export default PerformanceMonitor;
