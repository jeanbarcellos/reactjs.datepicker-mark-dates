import React from 'react'
import { Icon, IconButton, Typography } from '@material-ui/core'
import moment from 'moment'
import { getStartDateOfWeek, getFinishDateOfWeek, getNameOfMonth } from './helpersCalendar'

const TimelineWeekTitle = props => {
  const { date, setDate } = props

  const dateNow = moment(date).utc(false).toDate()
  const dateInit = getStartDateOfWeek(dateNow)
  const dateFinish = getFinishDateOfWeek(dateNow)

  const handlePage = num => () => {
    const dateTemp = getStartDateOfWeek(moment(date).utc(false).toDate())
    if (num <= 0) {
      dateTemp.setDate(dateTemp.getDate() - 1)
    } else {
      dateTemp.setDate(dateTemp.getDate() + 7)
    }

    setDate(moment(dateTemp).utc(false).format('YYYY-MM-DD'))
  }

  const titulo = () => {
    if (dateInit.getMonth() === dateFinish.getMonth()) {
      return (
        dateInit.getDate().toString().padStart(2, '0') +
        ' - ' +
        dateFinish.getDate().toString().padStart(2, '0') +
        ' de ' +
        getNameOfMonth(dateFinish)
      )
    }

    return (
      dateInit.getDate().toString().padStart(2, '0') +
      '/' +
      getNameOfMonth(dateInit, 3) +
      ' - ' +
      dateFinish.getDate().toString().padStart(2, '0') +
      ' de ' +
      getNameOfMonth(dateFinish)
    )
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

export default TimelineWeekTitle
