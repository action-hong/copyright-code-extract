export interface Option {
  ignore?: string[] | string
  /**
   * 一个文档有多少页
   *
   * @default 30
   */
  page?: number

  /**
   * 输出的docx文档
   */
  output?: string[]

  /**
   * 每一页有多少行
   *
   * @default 50
   */
  preLine?: number

  /**
   * 包含的代码文件
   */
  include?: string[] | string
}

export function defineConfig(option: Option) {
  return option
}
