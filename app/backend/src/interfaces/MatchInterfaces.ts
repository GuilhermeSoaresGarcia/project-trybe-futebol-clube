export interface INewMatch {
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

export interface IEditMatch {
  id: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
}
