import React from 'react';
import TimeAgo from 'react-timeago'
import zhStrings from 'react-timeago/lib/language-strings/zh-CN'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'

const formatter = buildFormatter(zhStrings)

export default ({prefix, time, suffix}) => {
  return(
    <>
      {prefix && prefix}
      <TimeAgo date={time} formatter={formatter}/>
      {suffix && suffix}
    </>
  )
}