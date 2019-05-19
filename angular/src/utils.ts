import { environment } from './environments/environment';

export const mockService = (service, mockedService) => {
  return environment.useMock ? mockedService : service;
};
