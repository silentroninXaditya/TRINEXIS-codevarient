import React, { createContext, useContext, useState, useEffect } from 'react';
import type { SavedVaultItem, UserLoggedProject, VaultBackupPayload } from '../types/project';

interface VaultContextType {
  savedItems: SavedVaultItem[];
  savedIds: string[];
  savedCount: number;
  isSaved: (projectId: string) => boolean;
  toggleSave: (projectId: string) => boolean;
  removeSaved: (projectId: string) => void;
  updateNote: (projectId: string, note: string) => void;
  getNote: (projectId: string) => string;
  // Own Unfinished Projects (Slides 6 & 7 Feature)
  ownProjects: UserLoggedProject[];
  logOwnProject: (project: Omit<UserLoggedProject, 'id' | 'createdAt'>) => void;
  deleteOwnProject: (id: string) => void;
  // Guest vs Logged-In Mode
  isGuest: boolean;
  toggleUserMode: () => void;
  userProfile: { name: string; handle: string; role: string };
  // Backup / Restore JSON
  exportVaultJson: () => void;
  importVaultJson: (jsonString: string) => { success: boolean; count: number; error?: string };
}

const VAULT_STORAGE_KEY = 'trinexis_graveyard_vault';
const OWN_PROJECTS_KEY = 'trinexis_own_projects';
const USER_MODE_KEY = 'trinexis_user_mode';

const SEEDED_OWN_PROJECTS: UserLoggedProject[] = [
  {
    id: 'own-crypto-tictactoe',
    title: 'Solana Move-To-Earn Sensor Loop',
    techStack: ['Rust', 'Anchor', 'React Native', 'BLE'],
    completedWork: 'Anchor smart contract program deployed to devnet; accelerometer step counting listener operational.',
    remainingWork: 'Token mint authority escrow synchronization; GPS geofence anti-cheat algorithm unwritten.',
    stoppingReason: 'Ran out of Solana devnet validator test funds right before semester hackathon deadline.',
    createdAt: '2024-04-18',
    recommendedPath: 'Repurpose',
    personalNotes: 'Can extract the Anchor contract logic to use in the upcoming hackathon!',
  },
];

const VaultContext = createContext<VaultContextType | undefined>(undefined);

export const VaultProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Guest vs Logged In Mode
  const [isGuest, setIsGuest] = useState<boolean>(() => {
    try {
      const mode = localStorage.getItem(USER_MODE_KEY);
      return mode === null ? true : mode === 'guest';
    } catch {
      return true;
    }
  });

  const toggleUserMode = () => {
    setIsGuest((prev) => {
      const next = !prev;
      localStorage.setItem(USER_MODE_KEY, next ? 'guest' : 'authenticated');
      return next;
    });
  };

  const userProfile = isGuest
    ? { name: 'Guest Developer', handle: 'anonymous_visitor', role: 'Stateless Explorer' }
    : { name: 'Alex Rivera', handle: 'arivera_trinexis', role: 'Core Architect' };

  // Saved Repositories from Graveyard
  const [savedItems, setSavedItems] = useState<SavedVaultItem[]>(() => {
    try {
      const raw = localStorage.getItem(VAULT_STORAGE_KEY);
      if (!raw) return [{ projectId: 'campus-ar-nav', savedAt: new Date().toISOString() }];
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed.map((item) => {
          if (typeof item === 'string') {
            return { projectId: item, savedAt: new Date().toISOString() };
          }
          return item;
        });
      }
      return [];
    } catch (e) {
      console.warn('Failed to parse saved vault from localStorage:', e);
      return [];
    }
  });

  // User's OWN Logged Unfinished Projects (Slides 6 & 7)
  const [ownProjects, setOwnProjects] = useState<UserLoggedProject[]>(() => {
    try {
      const raw = localStorage.getItem(OWN_PROJECTS_KEY);
      if (!raw) return SEEDED_OWN_PROJECTS;
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : SEEDED_OWN_PROJECTS;
    } catch (e) {
      console.warn('Failed to parse own projects from localStorage:', e);
      return SEEDED_OWN_PROJECTS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(VAULT_STORAGE_KEY, JSON.stringify(savedItems));
    } catch (e) {
      console.error('Failed to save vault to localStorage:', e);
    }
  }, [savedItems]);

  useEffect(() => {
    try {
      localStorage.setItem(OWN_PROJECTS_KEY, JSON.stringify(ownProjects));
    } catch (e) {
      console.error('Failed to save own projects to localStorage:', e);
    }
  }, [ownProjects]);

  const savedIds = savedItems.map((item) => item.projectId);
  const savedCount = savedItems.length;

  const isSaved = (projectId: string): boolean => {
    return savedItems.some((item) => item.projectId === projectId);
  };

  const toggleSave = (projectId: string): boolean => {
    let nowSaved = false;
    setSavedItems((prev) => {
      const exists = prev.some((item) => item.projectId === projectId);
      if (exists) {
        nowSaved = false;
        return prev.filter((item) => item.projectId !== projectId);
      } else {
        nowSaved = true;
        return [
          ...prev,
          {
            projectId,
            savedAt: new Date().toISOString(),
          },
        ];
      }
    });
    return nowSaved;
  };

  const removeSaved = (projectId: string) => {
    setSavedItems((prev) => prev.filter((item) => item.projectId !== projectId));
  };

  const updateNote = (projectId: string, note: string) => {
    setSavedItems((prev) =>
      prev.map((item) => {
        if (item.projectId === projectId) {
          return { ...item, personalNotes: note };
        }
        return item;
      })
    );
  };

  const getNote = (projectId: string): string => {
    const found = savedItems.find((item) => item.projectId === projectId);
    return found?.personalNotes || '';
  };

  const logOwnProject = (data: Omit<UserLoggedProject, 'id' | 'createdAt'>) => {
    const newProj: UserLoggedProject = {
      ...data,
      id: `own-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setOwnProjects((prev) => [newProj, ...prev]);
  };

  const deleteOwnProject = (id: string) => {
    setOwnProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const exportVaultJson = () => {
    const payload: VaultBackupPayload = {
      version: '2.0.0',
      exportedAt: new Date().toISOString(),
      vault: savedItems,
      ownProjects,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: 'application/json;charset=utf-8;',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `trinexis_graveyard_vault_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const importVaultJson = (
    jsonString: string
  ): { success: boolean; count: number; error?: string } => {
    try {
      const data = JSON.parse(jsonString);
      let itemsToMerge: SavedVaultItem[] = [];

      if (data && Array.isArray(data.vault)) {
        itemsToMerge = data.vault;
      } else if (Array.isArray(data)) {
        itemsToMerge = data.map((it: any) =>
          typeof it === 'string'
            ? { projectId: it, savedAt: new Date().toISOString() }
            : it
        );
      } else {
        return { success: false, count: 0, error: 'Invalid JSON vault schema.' };
      }

      setSavedItems((prev) => {
        const mergedMap = new Map<string, SavedVaultItem>();
        prev.forEach((it) => mergedMap.set(it.projectId, it));
        itemsToMerge.forEach((it) => {
          if (it && it.projectId) {
            mergedMap.set(it.projectId, it);
          }
        });
        return Array.from(mergedMap.values());
      });

      if (data && Array.isArray(data.ownProjects)) {
        setOwnProjects((prev) => {
          const map = new Map<string, UserLoggedProject>();
          prev.forEach((p) => map.set(p.id, p));
          data.ownProjects.forEach((p: UserLoggedProject) => {
            if (p && p.id) map.set(p.id, p);
          });
          return Array.from(map.values());
        });
      }

      return { success: true, count: itemsToMerge.length };
    } catch (err: any) {
      return { success: false, count: 0, error: err.message || 'JSON parse error' };
    }
  };

  return (
    <VaultContext.Provider
      value={{
        savedItems,
        savedIds,
        savedCount,
        isSaved,
        toggleSave,
        removeSaved,
        updateNote,
        getNote,
        ownProjects,
        logOwnProject,
        deleteOwnProject,
        isGuest,
        toggleUserMode,
        userProfile,
        exportVaultJson,
        importVaultJson,
      }}
    >
      {children}
    </VaultContext.Provider>
  );
};

export const useVault = (): VaultContextType => {
  const ctx = useContext(VaultContext);
  if (!ctx) {
    throw new Error('useVault must be used within a VaultProvider');
  }
  return ctx;
};
