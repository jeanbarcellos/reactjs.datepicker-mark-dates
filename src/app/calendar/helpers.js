import moment from 'moment'
import _ from 'lodash'

export const convertFloatToStringDecimal = (input, toFixed = 2) => {
  const options = {
    style: 'decimal',
    currency: 'BRL',
    minimumFractionDigits: toFixed
  }

  return input.toLocaleString('pt-BR', options)
}

export const generateGUID = () => {
  function S4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }

  return S4() + S4()
}

export const getEventsGroupByDate = dataset => {
  const result = _.chain(dataset)
    .groupBy('date')
    .toPairs()
    .map(currentItem => {
      return {
        date: currentItem[0],
        events: currentItem[1]
      }
    })
    .orderBy('date')
    .value()

  return result
}

export const getEventsGroupByDateAndShowByDay = (
  dataset = [],
  date = moment(new Date())
) => {
  const dateTest = date.utc(false).format('YYYY-MM-DD')

  return getEventsGroupByDate(dataset).filter(item => {
    return dateTest == item.date
  })
}

export const getEventsGroupByDateAndShowByWeek = (
  dataset = [],
  date = moment(new Date())
) => {
  const fromDate = date.clone().startOf('week').utc(false).toDate()
  const toDate = date.clone().endOf('week').utc(false).toDate()

  return getEventsGroupByDate(dataset).filter(item => {
    const dateTemp = moment(item.date).utc(false).toDate()
    return dateTemp >= fromDate && dateTemp <= toDate
  })
}

export const getEventsGroupByDateAndShowByMonth = (
  dataset = [],
  date = moment(new Date())
) => {
  const fromDate = date.clone().startOf('month').utc(false).toDate()
  const toDate = date.clone().endOf('month').utc(false).toDate()

  return getEventsGroupByDate(dataset).filter(item => {
    const dateTemp = moment(item.date).utc(false).toDate()
    return dateTemp >= fromDate && dateTemp <= toDate
  })
}

export const getEventsGroupByDateAndShowByYear = (
  dataset = [],
  date = moment(new Date())
) => {
  const fromDate = date.clone().startOf('year').utc(false).toDate()
  const toDate = date.clone().endOf('year').utc(false).toDate()

  return getEventsGroupByDate(dataset).filter(item => {
    const dateTemp = moment(item.date).utc(false).toDate()
    return dateTemp >= fromDate && dateTemp <= toDate
  })
}

export const getEventsGroupByDateAndShow = (
  dataset = [],
  date = moment(new Date()),
  show = 'week'
) => {
  if (!_.includes(['day', 'week', 'mouth', 'year'], show)) {
    throw 'Tipo deve ser: [day, week, mouth, year]'
  }

  const fromDate = date.clone().startOf(show).utc(false).toDate()
  const toDate = date.clone().endOf(show).utc(false).toDate()

  return getEventsGroupByDate(dataset).filter(item => {
    const dateTemp = moment(item.date).utc(false).toDate()
    return dateTemp >= fromDate && dateTemp <= toDate
  })
}
