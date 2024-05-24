const fs = require('fs');
let path = require('path');
const readline = require('readline');
const chalk = require('chalk');

const readlineObj = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 创建components
const createPage = (name, resultName) => {
  const dirUrl = `./src/pages/${resultName}`;
  // 目录
  const dirName = path.resolve(dirUrl);

  fs.mkdirSync(dirName);

  // 将name根绝大写字母分割
  const nameArr = name.split(/(?=[A-Z])/)
  nameArr.forEach((item,index) => {
    nameArr[index] = item.toLowerCase()
  })
 const styleName = nameArr.join('-')

  createIndexJsx(name, styleName, resultName, dirUrl);
  createStyleFile(styleName, dirUrl);
  createDispatch(name, dirUrl);
  createModelFile(name, dirUrl);
};

const createModelFile = (name, dir) => {
  const content = `
import { handlePayload, handleClearCondition} from '@/utils/util';

const defaultCondition = {};

export default {
  namespace: '${name}',
  state: {
    condition: defaultCondition,
    data: {}
  },
  reducers: {
    getData(state, action) {
      return handlePayload({ state, action, key: 'data' });
    },
    changeCondition(state, action) {
      return handlePayload({ state, action, key: 'condition' })
    },
    clearCondition(state) {
      return handleClearCondition({ state, defaultCondition });
    }
  }
}
  `
  const modelsUrl = `${dir}/models`;
  const modelsDir = path.resolve(modelsUrl);
  fs.mkdir(modelsDir, err => {
    if (err) throw err;

    const dispatchUrl = `${modelsUrl}/index.js`;
    fs.appendFile(dispatchUrl, content, e=> {
      if (e) throw e;

      console.log(chalk.green(`${dispatchUrl}创建成果！`));
      readlineObj.close();
    })
  })
}

const createDispatch = (name, dirUrl) => {
  const content = `
export const getData = dispatch => params => {
  dispatch({
    url: '',
    method: 'get',
    type: '${name}/getData',
    body: params
  })
}
export const changeCondition = (dispatch) => (condition) => {
  dispatch({
    type: '${name}/changeCondition',
    payload: condition,
  });
};

export const clearCondition = dispatch => () => {
  dispatch({
    type: '${name}/clearCondition'
  })
}
  `

  fs.appendFile(`${dirUrl}/dispatch.js`, content, (err) => {
    if (err) throw err;
    console.log(chalk.green(`${dirUrl}/dispatch.js文件创建成功！`));
  });
}

// 创建style文件
const createStyleFile = (name, dirUrl) => {
  const styleContent = `.${name}-page {
    background: #fff;
  }
  `;
  fs.appendFile(`${dirUrl}/index.module.less`, styleContent, (err) => {
    if (err) throw err;
    console.log(chalk.green(`${dirUrl}/index.module.less文件创建成功！`));
  });
};

// 创建js
const createIndexJsx = (name, styleName, resultName, dirUrl) => {
  const jsContent = `import connect from '@/common/connect';
import { useEffect } from 'react';
import * as actions from './dispatch';

import './index.module.less';

function ${resultName}({ ${name}, changeCondition, clearCondition, getData }) {
  const { data = {}, condition = {} } = ${name};
  return (
    <div styleName='${styleName}-page'></div>
  );
}

export default connect(actions)(${resultName});
`;

  fs.appendFile(`${dirUrl}/index.jsx`, jsContent, (err) => {
    if (err) throw err;
    console.log(chalk.green(`${dirUrl}/index.jsx文件创建成功！`));
  });
};

// router中添加路由
const wirteAddRouter = (name, cName) => {
  const resultName = getName(name);
  const filePath = path.resolve('./config/router.js');

  fs.readFile(filePath, 'utf-8', (err, data) => {
    const dataArr = data.split('];');
    const content = `${dataArr[0]},{ name: '${cName}', path: '/${name}',component: '${resultName}'}
  ];
     `;
    fs.writeFileSync(filePath, content);

    createPage(name, resultName);

    readlineObj.close();
  });
};

// 处理首字母大写
const getName = (name) => {
  const beforeName = name.slice(0, 1).toUpperCase();
  return beforeName + name.slice(1);
};

const isHasFile = (name, callback) => {
  const dir = path.resolve('./src/pages');

  fs.readdir(dir, (err, dirName) => {
    const hasFile = dirName.find((val) => val === `${name}.js`);
    callback(hasFile);
  });
};

const init = () => {
  readlineObj.question('要创建的页面英文名称是什么？', (name) => {
    if (name) {
      readlineObj.question('要创建的页面中文名称是什么？', (cName) => {
        if (name) {
          const resultName = getName(name);
          console.log(
            chalk.green(
              `即将创建的页面英文名字：${getName(name)}，中文名字：${cName}`,
            ),
          );
          // 查找是否已经创建
          isHasFile(resultName, (flag) => {
            if (flag) {
              console.log(chalk.red('该文件名已经存在！'));
              readlineObj.close();
            } else {
              // 添加路由
              wirteAddRouter(name, cName);
            }
          });
        }
      });
    } else {
      console.log(chalk.red('没有输入要创建的页面名称'));
      readlineObj.close();
    }
  });
};
init();
