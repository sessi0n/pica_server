# pica_server
Typescript>nodejs 를 이용한 게임서버 / Intellij >> 만드는중

## 게임 내용


### 구조
4개 모듈 구현
- 인게임 > protobuf 사용. 유저 2명과 소켓 통신, +Redis 
- 매칭 > Redis 연동 Pool 구조 (+대기열 구현과 비슷)
- AI > 미정
- 웹 > 미정


### 실행방법
 - Debian > systemctl 등록 > systemctl start game_server
