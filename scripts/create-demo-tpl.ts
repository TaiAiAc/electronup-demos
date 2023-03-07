/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
import { $, path } from 'zx'
import inquirer from 'inquirer'
import { copy, ensureDir } from 'fs-extra'

!(async () => {
  const { name } = await inquirer.prompt([{ name: 'name', message: '请输入输入模版名称\n' }])
    .catch((err) => {
      console.error('err: ', err)
      process.exit(1)
    })

  if (!/^[a-zA-Z0-9-_]{1,30}$/.test(name)) {
    console.log('文件夹名只包含字母、数字、破折号和下划线，且长度不超过30个字符。\n同时，文件夹名必须以字母或数字开头，不允许以破折号或下划线开头。')
    process.exit(1)
  }

  const output = path.resolve(process.cwd(), `demos/${name}`)

  await ensureDir(output)

  const tml = path.resolve(process.cwd(), 'scripts/template')
  await copy(tml, output).catch((err) => {
    console.error(err)
    process.exit(1)
  })

  console.log('\n\n模版创建成功！')
  console.log('\n\n 安装依赖中...')

  await $`pnpm install`

  console.log('\n\n 安装完成！')
})()
