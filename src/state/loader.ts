import { create } from 'zustand';

export type LoaderProps = {
  loaded: boolean;
  loadedXr: boolean;
};

export const useLoader = create<LoaderProps>(() => ({
  loaded: false,
  loadedXr: false,
}));
