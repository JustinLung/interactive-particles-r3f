import { create } from 'zustand';

type PermissionProps = boolean;

export const usePermissions = create<PermissionProps>(() => true);
