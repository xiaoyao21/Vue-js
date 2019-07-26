import _ from 'lodash'
import './style/index.css'  //导入css文件
import './style/a.scss'  //导入css文件

function createDomElement() {
  var dom = document.createElement('div');
  
  dom.innerHTML = _.join(['aicoder', '.com', ' wow'], '');
  dom.classList.add('box')
  return dom;
}

document.body.appendChild(createDomElement());