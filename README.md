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
# HOST는 프로젝트에서 사용되지 않아서 필수 값은 아님
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

### 서버 배포 방법

원햐는 서버 호스팅을 선택하여 해당 서버를 배포합니다. <br/>
추천하는 서버 호스팅 앱은 `koyeb`입니다. 제한까지 무료로 이용하실 수 있습니다. <br/>
배포 후 env 파일의 API_HOST에 추가해주세요.(필수아님)

<br/>

## Dependency

![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC?style=flat&logo=typescript&logoColor=white)&nbsp;
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=flat&logo=nestjs&logoColor=white)&nbsp;
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)&nbsp;
![Passport](https://img.shields.io/badge/passport-808080?style=flat&logo=Passport&logoColor=white&link=/doc/skill-book/passport.md)&nbsp;
![JWT](https://img.shields.io/badge/JWT-black?style=flat&logo=JSON%20web%20tokens)&nbsp;
![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=flat&logo=yarn&logoColor=white)&nbsp;
![Prettier](https://img.shields.io/badge/prettier-2D333B?style=flat&logo=prettier&logoColor=#F7B93E)&nbsp;
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=flat&logo=eslint&logoColor=white)

<br/>

## Reference

[멋쟁이사자처럼 BE API](https://www.notion.so/doha-lee/BackEnd-API-79c79aaa4d9442ff925a80a279465757?pvs=4) <br/>
<span style="color:#909090">일부 서버 Response와 다르게 적힌 명세는 수정했습니다.</span>

<br/>

## Contributors

Thanks to all the people who contribute:

<a href="https://github.com/punch-crush/lion-api/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=punch-crush/lion-api" />
</a>
