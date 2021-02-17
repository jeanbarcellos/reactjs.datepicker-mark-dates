import React from 'react'
import { Icon, IconButton, Typography } from '@material-ui/core'
import moment from 'moment'

const TimelineWeekTitle = props => {
  const { date, setDate, type } = props

  const dateNow = date.utc(false)
  const dateInit = date.clone().startOf(type)
  const dateFinish = date.clone().endOf(type)

  const handlePage = num => () => {
    const dateTemp = date.clone().startOf(type).utc(false)

    if (num <= 0) {
      dateTemp.subtract(1, type)
    } else {
      dateTemp.add(1, type)
    }

    setDate(dateTemp)
  }

  const titulo = () => {
    if (type === 'day') {
      return dateNow.format('DD [de] MMMM')
    }

    if (dateInit.format('MM') === dateFinish.format('MM')) {
      return dateInit.format('DD') + ' - ' + dateFinish.format('DD [de] MMMM')
    }

    return dateInit.format('DD/MMM') + ' - ' + dateFinish.format('DD/MMM')
  }

  return (
    <div className='flex justify-between mx-16 my-8 border-b'>
      <Typography component='div' className='text-lg font-bold mt-8 uppercase'>
        {titulo()}
      </Typography>
      <div className='my-8'>
        <IconButton size='small' onClick={handlePage(-1)}>
          <Icon>arrow_back_ios</Icon>
        </IconButton>
        <IconButton size='small' onClick={handlePage(1)}>
          <Icon>arrow_forward_ios</Icon>
        </IconButton>
      </div>
    </div>
  )
}

TimelineWeekTitle.defaultProps = {
  date: moment().utc(false),
  setDate: () => {},
  type: 'week'
}

export default TimelineWeekTitle
