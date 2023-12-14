module.exports = {
  ...require("./typeorm.config").typeOrmConfig,
  entities: ["dist/**/*.entity.js"],
  migrations: ["dist/migration/*.js"],
  cli: {
    migrationsDir: "src/migration",
  },
};
