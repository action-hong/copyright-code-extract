import fs from 'node:fs'
import { glob } from 'glob'
import * as docx from 'docx'
import type { Option } from './type'

async function getFiles(root: string, option: Required<Pick<Option, 'ignore' | 'include'>>) {
  return glob.sync(option.include, {
    ignore: option.ignore,
    root,
    absolute: true,
  })
}

function getOutputContent({
  page,
  codes,
  output,
  preLine,
}: {
  page: number
  codes: Array<{ code: string; line: number }>
  output: string[]
  preLine: number
}) {
  const targets = Array.from({
    length: codes.length,
  }, (_, i) => i)
  // 一页50行，凑够50行即可
  const total = page * preLine
  // 最多可以每一页加2行空白行填补
  const error = page
  return output.map((file) => {
    let acc = 0
    let i = 0
    const codeIndexs = []
    const limit = targets.length
    let count = 0
    while ((Math.abs(acc - total) > error)) {
      if (count > limit || targets.length === 0) {
        // eslint-disable-next-line no-console
        console.log('凑不出合适的代码了')
        break
      }

      count++
      const line = codes[targets[i]].line

      if (acc + line > total) {
        // 超了
        i = (i + 1) % targets.length
        continue
      }
      else {
        // 不超
        acc += line
        codeIndexs.push(targets.splice(i, 1)[0])
        if (i === targets.length - 1)
          i = 0
      }
    }

    // eslint-disable-next-line no-console
    console.log(`文件${file}，合成共有${acc}行`)
    return {
      codeIndexs,
      lines: acc,
      file,
    }
  }).map((item) => {
    if (item.lines !== total) {
      // 补空行
      let diff = total - item.lines
      let i = 0
      while (diff > 0) {
        diff--
        i = (i + 1) % item.codeIndexs.length
        const cur = codes[item.codeIndexs[i]]
        cur.code = addEmptyLine(cur.code)
      }
    }

    return {
      file: item.file,
      code: item.codeIndexs.map(index => codes[index].code).join('\r\n'),
    }
  })
}

function addEmptyLine(code: string) {
  const res = code.split('\r\n')
  res.splice(10, 0, '')
  return res.join('\r\n')
}

function exractCode(filename: string) {
  const code = fs.readFileSync(filename, 'utf-8')
  return {
    code,
    line: code.split('\n').length,
  }
}

async function writeCode(code: string, dist: string) {
  const doc = new docx.Document({
    sections: [
      {
        properties: {},
        children: [
          new docx.Paragraph({
            children: [new docx.TextRun(code)],
          }),
        ],
      },
    ],
  })
  const buffer = await docx.Packer.toBuffer(doc)
  fs.writeFileSync(`${dist}.docx`, buffer)
  fs.writeFileSync(`${dist}.txt`, code)
}

export async function cce({
  page = 30,
  preLine = 50,
  output = [
    './前30页代码',
    './后30页代码',
  ],
  include = '**/*.{ts,tsx,js,jsx,vue}',
  ignore = [
    '**/{node_modules,dist,build,test,.git,public,mock}/**',
    '**.config.*',
  ],
}: Option = {}) {
  const files = await getFiles('./', {
    ignore,
    include,
  })

  const codes = files.map(exractCode)

  const content = getOutputContent({
    page,
    codes,
    output,
    preLine,
  })

  content.forEach(item => writeCode(item.code, item.file))
}
