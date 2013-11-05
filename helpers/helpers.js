
exports.each = function (datas, callback) {
    var i = 0;
    while(i < datas.length) {
        callback(datas[i], i);
        i += 1;
    }
}

exports.commitWaterfall = function (funcs, callback) {
    var recallFunc, i = 0, retByCallback = [];

    if (funcs.length > 0) {
        recallFunc = function () {
            var newFunc;
            if (i === funcs.length) {
                callback(retByCallback);
                return;
            }
            newFunc = funcs[i];
            newFunc(function (data) {
                retByCallback.push(data);
                recallFunc();
            });

            i += 1;
        };

        recallFunc();
    }
};

