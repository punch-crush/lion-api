# SNS 프로젝트 백엔드 API

<!-- 설명한줄 -->

SNS 프로젝트에서 사용되는 백엔드 API입니다.

로그인, 회원가입, 프로필, 게시물, 댓글, 상품, 팔로우 기능을 제공합니다.

<br/>

> 멋쟁이사자처럼에서 제공하는 백엔드 API가 종료됨에 따라, 해당 API를 사용하는 유저들이 자신만의 서버를 생성하고 조작 및 연결할 수 있도록 명세를 참고하여 만들었습니다.  
> [tripillow](https://github.com/FRONTENDSCHOOL5/final-15-Tripillow), &emsp;[spport](https://github.com/FRONTENDSCHOOL5/final-12-spport), &emsp;[show-in-seoul](https://github.com/d-charlie-kim/show-in-seoul) 세 개의 프로젝트에서 테스트 완료 하였습니다.

<br/>

## Usage

Fork 후, 프로젝트에 맞게 설정하여 사용하실 수 있습니다.

### 설치 및 실행방법

1. 설치

   ```bash
   npm install
   # or
   yarn install
   ```

<br/>

2. 실행방법

   [env 파일](#env-파일)을 먼저 설정 후 실행

- dev

  ```bash
  npm start:dev | npm start:dev:hmr
  # or
  yarn start:dev | yarn start:dev:hmr
  ```

- prod

  ```bash
  npm start:prod
  # or
  yarn start:prod
  ```

<br/>

### ENV 파일

1. root에 .env파일 생성

2. [MongoDB 생성](#mongodb-데이터베이스-배포-및-연결) 후 DB_URL, DB_USER, DB_PASSWORD 추가

3. 서버 배포 후 API_HOST 추가

4. JWT_SECRET 키 생성 후 추가(JWT의 서명을 생성하고 검증하는 데 사용되는 **비밀** 값. 충분한 길이와 복잡성 권장.)

**env 파일 예시**

```bash
DEV_HOST=http://localhost:8080/
API_HOST=서버 배포 URL

# DB Server Info
DB_URL=데이터베이스 URL (예시: mongodb+srv://<username>:<password>@lion-api.abcd123.mongodb.net/<database_name>)
DB_USER=데이터베이스 username
DB_PASSWORD=데이터베이스 password
JWT_SECRET=JWT SECRET KEY (예시: 랜덤한 문자열, `openssl rand -hex 64` 입력 후 생성된 문자열 등)
```

<br/>

### MongoDB 데이터베이스 배포 및 연결

1. [MongoDB 아틀라스](https://www.mongodb.com/cloud/atlas/register)를 사용해 클러스트 생성.
   - 해당 링크 참조. https://www.mongodb.com/ko-kr/docs/guides/atlas/account/
2. Database > Clusters > Connect 에서 url을 복사 후 env 파일에 입력
   - 유저 정보 (입력 후) database name도 같이 입력
   - ex) `mongodb+srv://<username>:<password>@lion-api.abcd123.mongodb.net/<database_name>`
3. MongoDB Compass(GUI)를 사용해 통신시에 database에 잘 들어갔는지 확인(MongoDB 사이트내에서도 확인 가능)

<br/>

📌 &nbsp;**필수!! MongoDB Network Access 설정변경** <br/>
MongoDB Network Access 설정 변경을 꼭 해야합니다. 변경하지 않을 경우 서버배포시 MongoDB에 access 실패로 에러가 나오게 됩니다.

1. MongoDB 사이트(아틀라스)접속 후 SECURITY 카테고리 접속
2. Network Access 접속
3. ADD IP ADDRESS 버튼 클릭 (초록색 버튼)
4. `includes your current IP address` 체크하거나 직접 Access List Entry에 `0.0.0.0/0`입력
   - 모든 네트워크의 접근을 허용

<br/>

### 서버 배포 방법

원하는 서버 호스팅을 선택하여 해당 서버를 배포합니다. <br/>
추천하는 서버 호스팅 앱은 `koyeb`입니다. 제한까지 무료로 이용하실 수 있습니다. <br/>
배포 후 env 파일의 API_HOST에 추가해주세요.

<br/>

## Dependency
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=flat&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC?style=flat&logo=typescript&logoColor=white)&nbsp;
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=flat&logo=nestjs&logoColor=white)&nbsp;
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)&nbsp;
![Passport](https://img.shields.io/badge/passport-808080?style=flat&logo=Passport&logoColor=white&link=/doc/skill-book/passport.md)&nbsp;
![JWT](https://img.shields.io/badge/JWT-black?style=flat&logo=JSON%20web%20tokens)&nbsp;
![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=flat&logo=yarn&logoColor=white)&nbsp;
![Prettier](https://img.shields.io/badge/prettier-2D333B?style=flat&logo=prettier&logoColor=#F7B93E)&nbsp;
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=flat&logo=eslint&logoColor=white)

<br/>

## Security Audit

> 마지막 업데이트: 2026-03-20

### 패치 완료된 취약점

`yarn audit` 기준 113개 → 21개로 감소 (Critical 2 → 0)

| 패키지 | 이전 버전 | 패치 버전 | 심각도 | 취약점 |
|--------|----------|----------|--------|--------|
| mongoose | 8.4.1 | 8.9.5+ | Critical | Search injection |
| form-data | 4.0.0 | 4.0.4 | Critical | Unsafe random boundary |
| minimatch | 3.1.2 | 3.1.5 | High | ReDoS (CVE-2026-27904) |
| minimatch | 8.0.4 | 8.0.6 | High | ReDoS (CVE-2026-27904) |
| minimatch | 9.0.3 | 9.0.9 | High | ReDoS (CVE-2026-27904) |
| cross-spawn | 7.0.3 | 7.0.5 | High | ReDoS |
| body-parser | 1.20.2 | 1.20.3 | High | DoS (URL encoding) |
| path-to-regexp | 0.1.7 | 0.1.12 | High | ReDoS |
| path-to-regexp | 3.2.0 | 3.3.0 | High | ReDoS |
| jws | 3.2.2 | 3.2.3 | High | HMAC signature bypass |
| flatted | 3.3.1 | 3.4.2 | High | Prototype Pollution / DoS |
| validator | 13.12.0 | 13.15.22 | High | Incomplete filtering |
| @nestjs/common | 10.3.9 | 10.4.16+ | Moderate | Code execution via Content-Type |
| express | 4.19.2 | 4.21.2 | Low-Moderate | XSS, cookie, serve-static 등 |
| webpack | 5.92.0 | 5.94.0+ | Moderate | DOM Clobbering XSS |
| micromatch | 4.0.7 | 4.0.8 | Moderate | ReDoS |
| lodash | 4.17.21 | 4.17.23 | Moderate | Prototype Pollution |
| qs | 6.11.0 | 6.14.2 | Moderate | DoS (memory exhaustion) |
| js-yaml | 4.1.0 / 3.14.1 | 4.1.1 / 3.14.2 | Moderate | Prototype Pollution |
| ajv | 6.12.6 | 6.14.0 | Moderate | ReDoS |
| @babel/helpers | 7.24.7 | 7.26.10 | Moderate | ReDoS |
| brace-expansion | 1.1.11 | 1.1.12 | Low | ReDoS |
| diff | 4.0.2 | 4.0.4 | Low | DoS |
| cookie | 0.6.0 | 0.7.2 | Low | Out-of-bounds characters |
| send | 0.18.0 | 0.19.0 | Low | Template injection XSS |
| serve-static | 1.15.0 | 1.16.2 | Low | Template injection XSS |
| formidable | 2.1.2 | 2.1.3 | Low | Filename guessing |

### 메이저 업그레이드 필요 (미해결)

아래 취약점은 의존 패키지의 **메이저 버전 업그레이드**가 필요하여 현재 수정하지 못했습니다. 호환성 검증 후 업그레이드를 권장합니다.

| 패키지 | 현재 버전 | 패치 버전 | 심각도 | 취약점 | 원인 |
|--------|----------|----------|--------|--------|------|
| tar | 6.2.1 | >=7.5.11 | High x6 | Path Traversal, Symlink Poisoning 등 | `bcrypt` > `@mapbox/node-pre-gyp` > `tar` — bcrypt을 `bcryptjs`로 교체하거나 bcrypt 최신 버전 확인 필요 |
| multer | 1.4.x | >=2.1.1 | High x3 | DoS (incomplete cleanup, resource exhaustion, recursion) | `@nestjs/platform-express` > `multer` — NestJS 11+ 또는 `@nestjs/platform-fastify` 전환 검토 |
| serialize-javascript | 6.0.2 | >=7.0.3 | High | RCE via RegExp.flags | `@nestjs/cli` > `webpack` > `terser-webpack-plugin` — `@nestjs/cli` 11+ 업그레이드 필요 |
| glob | 9.3.5 | >=10.5.0 | High | Command injection via --cmd | `@nestjs/cli` > `glob` — `@nestjs/cli` 11+ 업그레이드 필요 |
| file-type | <21.3.2 | >=21.3.2 | Moderate x2 | ASF parser infinite loop, ZIP decompression bomb | `@nestjs/common` 내부 의존 — NestJS 11+ 업그레이드 필요 |
| ajv | 8.12.0 | >=8.18.0 | Moderate x3 | ReDoS ($data option) | `@nestjs/cli` > `@angular-devkit/core` > `ajv` — `@nestjs/cli` 11+ 업그레이드 필요 |
| webpack (in @nestjs/cli) | 5.90.1 | >=5.94.0 / >=5.104.1 | Moderate/Low | DOM Clobbering XSS, SSRF | `@nestjs/cli` 내부 webpack — `@nestjs/cli` 11+ 업그레이드 필요 |
| tmp | 0.0.33 | >=0.2.4 | Low x2 | Symlink dir parameter | `@nestjs/cli` > `inquirer` > `external-editor` > `tmp` — `@nestjs/cli` 11+ 업그레이드 필요 |

> **권장 사항:** 대부분의 미해결 취약점은 `@nestjs/cli`, `@nestjs/platform-express`, `bcrypt`의 메이저 업그레이드로 해결됩니다. NestJS 11로의 마이그레이션을 계획하면 대부분 한번에 해결할 수 있습니다.

<br/>

## Reference

[멋쟁이사자처럼 BE API](https://www.notion.so/doha-lee/BackEnd-API-79c79aaa4d9442ff925a80a279465757?pvs=4) <br/>
<span style="color:#909090">일부 서버 Response와 다르게 적힌 명세는 수정했습니다.</span>

<br/>

## Role
|**김도경**|**우혜리**|**이도하**|**임다솜** |
| :------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| <img width="180" alt="d-charlie-kim_profile_img" src="https://avatars.githubusercontent.com/u/74645799?v=4"> | <img width="180"  alt="seoyoung-kim_profile_img" src="https://avatars.githubusercontent.com/u/107099724?v=4"> | <img width="180" alt="haron-lee_profile_img" src="https://avatars.githubusercontent.com/u/88657261?v=4"> | <img width="180" alt="bringvotrevin_profile_img" src="https://avatars.githubusercontent.com/u/81025416?v=4" > |
| [d-charlie-kim](https://github.com/d-charlie-kim) | [hyeri-woo](https://github.com/hyeri-woo) | [haron-lee](https://github.com/haron-lee) | [bringvotrevin](https://github.com/bringvotrevin) |
|- 프로필 모듈 <br/> - validationPipe|- 회원가입 모듈 <br/> - 게시글 모듈|- 이미지 모듈 <br/> - router 모듈 <br/> - 상품 모듈|- 로그인 모듈 <br/> - 댓글 모듈 <br/> 좋아요 및 검색 기능|

## Contributors

Thanks to all the people who contribute:

<a href="https://github.com/punch-crush/lion-api/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=punch-crush/lion-api" />
</a>
