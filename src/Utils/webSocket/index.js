import WS from './WS.js';
import config from '../config';

let ws = null;

// 1.界面一进来就链接Socket
// 2.需要REGISTER
// 3.需要STOP_SENDING

const socketLink = function () {
    if (config.ws) {
        ws = new WS(config.ws);
    }
    ws.onopen = function () {
        console.log('socket open.');
    };
    // 关闭
    ws.onclose = function () {
        console.log('socket closed.');
    };
}

const socketSend = function (info, cb) {
    // //WebSocket任务表
    const ws_fun = {
        // 发布信息
        send: function (message) {
            if (!ws) {
                return;
            }
            if (ws.readyState == WebSocket.OPEN) {
                ws.send(JSON.stringify(message));
            } else {
                console.error("The socket is not open.");
            }
        },
        // 注册机器 返回功能
        Register: function () {
            let newInfo = info.robotList.concat(info.sceneId)
            this.send({
                "messageType": 'REGISTER',
                "module": info.module || '',
                "userId": newInfo.join(','),
            });
        },
        // 注销机器
        StopSending: function () {
            let newInfo = info.robotList.concat(info.sceneId)
            this.send({
                "messageType": "STOP_SENDING",
                "module": info.module || '',
                "userId": newInfo.join(','),
            });
        },
    }

    //WebSocket启动任务
    // 链接
    if (ws.readyState) {
        // 订阅
        ws.onmessage = function (res) {
            cb(JSON.parse(res.data))
        };
    
        if(info.messageType === 'REGISTER'){
            ws_fun.Register();
        }else{
            ws_fun.StopSending();
        }
    }
}


export default { socketLink, socketSend };