export const environment = {
  ports: {
    app: 8080,
    ws: 8081
  },
  security: {
    jwtSecretKey: 'OQTrltPlbj',
    roundEncryption: 10,
    tokenExpiration: '2 days'
  },
  redis: {
    host: '127.0.0.1',
    port: 6379
  }
};

/** Password regex. */
export const PASSWORD_REGEX: RegExp = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
