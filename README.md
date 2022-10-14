<p align="center">
  <img src="https://user-images.githubusercontent.com/45936642/191912429-5956a4c3-6ecc-46ec-b1ed-6e68c4c93fa4.png" alt="logo"/>
</p>

<h3 align="center">Klaytn을 사용한 크라우드 펀딩 서비스</h3>

---

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white)
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)
![Babel](https://img.shields.io/badge/Babel-F9DC3e?style=for-the-badge&logo=babel&logoColor=black)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white)
![Ethereum](https://img.shields.io/badge/Ethereum-3C3C3D?style=for-the-badge&logo=Ethereum&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Storybook](https://img.shields.io/badge/-Storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)

---

## Introduction

LetsKlay는 Klaytn 네트워크를 활용하여, 스마트 컨트랙트를 통해 펀딩할 수 있는 크라우드 펀딩 서비스입니다.

## Prerequisites

- Node 16
- Yarn berry
- MySQL

실행 환경에 Node 16버전 이상, Yarn berry, 그리고 MySQL 서버가 설치되어 있어야 합니다.

## 실행 방법

### 0. 실행 준비

#### (1) 라이브러리 설치

- 우선 아래 명령어로 서버 실행에 필요한 라이브러리를 설치합니다.

```bash
$ yarn
```

<br>

#### (2) MySQL 서버 연결 설정

1. `/server/config/example-server.config.ts`를 복사하여, `server.config.ts`로 이름을 변경하고 형식에 맞춰 DB 정보를 입력합니다.  
   <br>

#### (3) 스마트 컨트랙트 배포

1. `truffle` 설치

```bash
$ npm install -g truffle
```

2. 컨트랙트 배포를 위해 Klaytn 계정의 비밀 키를 .env 파일에 등록

```bash
# /common/.env
PRIVATE_KEY=0x...
```

3. 배포 명령어 실행

```bash
$ yarn migrate
```

4. 배포된 컨트랙트 주소를 설정파일에 입력

- NestJS 서버

```bash
# /server/.env
FACTORY_ADDR=0x3E135716D7F4896036eC78f57DB8E3eC4002dd13
```

- Next.js 서버

```javascript
// /src/next.config.js
const nextConfig = withTM({
  ...,
  env: { FACTORY_ADDR: "0x3E135716D7F4896036eC78f57DB8E3eC4002dd13" },
});

module.exports = nextConfig;
```

<br>

### 1. 서버 실행

- 최상위 디렉토리에서 아래 명령어 실행

```bash
$ yarn dev #개발 서버

$ yarn build # 프로덕션 서버
$ yarn start
```

<br>
<br>
Team Noguzi. All rights reserved
