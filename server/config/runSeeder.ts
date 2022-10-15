import { Fund } from "routes/funds/entities/funds.entity";
import { Like } from "routes/likes/entities/like.entity";
import { Project } from "routes/projects/entities/projects.entity";
import { RewardItem } from "routes/rewards/entities/reward-item.entity";
import { Reward } from "routes/rewards/entities/reward.entity";
import { User } from "routes/users/entities/users.entity";
import { DataSource } from "typeorm";
import { runSeeders } from "typeorm-extension";
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";
import config from "./server.config";

(async () => {
  const options: MysqlConnectionOptions = {
    ...config["development"],
    name: "seeder",
    type: "mysql",
    entities: [User, Project, Like, Reward, RewardItem, Fund],
  };

  const dataSource = new DataSource(options);
  await dataSource.initialize();

  await runSeeders(dataSource, {
    seeds: ["config/default.seed.ts"],
    factories: [],
  });
  console.log("here");
})();
