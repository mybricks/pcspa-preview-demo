import React from 'react'
import { render } from 'react-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import { render as renderUI } from '@mybricks/render-web' //使用Mybricks-web渲染器

//连接器运行时
import { call, mock } from '@mybricks/plugin-connector-http'
import json from './demo.json'
import comlib from '../src/comlib'

// 组件库信息
window.__comlibs_rt_ = [comlib]

//准备编译的数据，结构为 {slot,script}，根据 toJSON 导出
if (!json) {
  throw new Error('数据错误')
}
//----------------------------------------------------------------------------

render(<Page />, document.querySelector('#root'))

function Page() {
  return (
    <ConfigProvider locale={zhCN}>
      {renderUI(json, {
        //渲染Mybricks toJSON的结果
        env: {
          //配置组件运行的各类环境信息
          i18n(text) {
            //多语言
            return text
          },
          callConnector: mock,
          getQuery() {
            return 'aaa'
          },
          events: [
            //配置事件
            {
              type: 'jump',
              title: '跳转到',
              exe({ options }) {
                const page = options.page
                if (page) {
                  window.location.href = page
                }
              },
            },
          ],
        },
      })}
    </ConfigProvider>
  )
}
