

DEFAULT_RANK_MATCH_READY_TIME = 5;
DEFAULT_RANK_MATCH_CHANGERANGE = 0;
DEFAULT_RANK_MATCH_STARTRANGE = 0;
DEFAULT_RANK_MATCH_MAXCOUNT = 0;
DEFAULT_RANK_AI_MATCH_COUNT = 0;
LOAD_TYPE_NORMAL = 'normal';
LOAD_TYPE_FRIEND = 'friend';
FILE_PATH_CONF = __dirname + '/../../conf/conf.yaml';

logger = {};
redisClient = {};

sleep = function (ms:number) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms);
    });
};
