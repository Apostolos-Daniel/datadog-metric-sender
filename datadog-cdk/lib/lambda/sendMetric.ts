// lambda/sendMetric.ts
import { sendDistributionMetric } from 'datadog-lambda-js';
import tracer from "dd-trace";
export const handler = async (event: any) => {
  const metricName = "custom.test.metric.sendDistributionMetric";
  const metricValue = 100;  // Example metric value
  const tags = ["env:production", "service:my-cdk-app"];

  console.log(`Sending metric ${metricName} with value ${metricValue}`);

  try {
    // Send the custom metric to Datadog
    sendDistributionMetric(metricName, metricValue, ...tags);
    tracer.dogstatsd.increment(metricName, metricValue);
    
    console.log("Metric sent successfully");
  } catch (error) {
    console.error("Failed to send metric", error);
  }
//   const metricNameWithDate = "custom.test.metric.sendDistributionMetricWithDate";
//   try {
//     // Send the custom metric to Datadog
//     sendDistributionMetricWithDate(metricNameWithDate, metricValue, new Date(), ...tags);
//     console.log(`Metric with date sent successfully: ${metricNameWithDate}`);
//   } catch (error) {
//     console.error("Failed with date to send metric", error);
//   }

  return {
    statusCode: 200,
    body: JSON.stringify({ 'my-cdk-app': `Metrics sent successfully: ${metricName}` }),
  };
};
