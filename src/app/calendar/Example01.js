import React, { useState } from 'react'
import { DatePicker } from '@material-ui/pickers'

const Example01 = () => {
  const [date, changeDate] = useState(new Date())

  const clickDate = (event) => {
    console.log(event)
  }

  // prettier-ignore
  return (
    <>
      <DatePicker
        autoOk
        orientation="landscape"
        variant="static"
        openTo="date"
        value={date}
        onChange={changeDate}
        className='mb-24'
      />
    </>
  );
}

export default Example01
