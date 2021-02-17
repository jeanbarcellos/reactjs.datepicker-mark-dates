import moment from 'moment'
import _ from 'lodash'

export const namesOfdaysOfWeek = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado'
]

export const namesOfMonths = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro'
]

export const getNameOfdaysOfWeek = (date, length = null) => {
  let num = 0
  if (!(date instanceof Date)) {
    date = moment(date).utc(false).toDate()
  }

  num = date.getDay()

  if (length === null) {
    return namesOfdaysOfWeek[num]
  }
  return namesOfdaysOfWeek[num].substr(0, length)
}

export const getNameOfdaysOfWeekByNumber = number => {
  return namesOfdaysOfWeek[number]
}

export const getNameOfMonth = (date, length = null) => {
  let num = date.getMonth()

  if (length === null) {
    return namesOfMonths[num]
  }
  return namesOfMonths[num].substr(0, length)
}

export const formatDate = date => {
  let numMonth = 0
  if (date instanceof Date) {
    numMonth = date.getMonth()
  }
  const month = numMonth + 1

  return (
    date.getFullYear() +
    '-' +
    month.toString().padStart(2, '0') +
    '-' +
    date.getDate().toString().padStart(2, '0')
  )
}

export const getStartDateOfWeek = date => {
  const dateInit = new Date(date.getTime())
  dateInit.setDate(dateInit.getDate() - date.getDay())
  return dateInit
}

export const getFinishDateOfWeek = date => {
  const dateFim = new Date(date.getTime())
  dateFim.setDate(date.getDate() + (6 - date.getDay()))
  return dateFim
}

export const datesOfWeek = date => {
  const dateInit = getStartDateOfWeek(date)

  const showDates = []
  for (var i = 0; i <= 6; i++) {
    const temp = new Date(dateInit)
    temp.setDate(dateInit.getDate() + i)
    showDates.push(moment(temp).utc(false).format('YYYY-MM-DD'))
  }
  return showDates
}

// ************

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
  if (!_.includes(['day', 'mouth', 'year'], show)) {
    throw 'Tipo deve ser: [day, mouth, year]'
  }

  const fromDate = date.clone().startOf(show).utc(false).toDate()
  const toDate = date.clone().endOf(show).utc(false).toDate()

  return getEventsGroupByDate(dataset).filter(item => {
    const dateTemp = moment(item.date).utc(false).toDate()
    return dateTemp >= fromDate && dateTemp <= toDate
  })
}
