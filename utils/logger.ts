import pino from 'pino'

const logger = pino({
  level: process.env.LOG_LEVEL?.toLowerCase() ?? 'info',
  timestamp: pino.stdTimeFunctions.isoTime,
  base: undefined,
  formatters: {
    level(label) {
      return { level: label }
    },
  },
})

export default logger

