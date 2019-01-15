export const environment = {
  ports: {
    app: 8080,
    ws: 8081
  },
  security: {
    roundEncryption: 10,
    tokenExpiration: '2 days'
  },
  redis: {
    host: '127.0.0.1',
    port: 6379
  }
}
