import { transports, format, addColors, createLogger, Logger } from 'winston'
const { colorize, combine, timestamp, printf, prettyPrint, splat, errors } =
	format
import path from 'path'

const getErrorStack = () => {
	Error.stackTraceLimit = 50
	return new Error().stack
}

export function getPathWithLineNumber(colors: boolean = true) {
	const blue = '\x1b[34m'
	const resetColor = '\x1b[0m'
	const cwdName = path.basename(path.resolve())
	const stack = getErrorStack()
	let distPaths = stack
		.split('\n')
		.filter((p) => p.includes(path.resolve('dist')))
	distPaths = distPaths.filter((p) => !p.includes('logger.js'))
	if (distPaths.length === 0) return ''
	let _path = distPaths[0].split(cwdName)[1]
	let fileAndLine = _path.substring(1, _path.length - 1)
	if (colors) return `${blue}${fileAndLine}${resetColor}`
	return fileAndLine
}

function syntaxHighlight(json: Object, colors?: Object): string {
	if (!colors)
		colors = {
			key: '\x1b[34m', //'\x1b[1m',
			boolean: '\x1b[31m',
			string: '\x1b[32m',
			number: '\x1b[33m',
			null: '\x1b[36m',
			undefined: '\x1b[35m',
		}

	let jsonStr = JSON.stringify(
		json,
		function (k, v) {
			return v === undefined ? '9bFf2G6n' : v
		},
		2
	)

	jsonStr = jsonStr
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
	//
	return jsonStr
		.replace(
			/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null|undefined)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
			function (match) {
				var cls = 'number'
				if (/^"/.test(match)) {
					if (/:$/.test(match)) {
						cls = 'key'
						match = match.replace(/"/g, '')
					} else {
						if (match == '"9bFf2G6n"') {
							cls = 'undefined'
							match = 'undefined'
						} else cls = 'string'
					}
				} else if (/true|false/.test(match)) {
					cls = 'boolean'
				} else if (/null/.test(match)) {
					cls = 'null'
				} else if (/undefined/.test(match)) {
					cls = 'null'
				}
				return `${colors[cls]}` + (match ? match : 'nulll') + '\x1b[0m'
			}
		)
		.replace(/,/g, '\x1b[8m' + ',' + '\x1b[0m')
}
const myFormats = {
	consoleFormat: combine(
		errors({ stack: true }),
		colorize(),
		prettyPrint(),
		splat(),
		timestamp({ format: 'MM/DD HH:mm:ss.ms' }),
		printf(({ message, level, timestamp }) => {
			let fileAndLine = getPathWithLineNumber()
			if (message && message.constructor === Object) {
				message = syntaxHighlight(message)
			}
			let newLine = ' '
			if (!!message) newLine = message.indexOf('\n') !== -1 ? '\n' : ' '
			return `${timestamp} | ${level} | ${fileAndLine}:${newLine}${message}`
		})
	),
	fileFormat: combine(
		timestamp({ format: 'YYYY-MM-DD HH:mm:ss.ms' }),
		printf(({ message, level, timestamp }) => {
			let fileAndLine = getPathWithLineNumber(false)
			if (message && message.constructor === Object) {
				message = JSON.stringify(message)
			}
			let newLine = ' '
			if (!!message) newLine = message.indexOf('\n') !== -1 ? '\n' : ' '
			return `[${timestamp}][${level}][${fileAndLine}] ${message}`
		})
	),
}
addColors({
	debug: 'blue',
	info: 'green',
	warn: 'yellow',
	error: 'red',
	crit: 'redBG white',
})

function getCurrentDate(): string {
	const d = new Date
	return `${d.getFullYear()}-${d.getMonth()}-${d.getDay()}`
}

const logger: Logger = createLogger({
	level: process.env.LOGGING_LEVEL,
	transports: [
		new transports.Console({
			format: myFormats.consoleFormat,
		}),
		// new transports.File({
		// 	filename: `./logs/${getCurrentDate()}_error.log`,
		// 	level: 'error',
		// 	format: myFormats.fileFormat,
		// }),
		// new transports.File({
		// 	filename: `./logs/${getCurrentDate()}_full.log`,
		// 	format: myFormats.fileFormat,
		// }),
	],
	exitOnError: false,
})

export default logger