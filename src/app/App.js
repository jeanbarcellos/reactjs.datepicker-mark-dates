import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import Content from './Content'

import 'moment/locale/pt-br'

function App() {
  return (
    <div className='App'>
      <MuiPickersUtilsProvider utils={MomentUtils} locale={'ptBR'}>
        <Content />
      </MuiPickersUtilsProvider>
    </div>
  )
}

export default App
