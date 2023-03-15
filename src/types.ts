export interface UserCredentials {
  email: string;
  password: string;
}

export interface UserStructure {
  name: string;
  email: string;
  password: string;
  image: string;
}

export interface MatchStructure {
  category: string;
  date: Record<string, unknown>;
  level: string;
  paddleCourt: number;
  signedPlayersNumber: number;
  image: string;
  allowedPlayersNumber: number;
}
