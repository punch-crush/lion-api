# Changelog

lion-api의 모든 변경사항을 이 파일에 기록합니다.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [1.1.1rc0] - 2024-08-15

### Fixed

- image 삭제 기능 수정
  - `process.env.API_HOST` 시작하는 이미지 파일만 삭제
  - 이전 로컬 기본 이미지까지 삭제하려고 했던 문제 수정
