import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../lib/prisma'
import dayjs from 'dayjs'
import { count } from 'console'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const username = String(req.query.username)
  const { year, month } = req.query

  if (!year || !month) {
    res.status(400).json({
      message: 'Year or month not specified',
    })
  }

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    return res.status(400).json({
      message: 'User does not exist.',
    })
  }

  const availableWeekDays = await prisma.userTimeInterval.findMany({
    select: {
      week_day: true,
    },
    where: {
      user_id: user.id,
    },
  })

  const blockedWeekDays = [0, 1, 2, 3, 4, 5, 6].filter((weekDay) => {
    return !availableWeekDays.some(
      (availableWeekDay) => availableWeekDay.week_day === weekDay,
    )
  })

  const blockedDatesRaw: Array<{ day_of_month: string }> =
    await prisma.$queryRaw`
   SELECT
      EXTRACT(DAY FROM S.date) AS day_of_month,
      COUNT(S.date) AS number_of_schedulings,
      ((UTI.time_end_in_minutes - UTI.time_start_in_minutes) / 60) AS time_available
    FROM 
      schedulings S
    
      LEFT JOIN user_time_intervals UTI
      ON (UTI.week_day = EXTRACT(ISODOW FROM S.date) AND UTI.week_day <> 0) OR (UTI.week_day = 0 AND EXTRACT(ISODOW FROM S.date) = 7)


    WHERE 
      S.user_id = ${user.id}
      AND TO_CHAR(S.date, 'YYYY-MM') = ${`${year}-${month}`}
    GROUP BY 
      EXTRACT(DAY FROM S.date),
      ((UTI.time_end_in_minutes - UTI.time_start_in_minutes) / 60)

    HAVING COUNT(S.date) >= ((UTI.time_end_in_minutes - UTI.time_start_in_minutes) / 60) 
  `

  const blockedDates = blockedDatesRaw.map((item) => Number(item.day_of_month))

  return res.status(200).json({ blockedWeekDays, blockedDates })
}
