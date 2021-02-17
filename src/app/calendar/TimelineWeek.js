import React from 'react'
import Timeline from '@material-ui/lab/Timeline'
import TimelineItem from '@material-ui/lab/TimelineItem'
import TimelineSeparator from '@material-ui/lab/TimelineSeparator'
import TimelineConnector from '@material-ui/lab/TimelineConnector'
import TimelineContent from '@material-ui/lab/TimelineContent'
import TimelineDot from '@material-ui/lab/TimelineDot'
// import history from '@history'
import {Avatar, Icon, IconButton, makeStyles, Typography } from '@material-ui/core'
import moment from 'moment'

const convertFloatToStringDecimal = (input, toFixed = 2) => {
  const options = {
    style: 'decimal',
    currency: 'BRL',
    minimumFractionDigits: toFixed
  }

  return input.toLocaleString('pt-BR', options)
}

const generateGUID = () => {
  function S4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }

  return S4() + S4()
}

const useStyles = makeStyles(theme => ({
  paper: {
    padding: '6px 16px'
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main
  },
  missingOppositeContent: {
    // "&:before": {
    //   display: "none"
    // }
  },
  timeline: {
    '& .MuiTimelineSeparator-root': {
      flex: 'none',
      width: '35px !important'
    },
    '& .MuiTimelineDot-root': {
      alignSelf: 'center'
    },
    '& .MuiTimelineContent-root': {
      padding: '0 0 18px 16px'
    },
    '& .MuiTimelineItem-missingOppositeContent:before': {
      flex: 'none',
      content: 'none'
    }
  },
  weeekIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '24px',
    height: '24px',
    fontWeight: 'bold'
  },
  weekText: {
    paddingTop: '10px',
    textTransform: 'capitalize'
  },
  avatar: {
    width: '50px',
    height: '50px'
  },
  currency: {
    fontSize: '2.70rem'
  }
}))

const TimelineWeek = props => {
  const { data } = props
  const classes = useStyles()

  const handleGoTo = item => () => {
    // history.push(item.url)
  }

  return (
    <Timeline align='left' className={classes.timeline}>
      {data.length === 0 && (
        <div className='text-left'>
          Não há eventos agendados para nesta semana!
        </div>
      )}
      {data.map(object => (
        <React.Fragment key={generateGUID()}>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color='primary'>
                <div className={classes.weeekIcon}>
                  {moment(object.date).utc(false).format('DD')}
                </div>
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography
                variant='h6'
                component='h1'
                className={classes.weekText}
              >
                {moment(object.date).utc(false).format('dddd')}
              </Typography>
            </TimelineContent>
          </TimelineItem>

          {object.events.map(item => (
            <TimelineItem key={generateGUID()}>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent className='flex flex-row'>
                <Avatar
                  variant='rounded'
                  className={'flex mr-24 bg-green ' + classes.avatar}
                >
                  {item.title.substr(0, 1)}
                </Avatar>
                <div className='flex-1'>
                  <Typography
                    component='div'
                    className='leading-none mb-4 font-bold'
                  >
                    {item.title}
                  </Typography>
                  <div className='flex itens-end'>
                    <Typography
                      component='div'
                      className='font-bold mr-24 min-w-136'
                    >
                      R${' '}
                      <span className={classes.currency}>
                        {convertFloatToStringDecimal(item.value)}
                      </span>
                    </Typography>
                    <div className='mr-16 text-xs'>
                      Vencimento: <br />{' '}
                      <b>
                        {moment(new Date(item.date)).utc(false).format('L')}
                      </b>
                    </div>
                    <div className='mr-0 text-xs'>
                      Pagamento: <br />{' '}
                      <b>
                        {item.paymentDate
                          ? moment(new Date(item.paymentDate))
                              .utc(false)
                              .format('L')
                          : '-'}
                      </b>
                    </div>
                  </div>
                </div>
                {item.url && (
                  <div className='flex'>
                    <IconButton
                      onClick={handleGoTo(item)}
                      size='small'
                      color='primary'
                    >
                      <Icon>arrow_forward_ios</Icon>
                    </IconButton>
                  </div>
                )}
              </TimelineContent>
            </TimelineItem>
          ))}
        </React.Fragment>
      ))}
    </Timeline>
  )
}

TimelineWeek.defaultProps = {
  data: []
}

export default TimelineWeek
