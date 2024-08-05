import { SprintDTO } from '@/types/SprintType';

export interface TeamConfigType {
  teamName: string;
  workKinds: WorkKind[];
  happinessSurvey: boolean;
  workKindSurvey: boolean;
  emotionSurvey: boolean;
}

interface WorkKind {
  id: number;
  name: string;
}

export interface TeamWithSprintsDTO {
  id: number;
  name: string;
  sprints: SprintDTO[];
}
