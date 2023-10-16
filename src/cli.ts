import { loadConfig } from 'unconfig'
import type { Option } from './type'
import { cce } from '.'

async function main() {
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

main()
