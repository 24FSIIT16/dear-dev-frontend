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
