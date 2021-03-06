const fs = require('fs')
const path = require('path')

export default function removeDir(dir: string) {
	const files = fs.readdirSync(dir)
	// eslint-disable-next-line no-plusplus
	for (let i = 0; i < files.length; i++) {
		const newPath = path.join(dir, files[i])
		const stat = fs.statSync(newPath)
		if (stat.isDirectory()) {
			// 如果是文件夹就递归下去
			removeDir(newPath)
		} else {
			// 删除文件
			fs.unlinkSync(newPath)
		}
	}
	fs.rmdirSync(dir) // 如果文件夹是空的，就将自己删除掉
}
