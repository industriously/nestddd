import { FunctionType } from './function.interface';

export type MethodMarker<M> = (metadata: M) => (target: FunctionType) => void;
