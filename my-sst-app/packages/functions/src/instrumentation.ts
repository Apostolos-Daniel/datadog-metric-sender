import { sendDistributionMetric } from 'datadog-lambda-js';
export const sendMetric = (key: string, value: number, ...tags: string[]) => {
  const defaultTags = [`env:local-toli`, `service:my-sst-app`, `version:1.0.0`, 'team:toli'];
  sendDistributionMetric(key, value, ...defaultTags, ...tags);
};
