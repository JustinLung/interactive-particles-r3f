import { isBrowser } from 'framer-motion';
import { create } from 'zustand';

type DebugProps = boolean;

export const useDebug = create<DebugProps>(() =>
  isBrowser
    ? process.env.NODE_ENV !== 'production' && location.search.includes('debug=true')
    : false,
);
