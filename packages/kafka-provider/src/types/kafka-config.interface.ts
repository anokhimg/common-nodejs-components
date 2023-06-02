import { BrokersFunction } from 'kafkajs';

export interface KafkaConfig {
  clientName: string;
  brokers: string[] | BrokersFunction;
  connectionTimeout?: number;
  sessionTimeout?: number;
  ssl?: boolean;
}
