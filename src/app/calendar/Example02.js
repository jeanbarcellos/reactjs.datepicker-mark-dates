import React, { useEffect, useState } from 'react'
import { DatePicker } from '@material-ui/pickers'
import { makeStyles } from '@material-ui/core'
import moment from 'moment'
import { data as dataFake } from '../data/calendar'
import _ from 'lodash'
import TimelineWeek from './TimelineWeek'
import { getEventsGroupByDateAndShow } from './helpersCalendar'
import TimelineWeekTitle from './TimelineWeekTitle'

const useStyles = makeStyles(theme => ({
  dayWithDotContainer: {
    position: 'relative'
  },
  dayWithDot: {
    position: 'absolute',
    height: 0,
    width: 0,
    border: '4px solid',
    borderRadius: 4,
    borderColor: theme.palette.primary.main,
    right: '50%',
    transform: 'translateX(4px)',
    top: '80%'
  }
}))

const Example02 = () => {
  const classes = useStyles()

  const [selectedDate, setSelectedDate] = useState(moment(new Date()))
  const [collection, setCollection] = useState([])
  const [daysWithDot, setdDaysWithDot] = useState([])

  useEffect(() => {
    const newCollection = dataFake.map(x => {
      return {
        ...x,
        date: moment(x.date).format('YYYY-MM-DD')
      }
    })

    setCollection(newCollection)
    setdDaysWithDot(_.uniq(newCollection.map(x => x.date)))
  }, [])

  const dataFiltered = getEventsGroupByDateAndShow(
    collection,
    selectedDate,
    'day'
  )

  const onChange = date => {
    console.log('onChange', date)
    setSelectedDate(date)
  }

  const onMonthChange = date => {
    setSelectedDate(date.clone().startOf('month').utc(false))
  }

  const onOpenPicker = () => {
    console.log('onOpenPicker')
  }

  const onPickerViewChange = date => {
    console.log('onPickerViewChange', date)
  }

  const renderDayInPicker = (
    date,
    selectedDate,
    dayInCurrentMonth,
    dayComponent
  ) => {
    if (daysWithDot.includes(date.format('YYYY-MM-DD')) && dayInCurrentMonth) {
      return (
        <div className={classes.dayWithDotContainer}>
          {dayComponent}
          <div className={classes.dayWithDot} />
        </div>
      )
    }

    return dayComponent
  }

  return (
    <>
      <div className='flex w-full'>
        <div className='flex'>
          <DatePicker
            // orientation='landscape'
            onOpen={onOpenPicker}
            renderDay={renderDayInPicker}
            onMonthChange={onMonthChange}
            variant='static'
            value={selectedDate}
            onChange={onChange}
            showTodayButton
          />
        </div>
        <div className='flex-1 pl-8'>
          <TimelineWeekTitle
            date={selectedDate}
            setDate={setSelectedDate}
            type='day'
          />
          <TimelineWeek data={dataFiltered} />
        </div>
      </div>
    </>
  )
}

export default Example02
