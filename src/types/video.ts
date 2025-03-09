
export interface VideoClip {
  id: string;
  uuid: string;
  thumbnail: string;
  text: string;
  link?: string; // Make link property optional
  durationSeconds: number;
}

export interface VideoProject {
  id: string;
  title: string;
  clips: VideoClip[];
  thumbnail: string;
  createdAt: string;
  totalDuration: number;
}
