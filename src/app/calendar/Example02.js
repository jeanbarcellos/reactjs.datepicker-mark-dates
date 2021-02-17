import React, { useEffect, useState } from 'react'
import { DatePicker } from '@material-ui/pickers'
import { makeStyles } from '@material-ui/core'
import moment from 'moment'
import { data } from '../data/calendar'

const useStyles = makeStyles(theme => ({
  dayWithDotContainer: {
    position: 'relative'
  },
  dayWithDot: {
    position: 'absolute',
    height: 0,
    width: 0,
    border: '3px solid',
    borderRadius: 4,
    borderColor: theme.palette.primary.main,
    right: '50%',
    transform: 'translateX(2px)',
    top: '80%'
  }
}))

const Example02 = props => {
  const classes = useStyles()

  const [selectedDate, setSelectedDate] = useState(moment(new Date()))
  const [daysWithDot, setDaysWithDot] = useState([])
  // console.log(daysWithDot)

  useEffect(() => {
    setDaysWithDot(
      data.map(day => {
        console.log(day)
        return moment(day).format('YYYY-MM-DD')
      })
    )
  }, [])

  const onChange = date => {
    console.log('onChange', date)
    setSelectedDate(date)
  }

  const onOpenPicker = () => {
    onPickerViewChange(selectedDate)
  }

  const onPickerViewChange = date => {
    console.log('onPickerViewChange', date)

    // const variables = {
    //   fromDate: date.clone().startOf('month').format('YYYY-MM-DD'),
    //   toDate: date.clone().endOf('month').format('YYYY-MM-DD')
    // }

    // setDaysWithDot(
    //   data.map(day => {
    //     console.log(day)
    //     return moment(day).format('YYYY-MM-DD')
    //   })
    // )
  }

  const renderDayInPicker = (
    date,
    selectedDate,
    dayInCurrentMonth,
    dayComponent
  ) => {
    if (daysWithDot.includes(date.format('YYYY-MM-DD'))) {
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
      <div>
        <DatePicker
          orientation='landscape'
          renderDay={renderDayInPicker}
          onOpen={onOpenPicker}
          onMonthChange={onPickerViewChange}
          onYearChange={onPickerViewChange}
          variant='static'
          value={selectedDate}
          onChange={onChange}
          showTodayButton
          disableToolbar
        />
      </div>
    </>
  )
}

export default Example02
