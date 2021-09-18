import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import { ProjectsSeed } from "./projects.seed";
import { UserSeed } from "./user.seed";



export class SeedPermissionsAndRoles1631988701394
  implements MigrationInterface {
  public async up(_: QueryRunner): Promise<any> {

    const users = await getRepository("users").save(
        UserSeed
    );

    const projectsSeed: any = ProjectsSeed;

    projectsSeed.forEach((project: any) => {
      project.user_id = users.id;
    });
    // projectsSeed[0].user_id = users.id;
    // projectsSeed[1].user_id = users.id;
    // projectsSeed[2].user_id = users.id;
    // projectsSeed[3].user_id = users.id;
    // projectsSeed[4].user_id = users.id;

    await getRepository("projects").save(ProjectsSeed);
  }

  public async down(_: QueryRunner): Promise<any> {
    // do nothing
  }
}