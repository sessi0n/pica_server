# pica_server
Typescript 를 이용한 게임서버 / Intellij >> 만드는중

## 게임 내용
30x30 네모 안에서 유저 2명이 AI와 격돌

### 구조
4개 모듈 구현
- 웹 > 로그인
- 인게임 > 유저 2명과 소켓 통신, +Redis 
- 매칭 > Redis 연동 Pool 구조 (+대기열 구현과 비슷)
- AI > 미정

### 실행방법
 - Debian > systemctl 등록 > systemctl start game_server
