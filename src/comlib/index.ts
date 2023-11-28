import buttonDef from './button/com.json'
import buttonRT from './button/runtime'
import tableDef from './table/com.json'
import tableRT from './table/runtime'
import popupDef from './popup/com.json'
import popupRT from './popup/runtime'
import muiltInputJsDef from './_muilt-inputJs/com.json'
import muiltInputJsRT from './_muilt-inputJs/runtime'
import schemaSimulatorDef from './_schema-simulator/com.json'
import schemaSimulatorRT from './_schema-simulator/runtime'
import formContainerDef from './form-coms/form-container/com.json'
import formContainerRT from './form-coms/form-container/runtime'
import selectDef from './form-coms/select/com.json'
import selectRT from './form-coms/select/runtime'
import textDef from './form-coms/text/com.json'
import textRT from './form-coms/text/runtime'

const lib = {
  id: 'test.comlibs',
  title: 'Demo组件库',
  author: 'test',
  icon: '',
  version: '1.0.0',
  comAray: [
    merge({
      comDef: buttonDef,
      rt: buttonRT,
    }),
    merge({
      comDef: tableDef,
      rt: tableRT,
    }),
    merge({
      comDef: popupDef,
      rt: popupRT,
    }),
    merge({
      comDef: muiltInputJsDef,
      rt: muiltInputJsRT,
    }),
    merge({
      comDef: schemaSimulatorDef,
      rt: schemaSimulatorRT,
    }),
    merge({
      comDef: formContainerDef,
      rt: formContainerRT,
    }),
    merge({
      comDef: selectDef,
      rt: selectRT,
    }),
    merge({
      comDef: textDef,
      rt: textRT,
    })
  ]
}

export default lib

export function getCom(namespace: string) {
  return lib.comAray.find(com => com.namespace === namespace)
}

function merge({
  comDef,
  icon,
  rt,
  rtEdit,
  data,
  editors,
  assistence
}: {
  comDef, icon?, rt?, data?, editors?, assistence?
}) {
  return Object.assign(comDef, {
    runtime: rt,
    icon: icon,
    'runtime.edit': rtEdit,
    data,
    editors,
    assistence
  })
}