const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone')
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('Asia/Shanghai')
const log4js = require("log4js");
const recording = require('log4js/lib/appenders/recording');

log4js.addLayout("div", function (config) {
  return function (logEvent) {
    return log4jsLayoutDiv(logEvent, config)
  };
});

function log4jsLayoutDiv(log4jsEvent, log4jsConfig){
  return `${dayjs.tz(log4jsEvent.startTime).format('YYYY-MM-DD HH:mm:ss')} ${log4jsEvent.data.join('')}`    
}

log4js.configure({
  appenders: {
    recording: {
        type: 'recording',
    },
    stdout: { 
        type: "stdout",
        // layout: { 
        //   type: "div",
        // }
    },
  },
  categories: {
    default: { 
        appenders: [
            "recording", 
            "stdout"
        ], 
        level: "trace" 
    },
  },
});

const logger = log4js.getLogger("demo_log4js")

!(async () => {
  logger.trace("Entering cheese testing");
  await sleep(1000)
  logger.debug("Got cheese.");
  await sleep(1000)
  logger.info("Cheese is Comté.");
  await sleep(1000)
  logger.warn("Cheese is quite smelly.");
  await sleep(1000)
  logger.error("Cheese is too ripe!");
  await sleep(1000)
  logger.fatal("Cheese was breeding ground for listeria.");
  await sleep(1000)


  recording.replay().map((e) => {
    cconsole.log('---')
    console.log(log4jsLayoutDiv(e))
    console.log(e)
    cconsole.log('---')
  })
})()


async function sleep(duration) {
  return new Promise(resolve => {
      setTimeout(resolve, duration);
  })
}
