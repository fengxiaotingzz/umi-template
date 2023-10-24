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
  createDispatch(dirUrl);
  createModalFile(name, dirUrl);
};

const createModalFile = (name) => {
  const content = `
export default {
  namespace: '${name}',
  state: {
      a: '1',
      filterData: {}
  },
  reducers: {
      changeFilterData(state, action){
          return {
              ...state, ...action.payload
          }
      }
  }
}
  `
  const url = `./src/models/${name}.js`
  const dirName = path.resolve(url);
  fs.appendFile(dirName, content, (err) => {
    if (err) throw err;
    console.log(chalk.green(`${url}文件创建成功！`));
  });
}

const createDispatch = (dirUrl) => {
  const content = `
export const dispatchFilter = () => (dispatch) => {
  dispatch({
    type: 'changeFilterData/filterData',
    payload: {
      value: '333',
    },
  });
};
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
import { dispatchFilter } from './dispatch';

import './index.module.less';

function ${resultName}({ dispatch }) {
  return (
    <div styleName='${styleName}-page'></div>
  );
}

export default connect([], '${name}')(${resultName});
`;

  fs.appendFile(`${dirUrl}/index.jsx`, jsContent, (err) => {
    if (err) throw err;
    console.log(chalk.green(`${dirUrl}/index.jsx文件创建成功！`));
  });
};

// 创建containers
const createContainer = (resultName) => {
  const containerUrl = `./src/containers/${resultName}.js`;
  const containerContent = `import React, { PureComponent } from 'react';
import Comp from '@components/${resultName}';

export default class ${resultName} extends PureComponent {
  render() {
    return <Comp />;
  }
}
  `;

  fs.appendFile(`${containerUrl}`, containerContent, (err) => {
    if (err) throw err;
    console.log(chalk.green(`${containerUrl}文件创建成功！`));
  });
};

// 创建actions
const createAction = (name, resultName, extraName) => {
  const dirUrl = `./src/actions/${resultName}`;
  fs.mkdirSync(dirUrl);

  const actionJsContent = `export const onChangeCondition =
  (condition) =>
  (dispatch, getState) => {
    dispatch('/${name}/condition/changeCondition', condition);
  };
export const onClearCondition = () => (dispatch, getState) => {
  dispatch('/${name}/condition/clear');
};`;

  fs.appendFile(`${dirUrl}/index.js`, actionJsContent, (err) => {
    if (err) throw err;
    console.log(chalk.green(`${dirUrl}/index.js文件创建成功！`));
  });
};

// 创建reducers
const creatReducer = (name, resultName) => {
  const dirUrl = `./src/reducers/${resultName}`;
  fs.mkdirSync(dirUrl);

  const reducerContent = `import { combinceReducer } from '@common/easy';

const initCondition = {};
  
const condition = {
  state: initCondition,
  reducers: {
    changeCondition(state, condition) {
      return {
        ...state,
        ...condition
      };
    },
    clear(state) {
      return initCondition;
    }
  }
};

export default combinceReducer(
  { condition },
  '/${name}'
);
  `;

  fs.appendFile(`${dirUrl}/index.js`, reducerContent, (err) => {
    if (err) throw err;
    console.log(chalk.green(`${dirUrl}/index.js文件创建成功！`));
  });
};

// router中添加路由
const wirteAddRouter = (name, cName) => {
  const resultName = getName(name);
  const filePath = path.resolve('./config/router.js');

  fs.readFile(filePath, 'utf-8', (err, data) => {
    const dataArr = data.split('];');
    const content = `${dataArr[0]},{ name: '${cName}', path: '/${name}',component: lazyComp('${resultName}')}
  ];
     `;
    fs.writeFileSync(filePath, content);

    createPage(name, resultName);
    // createContainer(resultName);
    // createAction(name, resultName, extraName);
    // creatReducer(name, resultName);

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
