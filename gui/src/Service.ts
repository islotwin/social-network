import axios from 'axios';

axios.defaults.baseURL = '/';

export type TestResult = {
  id: number;
  from: string;
  to: string;
  duration: number;
  result: boolean | string[];
};

export class Service {
  private constructor() { }

  public static getInstance() {
    return new Service();
  };

  public async areNodesConnected(from: string, to: string): Promise<TestResult> {
    return axios.get(`/api/connected?from=${from}&to=${to}`).then(({ data }) => data);
  }
  public async getPath(from: string, to: string): Promise<TestResult> {
    return axios.get(`/api/path?from=${from}&to=${to}`).then(({ data }) => data);
  }
}