import { AxiosResponse } from 'axios';
import axiosClient from '@/api/axiosInstance';
import { WorkItems } from '../../models/workItem';

const client = axiosClient();

export interface IWorkItemClient {
  getWorkItems: () => Promise<AxiosResponse<WorkItems>>;
}

const WorkItemClient: IWorkItemClient = {
  getWorkItems(): Promise<AxiosResponse<WorkItems>> {
    return client.get('/api/jira/tasks');
  },
};
export default WorkItemClient;
