export interface WorkKind {
  id: number;
  name: string;
  teamId: number | null;
}

export interface WorkKindAndTeamName {
  workKind: WorkKind;
  teamName: string;
}
