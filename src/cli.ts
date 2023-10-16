import process from 'node:process'
import { loadConfig } from 'unconfig'
import minimist from 'minimist'
import { version } from '../package.json'
import type { Option } from './type'
import { cce } from '.'

async function main() {
  const argv = minimist(process.argv.slice(2), {
    boolean: ['version', 'help'],
    alias: {
      version: 'v',
      help: 'h',
    },
  })

  if (argv.version) {
    // eslint-disable-next-line no-console
    console.log(version)
  }
  else if (argv.help) {
    // eslint-disable-next-line no-console
    console.log(`
Usage: cce [options]

Options:
  -v, --version  output the version number
  -h, --help     display help for command
  None           generate docx file
`)
  }
  else {
    const {
      config,
    } = await loadConfig<Option>({
      sources: [
        {
          files: 'cce.config',
          extensions: ['ts', 'mts', 'cts', 'js', 'mjs', 'cjs', 'json'],
        },
      ],
    })

    cce(config)
  }
}

main()
