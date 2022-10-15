import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { DataSource } from "typeorm";
import { User } from "routes/users/entities/users.entity";
import { Project } from "routes/projects/entities/projects.entity";
import { faker } from "@faker-js/faker";
import moment from "moment";

export default class InitialSeeder implements Seeder {
  public async run(dataSource: DataSource, _factoryManager: SeederFactoryManager): Promise<any> {
    const userRepo = dataSource.getRepository(User);
    await userRepo.save([
      {
        id: 1,
        address: "0xA2798CB0F7bF67FDe94664aa2099285c24bcaa22",
        name: "admin user",
        email: "test@test.com",
        role: "admin",
      },
    ]);

    // ---------------------------------------------------

    const projectRepo = dataSource.getRepository(Project);
    await projectRepo.save([
      {
        title: "bookshelf",
        subtitle: "european styled bookshelf made with wood",
        summary: faker.lorem.words(50),
        description: faker.lorem.paragraphs(5),
        mainPictureUrl: "uploads/bookshelf.jpg",
        thumbnailUrl: "uploads/bookshelf.jpg",
        fundGoal: 100,
        rewards: [
          {
            title: "basic",
            price: 25,
            maxStock: 4,
            stock: 4,
            description: "basic bookshelf",
            deliveryStart: moment("2022-11-23").toDate(),
            deliveryEnd: moment("2022-11-23").toDate(),
            items: [
              {
                name: "basic bookshelf",
                quantity: 1,
              },
            ],
          },
        ],
        user: { id: 1 },
      },
      {
        title: "frying pan",
        subtitle: "teflon coated light weight frying pan",
        summary: faker.lorem.words(50),
        description: faker.lorem.paragraphs(5),
        mainPictureUrl: "uploads/pan.jpg",
        thumbnailUrl: "uploads/pan.jpg",
        fundGoal: 100,
        rewards: [
          {
            title: "basic",
            price: 2,
            maxStock: 50,
            stock: 50,
            description: "basic frying pan",
            deliveryStart: moment("2022-11-23").toDate(),
            deliveryEnd: moment("2022-11-23").toDate(),
            items: [
              {
                name: "basic frying pan",
                quantity: 1,
              },
            ],
          },
        ],
        user: { id: 1 },
      },
      {
        title: "chair",
        subtitle: "lounge chair with steel legs",
        summary: faker.lorem.words(50),
        description: faker.lorem.paragraphs(5),
        mainPictureUrl: "uploads/chair.jpg",
        thumbnailUrl: "uploads/chair.jpg",
        fundGoal: 1000,
        rewards: [
          {
            title: "white",
            price: 10,
            maxStock: 100,
            stock: 100,
            description: "white chair",
            deliveryStart: moment("2022-11-23").toDate(),
            deliveryEnd: moment("2022-11-23").toDate(),
            items: [
              {
                name: "white chair",
                quantity: 1,
              },
            ],
          },
          {
            title: "black",
            price: 15,
            maxStock: 20,
            stock: 20,
            description: "black chair",
            deliveryStart: moment("2022-11-23").toDate(),
            deliveryEnd: moment("2022-11-23").toDate(),
            items: [
              {
                name: "black chair",
                quantity: 1,
              },
            ],
          },
        ],
        user: { id: 1 },
      },
      {
        title: "island coat",
        subtitle: "brown island coat",
        summary: faker.lorem.words(50),
        description: faker.lorem.paragraphs(5),
        mainPictureUrl: "uploads/coat.jpg",
        thumbnailUrl: "uploads/coat.jpg",
        fundGoal: 100,
        rewards: [
          {
            title: "Medium size",
            price: 10,
            maxStock: 10,
            stock: 10,
            description: "medium sized coat",
            deliveryStart: moment("2022-11-23").toDate(),
            deliveryEnd: moment("2022-11-23").toDate(),
            items: [
              {
                name: "medium sized coat",
                quantity: 1,
              },
            ],
          },
          {
            title: "Large size",
            price: 10,
            maxStock: 10,
            stock: 10,
            description: "large sized coat",
            deliveryStart: moment("2022-11-23").toDate(),
            deliveryEnd: moment("2022-11-23").toDate(),
            items: [
              {
                name: "large sized coat",
                quantity: 1,
              },
            ],
          },
        ],
        user: { id: 1 },
      },
    ]);
  }
}
