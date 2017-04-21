var fs = require("fs");

function size(file) {
    return function(fn) {
        fs.stat(file, function(err, stat) {
            if (err) return fn(err); 
            fn(null, stat.size);
        }); 
    }
}


function co (fn) {
    return function(done) {
        var ctx = this; 
        var gen = isGenerator(fn) ? fn : fn.call(ctx);
        var it = null;

        function _next(err, res) {
            if (err) res = err;
            it = gen.next(res);

            if (!it.done) {
                if (isGeneratorFunction(it.value)) {
                    co(it.value).call(ctx, _next); 
                } else {
                    it.value(_next); 
                } 
            } else {
                done && done.call(ctx); 
            }
        }

        _next();
    }
}

function isGeneratorFunction() {
    var constructor = obj.constructor;
    if (!constructor) return false;
    if ('GeneratorFunction' === constructor.name || 'GeneratorFunction' === constructor.displayName) {
        return isGenerator(constructor.prototype); 
    }
}

function isGenerator() {
    return 'function' === typeof obj.next && 'function' === typeof obj.throw;
}
