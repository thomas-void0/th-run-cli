const download = require('download-git-repo')
const ora = require('ora')

export default function (target: string) {
	return new Promise(function (res, rej) {
		const url = 'thomas-void0/react-mobile-template#master'
		const spinner = ora(`正在下载项目模板，源地址${url}`)
		spinner.start()

		download(url, target, { clone: false }, function (err: any) {
			if (err) {
				spinner.fail('模板下载失败')
				rej(err)
			} else {
				spinner.succeed('模板下载成功')
				res(target)
			}
		})
	})
}
