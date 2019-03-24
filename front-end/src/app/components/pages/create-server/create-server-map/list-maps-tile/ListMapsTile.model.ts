import { MapPreview } from '../CreateServerMap.model';

export interface IProps {
  selected: boolean;
  map: MapPreview;
  onSelect: (id: number) => void;
}

export interface IState {
  selected: boolean;
  map: MapPreview;
}
