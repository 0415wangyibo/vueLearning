// 对象型参数转param型参数
export function bodyToParm(body, head, oldParam) {
    let param = '';
    let newHead = '';
    if (head) {
        newHead = head;
    }
    if (oldParam) {
        param = oldParam;
    }
    if (undefined !== body) {
        let flag = 0;
        if (param) {
            flag = 1;
        }
        for (let i in body) {
            if (undefined !== body[i]) {
                if ((typeof body[i]) === 'string') {
                    body[i] = body[i].trim();
                }
                if (flag === 0) {
                    if (body[i] instanceof Object) {
                        param = bodyToParm(body[i], `${newHead}${i}.`, param);
                    } else {
                        param = `?${newHead}${i}=${encodeURIComponent(body[i])}`;
                    }
                    if (param) {
                        flag = 1;
                    }
                } else {
                    if (body[i] instanceof Object) {
                        param = bodyToParm(body[i], `${newHead}${i}.`, param);
                    } else {
                        param = `${param}&${newHead}${i}=${encodeURIComponent(body[i])}`;
                    }
                }
            }
        }
    }
    return param;
}
