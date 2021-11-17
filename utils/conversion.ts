import {METERS_TO_MPH_RATIO} from '../constants/Numerics';

export const metersToMPH = (num: number) => num * METERS_TO_MPH_RATIO;
export const formatSpeed = (num: number): string => {
  const res = Math.round(metersToMPH(num) * 10) / 10;
  return res > 0 ? res.toFixed(1) : (0).toString();
};
