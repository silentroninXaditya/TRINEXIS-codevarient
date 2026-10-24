/**
 * MASTER SPECIFICATION DATA CONTRACTS
 * Source: SPEC.md & TRINEXIS_MASTER_SPEC.md (PPT Slides 2-8 Alignment)
 */

export type RevivalPath = 'Restart' | 'Continue' | 'Change' | 'Repurpose' | 'Archive';

export type ProjectState =
  | 'Stalled Prototype'
  | 'Architecture Solid / UI Incomplete'
  | 'Abandoned Hackathon MVP'
  | 'Unknown State';

export type CuratedCollectionCategory =
  | 'all'
  | 'hackathon'
  | 'student'
  | 'auth'
  | 'stalled-gems';

export interface TimelineForensicEvent {
  date: string;
  title: string;
  type: 'commit' | 'release' | 'issue';
  detail: string;
}

export interface OrphanedProject {
  id: string;
  name: string;
  owner: string;
  githubUrl: string;
  lastCommitDate: string;
  commitCount: number;
  stars: number;
  primaryLanguage: string;
  languageColor?: string;
  techStack: string[];
  state: ProjectState;
  abandonmentReason: string | null; // null triggers the "REASON UNKNOWN" System Guardrail!
  documentedGoal: string;           // From README
  observedEvidence: string[];       // What actually works in the repo
  unfinishedGaps: string[];         // What is missing or broken
  recommendedPath: RevivalPath;
  curatedCollection?: CuratedCollectionCategory;
  rawReadme?: string;               // Slide 6 #02 Raw README Viewer
  timelineEvents?: TimelineForensicEvent[]; // Slide 5 #02 Commits, Releases & Issues
  revivalPlaybook: {
    Restart: string;
    Continue: string;
    Change: string;
    Repurpose: string;
    Archive: string;
  };
  aiAutopsySummary: string;         // Used for the typewriter streaming simulation
}

export interface SavedVaultItem {
  projectId: string;
  savedAt: string;
  personalNotes?: string;
}

/**
 * Slide 6 & 7 Feature: Users maintain records of their OWN unfinished projects!
 */
export interface UserLoggedProject {
  id: string;
  title: string;
  techStack: string[];
  completedWork: string;
  remainingWork: string;
  stoppingReason: string;
  createdAt: string;
  recommendedPath: RevivalPath;
  personalNotes?: string;
}

export interface VaultBackupPayload {
  version: string;
  exportedAt: string;
  vault: SavedVaultItem[];
  ownProjects?: UserLoggedProject[];
}
