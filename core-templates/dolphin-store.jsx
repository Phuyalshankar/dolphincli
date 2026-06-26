import { createContext, useContext, useReducer, useCallback } from 'react';

// 🐬 DolphinCSS — dolphin-store
// Zero-dependency global state manager (Context + useReducer)
// Usage:
//   import { useStore, setStore } from './dolphin-store';
//   const count = useStore(s => s.count);
//   setStore({ count: count + 1 });

const StoreContext = createContext(null);
const DispatchContext = createContext(null);

const initialState = {
  user: null,
  theme: 'dolphin',
  language: 'en',
  // ✏️ Add your global state here
};

function storeReducer(state, action) {
  switch (action.type) {
    case 'SET':
      return { ...state, ...action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

let _dispatch = null;

export function setStore(payload) {
  if (_dispatch) _dispatch({ type: 'SET', payload });
}

export function resetStore() {
  if (_dispatch) _dispatch({ type: 'RESET' });
}

export function useStore(selector) {
  const state = useContext(StoreContext);
  if (!state) throw new Error('useStore must be used inside <DolphinStoreProvider>');
  return selector ? selector(state) : state;
}

export function DolphinStoreProvider({ children }) {
  const [state, dispatch] = useReducer(storeReducer, initialState);
  _dispatch = dispatch;

  return (
    <StoreContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StoreContext.Provider>
  );
}

export default DolphinStoreProvider;
