
export enum ProjectStatus {
  NOT_STARTED = 'Not started',
  IN_PROGRESS = 'In progress',
  DONE = 'Done'
}

export interface Project {
  id: string;
  name: string;
  owner: string;
  status: ProjectStatus;
  createdAt: number;
}
