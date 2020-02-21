const shell = require("shelljs");

module.exports = async () => {
  if (process.env.CI === "false") {
    shell.exec("docker-compose -f docker-compose.test.yml down");
    shell.exec("rm -r postgres-data-test");
    shell.exec("docker system prune -f");
  }
};
