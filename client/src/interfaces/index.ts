export interface Option {
  value: string;
  votes: number;
}

export interface State {
  id: string;
  max: number;
  options: Option[];
}

export interface Context {
  setId: (payload: string) => void;
  setMax: (payload: number) => void;
  setOptions: (payload: Option[]) => void;
  state: State;
}
