# pica_server
Typescript>nodejs 를 이용한 게임서버 / Intellij >> 만드는중

## 게임 내용


### 구조
4개 모듈 구현
- 인게임 > protobuf 사용. 유저 2명을 방에 두고 소켓 통신, 서버간 통신 > Redis-publish
- 매칭 > Redis 연동 Pool 구조 (+대기열 구현과 비슷)
- AI > 미정
- 웹 > express, protobuf 사용.> push msg를 rabbitmq(message queue) 이용


### 실행방법
 - Debian > systemctl 등록 > systemctl start game_server
 - service 파일 > project_root/bin
 
### 모듈 확장
 - 각 모듈 띄울때 첫번째 인자 2자리 수 받음 
 - 0X : 물리적1대 서버에 10개 모듈을 띄움 
 - X0 : 물리적으로 다르게 10개 서버들에 분할할 수 있도록 구조
 
