interface getWeekDaysParams {
  weekday: 'long' | 'short' | 'narrow' | undefined
}

export function getWeekDays({ weekday = 'long' }: getWeekDaysParams) {
  const formatter = new Intl.DateTimeFormat('pt-BR', { weekday })

  return Array.from(Array(7).keys())
    .map((day) => formatter.format(new Date(Date.UTC(2024, 9, day))))
    .map((week) => {
      return week.charAt(0).toLocaleUpperCase('pt-BR').concat(week.substring(1))
    })
}
