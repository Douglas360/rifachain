import { useCallback, useMemo } from 'react';
import { useGlobalState, setGlobalState, getGlobalState } from '../store';
import { IGlobalState } from '../types/GlobalState';

/**
 * Hook customizado para otimizar o uso do estado global
 * Evita re-renders desnecessários através de memoização
 */
export const useOptimizedGlobalState = <K extends keyof IGlobalState>(key: K) => {
    const [value] = useGlobalState(key);

    // Memoizar o setter para evitar recriação
    const setValue = useCallback((newValue: IGlobalState[K]) => {
        setGlobalState(key, newValue);
    }, [key]);

    // Memoizar o getter para evitar recriação
    const getValue = useCallback(() => {
        return getGlobalState(key);
    }, [key]);

    return [value, setValue, getValue] as const;
};

/**
 * Hook para memoizar valores computados baseados no estado global
 */
export const useMemoizedGlobalValue = <K extends keyof IGlobalState, T>(
    key: K,
    computeFn: (value: IGlobalState[K]) => T,
    deps: any[] = []
) => {
    const [value] = useGlobalState(key);

    return useMemo(() => computeFn(value), [value, ...deps]);
};

/**
 * Hook para otimizar operações assíncronas com estado global
 */
export const useAsyncGlobalOperation = <T>(
    operation: () => Promise<T>,
    loadingKey: keyof IGlobalState = 'loading',
    deps: any[] = []
) => {
    const setLoading = useCallback((show: boolean, msg: string = '') => {
        setGlobalState(loadingKey, { show, msg });
    }, [loadingKey]);

    const executeOperation = useCallback(async () => {
        try {
            setLoading(true, 'Executando operação...');
            const result = await operation();
            setLoading(false);
            return result;
        } catch (error) {
            setLoading(false);
            throw error;
        }
    }, [operation, setLoading]);

    return executeOperation;
};
