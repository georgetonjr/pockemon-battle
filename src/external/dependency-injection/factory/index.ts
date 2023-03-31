import { container } from 'tsyringe';


export enum ContainerVersion {
  DEFAULT,
}

const containerMap = {
  0: container,
};
  
export const injectionFactory = <TInstance>(injectionToken: string, version: number): TInstance =>
  containerMap[version].resolve(injectionToken);
