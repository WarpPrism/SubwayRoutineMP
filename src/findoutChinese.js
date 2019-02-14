let fs = require('fs')
let path = require('path')
let extensionsReg = /.js$|.vue$/

let _getAllFilesFromFolder = function (dir) {
  let filesystem = require('fs')
  let results = []

  filesystem.readdirSync(dir).forEach(function (file) {
    file = dir + '/' + file
    let stat = filesystem.statSync(file)

    if (stat && stat.isDirectory()) {
      results = results.concat(_getAllFilesFromFolder(file))
    } else results.push(file)
  })
  return results
}

let unique = {}
'1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ？。，'
  .split('').forEach(p => {
    unique[p] = 1
  })

function readFiles (dir, onFileContent, onError) {
  let length = _getAllFilesFromFolder(dir).filter(p => extensionsReg.test(p)).length
  let counted = 0
  _getAllFilesFromFolder(dir).forEach(function (filename) {
    if (!extensionsReg.test(filename)) {
      return
    }
    fs.readFile(filename, { encoding: 'utf8' }, function (err, data) {
      if (err) {
        console.error(err)
      }
      var match = data.match(/[\u4e00-\u9fa5]/g)
      if (match) {
        match.forEach(function (mat) {
          unique[mat] = 1
        })
      }
      counted++
      if (counted === length) {
        console.log(Object.keys(unique).join(''))
      }
    })
  })
}

readFiles(path.resolve(__dirname, ''), () => {}, err => console.log(err))
