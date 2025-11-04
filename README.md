<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).




{

  "name": "nestjs-intro",

  "version": "0.0.1",

  "description": "",

  "author": "",

  "private": true,

  "license": "UNLICENSED",

  "scripts": {

    "build": "nest build",

    "format": "prettier --write\"src/**/*.ts\"\"test/**/*.ts\"",

    "start": "nest start",

    "start:dev": "nest start --watch",

    "start:debug": "nest start --debug --watch",

    "start:prod": "node dist/main",

    "lint": "eslint\"{src,apps,libs,test}/**/*.ts\" --fix",

    "test": "jest",

    "test:watch": "jest --watch",

    "test:cov": "jest --coverage",

    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",

    "test:e2e": "jest --config ./test/jest-e2e.json",

    "doc": "npx @compodoc/compodoc -p tsconfig.json -s --port 3001 --watch -d ./documentation"

  },

  "dependencies": {

    "@compodoc/compodoc": "^1.1.26",

    "@nestjs/common": "^11.1.8",

    "@nestjs/core": "^11.1.8",

    "@nestjs/mapped-types": "^2.1.0",

    "@nestjs/platform-express": "^11.1.8",

    "@nestjs/swagger": "^11.0.7",

    "@nestjs/typeorm": "^11.0.0",

    "class-transformer": "^0.5.1",

    "class-validator": "^0.14.1",

    "pg": "^8.14.1",

    "reflect-metadata": "^0.2.2",

    "rxjs": "^7.8.2",

    "typeorm": "^0.3.21"

  },

  "devDependencies": {

    "@eslint/eslintrc": "^3.2.0",

    "@eslint/js": "^9.18.0",

    "@nestjs/cli": "^11.0.0",

    "@nestjs/schematics": "^11.0.0",

    "@nestjs/testing": "^11.0.1",

    "@swc/cli": "^0.6.0",

    "@swc/core": "^1.10.7",

    "@types/express": "^5.0.0",

    "@types/jest": "^29.5.14",

    "@types/node": "^22.19.0",

    "@types/supertest": "^6.0.2",

    "eslint": "^9.18.0",

    "eslint-config-prettier": "^10.0.1",

    "eslint-plugin-prettier": "^5.2.2",

    "globals": "^16.0.0",

    "jest": "^29.7.0",

    "prettier": "^3.4.2",

    "source-map-support": "^0.5.21",

    "supertest": "^7.0.0",

    "ts-jest": "^29.2.5",

    "ts-loader": "^9.5.2",

    "ts-node": "^10.9.2",

    "tsconfig-paths": "^4.2.0",

    "typescript": "5.6",

    "typescript-eslint": "^8.20.0"

  },

  "jest": {

    "moduleFileExtensions": [

    "js",

    "json",

    "ts"

    ],

    "rootDir": "src",

    "testRegex": ".*\\.spec\\.ts$",

    "transform": {

    "^.+\\.(t|j)s$": "ts-jest"

    },

    "collectCoverageFrom": [

    "**/*.(t|j)s"

    ],

    "coverageDirectory": "../coverage",

    "testEnvironment": "node"

  }

}

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest
