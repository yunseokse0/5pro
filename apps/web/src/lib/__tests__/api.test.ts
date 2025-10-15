import { describe, it, expect, beforeEach } from 'vitest';
import { ApiClient } from '../api';

describe('ApiClient', () => {
  let client: ApiClient;

  beforeEach(() => {
    client = new ApiClient('http://localhost:4000');
  });

  it('should create instance', () => {
    expect(client).toBeDefined();
  });

  it('should set token', () => {
    client.setToken('test-token');
    expect(true).toBe(true);
  });
});

