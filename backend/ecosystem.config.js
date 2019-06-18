module.exports = {
  apps : [{
    name: "histovec-backend",
    script: "./dist/index.js",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}
