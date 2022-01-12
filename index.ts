#!/usr/bin/env node
import download from './lib/download'
import remove from './lib/remove'

const program = require('commander')
const path = require('path')
const fs = require('fs')
const glob = require('glob')
const inquirer = require('inquirer') // 按需引入

function isSameName(list: string[], projectName: string) {
	return list.some(n => {
		const fileName = path.resolve(process.cwd(), n)
		const isDir = fs.statSync(fileName).isDirectory()
		return projectName === n && isDir // 找到创建文件名和当前目录文件存在一致的文件
	})
}

function create(projectName: string) {
	projectName !== '.' && fs.mkdirSync(projectName) // 创建目录文件
	download(projectName)
}

function runNotEmpty(projectName: string) {
	inquirer
		.prompt([
			{
				name: 'isRemovePro',
				message: `项目${projectName}已经存在，是否覆盖文件`,
				type: 'confirm',
				default: true
			}
		])
		.then((answer: Record<string, any>) => {
			if (answer.isRemovePro) {
				remove(path.resolve(process.cwd(), projectName))
				create(projectName)
			} else {
				console.log('停止创建')
			}
		})
}

function runParentSameName(projectName: string) {
	inquirer
		.prompt([
			{
				name: 'buildInCurrent',
				message: '当前目录为空，且目录名称和项目名称相同，是否直接在当前目录下创建新项目？',
				type: 'confirm',
				default: true
			}
		])
		.then((answer: Record<string, any>) => {
			answer.buildInCurrent && create(projectName)
		})
}

function run() {
	program.usage('<project-name>').parse(process.argv)

	const projectName = program.rawArgs[2]

	if (!projectName) {
		program.help()
		return
	}

	const list = glob.sync('*') // 遍历当前目录,数组类型
	const rootName = path.basename(process.cwd())

	if (list.length) {
		// 如果当前目录不为空
		isSameName(list, projectName)
			? runNotEmpty(projectName)
			: console.log('请选择一个空文件夹进行创建')
	} else if (rootName === projectName) {
		// 如果文件名和根目录文件名一致
		runParentSameName(projectName)
	} else {
		create(projectName)
	}
}

run()
