# Changelog

lion-api의 모든 변경사항을 이 파일에 기록합니다.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [1.0.2] - 2026-03-20

### Security - 보안 취약점 패치

`yarn audit` 기준 **113개 → 21개**로 감소 (Critical 2 → 0)

#### 직접 의존성 업그레이드

| 패키지 | 이전 | 이후 | 변경 사유 |
|--------|------|------|----------|
| @nestjs/common | ^10.0.0 | ^10.4.16 | Code execution via Content-Type |
| @nestjs/core | ^10.0.0 | ^10.4.16 | path-to-regexp ReDoS |
| @nestjs/platform-express | ^10.0.0 | ^10.4.16 | express, body-parser, path-to-regexp 등 |
| mongoose | ^8.4.1 | ^8.9.5 | Search injection (Critical) |
| webpack | ^5.91.0 | ^5.94.0 | DOM Clobbering XSS |
| @typescript-eslint/parser | ^6.0.0 | ^7.18.0 | minimatch 9.0.3 ReDoS |
| @typescript-eslint/eslint-plugin | ^6.0.0 | ^7.18.0 | minimatch 9.0.3 ReDoS |

#### Yarn Resolutions를 통한 전이 의존성 패치

| 패키지 | 이전 | 이후 | 심각도 | 취약점 |
|--------|------|------|--------|--------|
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
| express | 4.19.2 | 4.21.2 | Moderate | XSS, cookie, serve-static 등 |
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

#### 미해결 — 메이저 업그레이드 필요

아래 취약점은 의존 패키지의 **메이저 버전 업그레이드**가 필요하여 현재 수정하지 못했습니다.
호환성 검증 후 업그레이드를 권장합니다.

| 패키지 | 현재 | 패치 버전 | 심각도 | 취약점 | 원인 |
|--------|------|----------|--------|--------|------|
| tar | 6.2.1 | >=7.5.11 | High x6 | Path Traversal, Symlink Poisoning 등 | `bcrypt` > `@mapbox/node-pre-gyp` > `tar` — bcrypt을 `bcryptjs`로 교체하거나 bcrypt 최신 버전 확인 필요 |
| multer | 1.4.x | >=2.1.1 | High x3 | DoS (incomplete cleanup, resource exhaustion, recursion) | `@nestjs/platform-express` > `multer` — NestJS 11+ 또는 `@nestjs/platform-fastify` 전환 검토 |
| serialize-javascript | 6.0.2 | >=7.0.3 | High | RCE via RegExp.flags | `@nestjs/cli` > `webpack` > `terser-webpack-plugin` — `@nestjs/cli` 11+ 업그레이드 필요 |
| glob | 9.3.5 | >=10.5.0 | High | Command injection via --cmd | `@nestjs/cli` > `glob` — `@nestjs/cli` 11+ 업그레이드 필요 |
| file-type | <21.3.2 | >=21.3.2 | Moderate x2 | ASF parser infinite loop, ZIP decompression bomb | `@nestjs/common` 내부 의존 — NestJS 11+ 업그레이드 필요 |
| ajv | 8.12.0 | >=8.18.0 | Moderate x3 | ReDoS ($data option) | `@nestjs/cli` > `@angular-devkit/core` > `ajv` — `@nestjs/cli` 11+ 업그레이드 필요 |
| webpack (in @nestjs/cli) | 5.90.1 | >=5.94.0 / >=5.104.1 | Moderate/Low | DOM Clobbering XSS, SSRF | `@nestjs/cli` 내부 webpack — `@nestjs/cli` 11+ 업그레이드 필요 |
| tmp | 0.0.33 | >=0.2.4 | Low x2 | Symlink dir parameter | `@nestjs/cli` > `inquirer` > `external-editor` > `tmp` — `@nestjs/cli` 11+ 업그레이드 필요 |

> **권장 사항:** 대부분의 미해결 취약점은 `@nestjs/cli`, `@nestjs/platform-express`, `bcrypt`의 메이저 업그레이드로 해결됩니다. NestJS 11로의 마이그레이션을 계획하면 대부분 한번에 해결할 수 있습니다.

## [1.1.1rc0] - 2024-08-15

### Fixed

- image 삭제 기능 수정
  - `process.env.API_HOST` 시작하는 이미지 파일만 삭제
  - 이전 로컬 기본 이미지까지 삭제하려고 했던 문제 수정
