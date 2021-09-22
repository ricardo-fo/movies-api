import * as pino from 'pino';

const logger = {
  pinoHttp: {
    autoLogging: true,
    serializers: {
      err: pino.stdSerializers.err,
      req: (r) => `${r.method} ${r.headers.host}${r.url}`,
      res: (r) => `${r.statusCode}`,
    },
    prettyPrint: {
      colorized: true,
      ignore: 'pid,context,req,res,responseTime',
      translateTime: 'dd/mm/yyyy HH:mm:ss',
      messageFormat: (log) =>
        log.req != null
          ? `[${log.res}] ${log.req} | ${log.msg}\n`
          : `${log.msg}\n`,
    },
  },
};

export default logger;
