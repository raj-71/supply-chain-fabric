function init() {
    
}

function log(message) {
    console.log(message);
}

function error(message) {
    console.error(message);
}

const logService = { init, log, error };

export default logService;