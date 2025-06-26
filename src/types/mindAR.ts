// types/mindAR.ts
import * as THREE from 'three';

export interface MindAROptions {
  imageTargetSrc?: string;
  maxTrack?: number;
  warmupTolerance?: number;
  missTolerance?: number;
  uiLoading?: string;
  uiScanning?: string;
  uiError?: string;
  filterMinCF?: number;
  filterBeta?: number;
}

export interface MindARThreeSystem {
  container: HTMLElement;
  start(): Promise<void>;
  stop(): void;
  addAnchor(targetIndex: number): MindARAnchor;
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.Camera;
}

export interface MindARAnchor {
  group: THREE.Group;
  targetIndex: number;
  onTargetFound?: () => void;
  onTargetLost?: () => void;
}

export interface UseMindARReturn {
  containerRef: React.RefObject<HTMLDivElement>;
  isReady: boolean;
  isLoading: boolean;
  error: Error | null;
  mindarSystem: MindARThreeSystem | null;
  addObject: (anchorIndex: number, object: THREE.Object3D) => MindARAnchor | null;
  removeObject: (anchor: MindARAnchor) => void;
  startAR: () => Promise<void>;
  stopAR: () => void;
}

declare global {
  interface Window {
    MindARThree?: any;
  }
}