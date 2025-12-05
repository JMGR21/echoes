import { useState, useCallback } from 'react';

export interface GameState {
  node1: boolean;
  node2: boolean;
  node3: boolean;
  node2Clicks: number;
  portalActive: boolean;
  completed: boolean;
}

const initialState: GameState = {
  node1: false,
  node2: false,
  node3: false,
  node2Clicks: 0,
  portalActive: false,
  completed: false,
};

export const useGameState = () => {
  const [state, setState] = useState<GameState>(initialState);

  const activateNode = useCallback((nodeKey: keyof Omit<GameState, 'node2Clicks' | 'portalActive' | 'completed'>) => {
    setState(prev => {
      if (prev[nodeKey]) return prev;
      
      // Check if trying to activate node out of order
      // Order: Node 1 -> Node 3 -> Node 2
      if (nodeKey === 'node1') {
        // Can always activate node 1 first
      } else if (nodeKey === 'node3') {
        // Can only activate node 3 after node 1
        if (!prev.node1) return prev;
      } else if (nodeKey === 'node2') {
        // Can only activate node 2 after node 1 and node 3
        if (!prev.node1 || !prev.node3) return prev;
      }
      
      const updated = { ...prev, [nodeKey]: true };
      
      // Check if all nodes activated
      if (updated.node1 && updated.node2 && updated.node3) {
        updated.portalActive = true;
      }
      
      return updated;
    });
  }, []);

  const increaseNode2Clicks = useCallback(() => {
    setState(prev => {
      // Only allow clicking node 2 after node 1 and node 3 are activated
      if (!prev.node1 || !prev.node3) return prev;
      if (prev.node2) return prev;
      
      const newClicks = prev.node2Clicks + 1;
      
      if (newClicks >= 3) {
        const updated = { ...prev, node2: true, node2Clicks: 0 };
        if (updated.node1 && updated.node3) {
          updated.portalActive = true;
        }
        return updated;
      }
      
      return { ...prev, node2Clicks: newClicks };
    });
  }, []);

  const completeGame = useCallback(() => {
    setState(prev => ({ ...prev, completed: true }));
  }, []);

  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  const getProgress = useCallback(() => {
    const count = (state.node1 ? 1 : 0) + (state.node2 ? 1 : 0) + (state.node3 ? 1 : 0);
    return (count / 3) * 100;
  }, [state.node1, state.node2, state.node3]);

  const getCurrentStep = useCallback(() => {
    if (!state.node1) return 1;
    if (!state.node3) return 2;
    if (!state.node2) return 3;
    return 4;
  }, [state.node1, state.node2, state.node3]);

  return {
    state,
    activateNode,
    increaseNode2Clicks,
    completeGame,
    reset,
    getProgress,
    getCurrentStep,
  };
};
