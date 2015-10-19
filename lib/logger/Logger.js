/*
    ████████████████████████████████████████████████████████████████████████████████████████████████████
    * Logger: Logger.js v0.0.0.1
    * http://azmisahin.com
    ════════════════════════════════════════════════════════════════════════════════════════════════════
    * Copyright bilgi@azmisahin.com
    * Licence (https://github.com/azmisahin)
    ████████████████████████████████████████████████████████████████████████████████████████████████████
*/

function Logger() { }
Logger.prototype = (function () {
    var _options = {
        isEnabled: true,
        isDebug: true,
        isData: true
    };
    /*
    Public Functions
    ────────────────────────────────────────────────────────────────────────────────────────────────────*/
    return {
        Version: "0.0.0.1",
        constructor: Logger,
        log: function (obj) { Log(obj); },
        options: _options
    }

    /*
    Public Log Functions
    ────────────────────────────────────────────────────────────────────────────────────────────────────*/
    function Log(obj) {
        var callManager = {
            data: obj,
            arguments: arguments,
            argumentsLength: arguments.length,
            argumentsCallee: arguments.callee,
            functionsLength: Log.length,
            functionsCaller: Log.caller,
            functionsCtor: Log.constructor,
            functionsName: Log.name,
            functionsCallName: arguments.callee.caller.toString()

        }
        if (_options.isEnabled) {
            if (_options.isDebug)
                console.log(callManager);

            if (_options.isData)
                console.log(obj);

        }
        //return null;



    }
})();
var logger = new Logger();