import { Timetable } from '@models/Timetable'

export const myTimetableDateBased: Timetable<'dynamic'> = {
  id: 'S2',
  days: [
    {
      index: 1,
      sessions: [
        {
          subjectId: 'M11-1',
          start: 8.5,
          end: 12.5,
          shelfLife: {
            start: new Date(2022, 2, 28),
            end: new Date(2022, 4, 25),
          },
        },
        {
          subjectId: 'M12-1',
          start: 14.5,
          end: 18.5,
          shelfLife: {
            start: new Date(2022, 2, 28),
            end: new Date(2022, 3, 26),
          },
        },
        {
          subjectId: 'M12-2',
          start: 14.5,
          end: 18.5,
          shelfLife: {
            start: new Date(2022, 4, 2),
            end: new Date(2022, 5, 14),
          },
        },
      ],
    },
    {
      index: 2,
      sessions: [
        {
          subjectId: 'M9',
          start: 8.5,
          end: 12.5,
          shelfLife: {
            start: new Date(2022, 2, 28),
            end: new Date(2022, 6, 4),
          },
        },
        {
          subjectId: 'M16-1',
          start: 14.5,
          end: 16.5,
          shelfLife: {
            start: new Date(2022, 2, 28),
            end: new Date(2022, 6, 4),
          },
        },
        {
          subjectId: 'M16-2',
          start: 16.5,
          end: 18.5,
          shelfLife: {
            start: new Date(2022, 2, 28),
            end: new Date(2022, 6, 4),
          },
        },
      ],
    },
    {
      index: 3,
      sessions: [
        {
          subjectId: 'M13-1',
          start: 8.5,
          end: 12.5,
          shelfLife: {
            start: new Date(2022, 2, 28),
            end: new Date(2022, 3, 19),
          },
        },
        {
          subjectId: 'M13-2',
          start: 8.5,
          end: 12.5,
          shelfLife: {
            start: new Date(2022, 3, 21),
            end: new Date(2022, 4, 16),
          },
        },
        {
          subjectId: 'M10-1',
          start: 14.5,
          end: 18.5,
          shelfLife: {
            start: new Date(2022, 2, 28),
            end: new Date(2022, 4, 2),
          },
        },
      ],
    },
    {
      index: 4,
      sessions: [
        {
          subjectId: 'M10-2',
          start: 8.5,
          end: 12.5,
          shelfLife: {
            start: new Date(2022, 3, 14),
            end: new Date(2022, 4, 16),
          },
        },
        {
          subjectId: 'M14',
          start: 14.5,
          end: 18.5,
          shelfLife: {
            start: new Date(2022, 2, 28),
            end: new Date(2022, 6, 4),
          },
        },
      ],
    },
    {
      index: 5,
      sessions: [
        {
          subjectId: 'M15-1',
          start: 8.5,
          end: 10.5,
          shelfLife: {
            start: new Date(2022, 3, 14),
            end: new Date(2022, 6, 4),
          },
        },
        {
          subjectId: 'M15-2',
          start: 10.5,
          end: 12.5,
          shelfLife: {
            start: new Date(2022, 3, 14),
            end: new Date(2022, 6, 4),
          },
        },
        {
          subjectId: 'M11-2',
          start: 14.5,
          end: 18.5,
          shelfLife: {
            start: new Date(2022, 2, 28),
            end: new Date(2022, 4, 23),
          },
        },
      ],
    },
  ],
}
