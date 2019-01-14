export const environment = {
  port: 8080,
  security: {
    roundEncryption: 10,
    tokenExpiration: '2 days'
  },
  redis: {
    host: '127.0.0.1',
    port: 6379
  }
}

export const maxCreatedMaps = 20;
