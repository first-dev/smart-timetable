import { Subject } from '@models'
import { Timetable } from '@models/Timetable'
import uuid from 'react-native-uuid'
import { Colors } from 'react-native-paper'

export const emptyTimetable: Timetable<'dynamic'> = {
  title: '',
  id: 'S2',
  sessions: [],
}

export const myTimetable: Timetable<'dynamic'> = {
  title: 'Second semester',
  id: 'S2',
  sessions: [
    {
      dayIndex: 1,
      subjectId: 'M11-1',
      start: 8.5,
      end: 12.5,
      shelfLife: {
        start: null,
        end: null,
      },
    },
    {
      dayIndex: 1,
      subjectId: 'M12-1',
      start: 14.5,
      end: 18.5,
      shelfLife: {
        start: null,
        end: null,
      },
    },
  ].map(session => ({ ...session, id: uuid.v4() })),
}

export const myTimetable2: Timetable<'dynamic'> = {
  title: 'First semester',
  id: 'S1',
  sessions: [
    {
      dayIndex: 1,
      subjectId: 'M16-1',
      start: 8.5,
      end: 10.5,
      shelfLife: {
        start: null,
        end: null,
      },
    },
    {
      dayIndex: 1,
      subjectId: 'M16-2',
      start: 14.5,
      end: 16.5,
      shelfLife: {
        start: null,
        end: null,
      },
    },
  ].map(session => ({ ...session, id: uuid.v4() })),
}

export const mySubjects: Subject[] = [
  {
    id: 'M11-1',
    name: 'CAO',
    room: 'Salle1',
    color: Colors.purple500,
    teacher: 'Y. FARHANE',
  },
  {
    id: 'M12-1',
    name: 'Circuits reprogrammables',
    room: 'Salle1',
    color: Colors.red500,
    teacher: 'A. MANSOURI',
  },
  {
    id: 'M12-2',
    name: 'Conception des C.I par langage VHDL',
    room: 'Salle1',
    color: Colors.cyan500,
    teacher: 'A. MANSOURI',
  },
  {
    id: 'M9',
    name: 'Recherche opérationnelle',
    room: 'Salle1',
    color: Colors.indigoA400,
    teacher: 'S. ELHAJ-BEN-ALI',
  },
  {
    id: 'M16-1',
    name: 'Anglais',
    room: 'Salle1',
    color: Colors.teal500,
    teacher: 'DAHBI',
  },
  {
    id: 'M16-2',
    name: 'TEC2',
    room: 'Salle1',
    color: Colors.brown500,
    teacher: 'KHADIJA ALAOUI',
  },
  {
    id: 'M13-1',
    name: 'Microcontrôleur avancé',
    room: 'Salle1',
    color: Colors.redA400,
    teacher: 'A. MANSOURI',
  },
  {
    id: 'M13-2',
    name: 'Automate programmable API',
    room: 'Salle1',
    color: Colors.blue500,
    teacher: 'A.ELBDOURI',
  },
  {
    id: 'M10-1',
    name: "Système d'Information : Conception des systèmes d'information",
    room: 'Salle1',
    color: Colors.pinkA400,
    teacher: 'L. OUGHDIR',
  },
  {
    id: 'M10-2',
    name: "Système d'Information : Bases de données",
    room: 'Salle1',
    color: Colors.lightGreenA400,
    teacher: 'A.BOULAALAM',
  },
  {
    id: 'M14',
    name: 'JAVA, API',
    room: 'Salle1',
    color: Colors.deepPurpleA400,
    teacher: 'Y. KHAMLICHI',
  },
  {
    id: 'M15-1',
    name: 'Gestion comptable',
    room: 'Salle1',
    color: Colors.deepOrangeA400,
    teacher: 'BOULAICH',
  },
  {
    id: 'M15-2',
    name: 'Droit des sociétés',
    room: 'Salle1',
    color: Colors.lightBlue500,
    teacher: 'BOULAICH',
  },
  {
    id: 'M11-2',
    name: 'Traitement du Signal',
    room: 'Salle1',
    color: Colors.orangeA400,
    teacher: 'H.BELKBIR',
  },
]

// export const myTimetable: Timetable<'dynamic'> = {
//   name: 'S2',
//   baseDate: new Date(2022, 1, 28),
//   days: [
//     {
//       index: 1,
//       sessions: [
//         {
//           subjectId: 'M11-1',
//           start: 8.5,
//           end: 12.5,
//           shelfLife: {
//             start: 1,
//             end: 1,
//           },
//         },
//         {
//           subjectId: 'M11-1',
//           start: 8.5,
//           end: 12.5,
//           shelfLife: {
//             start: 2,
//             end: 9,
//           },
//         },
//         {
//           subjectId: 'M12-1',
//           start: 14.5,
//           end: 18.5,
//           shelfLife: {
//             start: 1,
//             end: 4,
//           },
//         },
//         {
//           subjectId: 'M12-2',
//           start: 14.5,
//           end: 18.5,
//           shelfLife: {
//             start: 5,
//             end: 10,
//           },
//         },
//       ],
//     },
//     {
//       index: 2,
//       sessions: [
//         {
//           subjectId: 'M9',
//           start: 8.5,
//           end: 12.5,
//           shelfLife: {
//             start: 1,
//             end: 13,
//           },
//         },
//         {
//           subjectId: 'M16-1',
//           start: 14.5,
//           end: 16.5,
//           shelfLife: {
//             start: 1,
//             end: 13,
//           },
//         },
//         {
//           subjectId: 'M16-2',
//           start: 16.5,
//           end: 18.5,
//           shelfLife: {
//             start: 1,
//             end: 13,
//           },
//         },
//       ],
//     },
//     {
//       index: 3,
//       sessions: [
//         {
//           subjectId: 'M13-1',
//           start: 8.5,
//           end: 12.5,
//           shelfLife: {
//             start: 1,
//             end: 3,
//           },
//         },
//         {
//           subjectId: 'M13-2',
//           start: 8.5,
//           end: 12.5,
//           shelfLife: {
//             start: 4,
//             end: 7,
//           },
//         },
//         {
//           subjectId: 'M10-1',
//           start: 14.5,
//           end: 18.5,
//           shelfLife: {
//             start: 1,
//             end: 5,
//           },
//         },
//       ],
//     },
//     {
//       index: 4,
//       sessions: [
//         {
//           subjectId: 'M10-2',
//           start: 8.5,
//           end: 12.5,
//           shelfLife: {
//             start: 3,
//             end: 7,
//           },
//         },
//         {
//           subjectId: 'M14',
//           start: 14.5,
//           end: 18.5,
//           shelfLife: {
//             start: 1,
//             end: 13,
//           },
//         },
//       ],
//     },
//     {
//       index: 5,
//       sessions: [
//         {
//           subjectId: 'M15-1',
//           start: 8.5,
//           end: 10.5,
//           shelfLife: {
//             start: 3,
//             end: 13,
//           },
//         },
//         {
//           subjectId: 'M15-2',
//           start: 10.5,
//           end: 12.5,
//           shelfLife: {
//             start: 3,
//             end: 13,
//           },
//         },
//         {
//           subjectId: 'M11-2',
//           start: 14.5,
//           end: 18.5,
//           shelfLife: {
//             start: 1,
//             end: 8,
//           },
//         },
//       ],
//     },
//   ],
// }

// export const myTimetable: Timetable<'dynamic'> = {
//   id: 'S2',
//   days: [
//     {
//       index: 1,
//       sessions: [
//         {
//           subjectId: 'M11-1',
//           start: 8.5,
//           end: 12.5,
//           shelfLife: {
//             start: new Date(2022, 1, 28),
//             end: new Date(2022, 3, 25),
//           },
//         },
//         {
//           subjectId: 'M12-1',
//           start: 14.5,
//           end: 18.5,
//           shelfLife: {
//             start: new Date(2022, 1, 28),
//             end: new Date(2022, 2, 26),
//           },
//         },
//         {
//           subjectId: 'M12-2',
//           start: 14.5,
//           end: 18.5,
//           shelfLife: {
//             start: new Date(2022, 3, 2),
//             end: new Date(2022, 4, 14),
//           },
//         },
//       ],
//     },
//     {
//       index: 2,
//       sessions: [
//         {
//           subjectId: 'M9',
//           start: 8.5,
//           end: 12.5,
//           shelfLife: {
//             start: new Date(2022, 1, 28),
//             end: new Date(2022, 5, 4),
//           },
//         },
//         {
//           subjectId: 'M16-1',
//           start: 14.5,
//           end: 16.5,
//           shelfLife: {
//             start: new Date(2022, 1, 28),
//             end: new Date(2022, 5, 4),
//           },
//         },
//         {
//           subjectId: 'M16-2',
//           start: 16.5,
//           end: 18.5,
//           shelfLife: {
//             start: new Date(2022, 1, 28),
//             end: new Date(2022, 5, 4),
//           },
//         },
//       ],
//     },
//     {
//       index: 3,
//       sessions: [
//         {
//           subjectId: 'M13-1',
//           start: 8.5,
//           end: 12.5,
//           shelfLife: {
//             start: new Date(2022, 1, 28),
//             end: new Date(2022, 2, 19),
//           },
//         },
//         {
//           subjectId: 'M13-2',
//           start: 8.5,
//           end: 12.5,
//           shelfLife: {
//             start: new Date(2022, 2, 21),
//             end: new Date(2022, 3, 16),
//           },
//         },
//         {
//           subjectId: 'M10-1',
//           start: 14.5,
//           end: 18.5,
//           shelfLife: {
//             start: new Date(2022, 1, 28),
//             end: new Date(2022, 3, 2),
//           },
//         },
//       ],
//     },
//     {
//       index: 4,
//       sessions: [
//         {
//           subjectId: 'M10-2',
//           start: 8.5,
//           end: 12.5,
//           shelfLife: {
//             start: new Date(2022, 2, 14),
//             end: new Date(2022, 3, 16),
//           },
//         },
//         {
//           subjectId: 'M14',
//           start: 14.5,
//           end: 18.5,
//           shelfLife: {
//             start: new Date(2022, 1, 28),
//             end: new Date(2022, 5, 4),
//           },
//         },
//       ],
//     },
//     {
//       index: 5,
//       sessions: [
//         {
//           subjectId: 'M15-1',
//           start: 8.5,
//           end: 10.5,
//           shelfLife: {
//             start: new Date(2022, 2, 14),
//             end: new Date(2022, 5, 4),
//           },
//         },
//         {
//           subjectId: 'M15-2',
//           start: 10.5,
//           end: 12.5,
//           shelfLife: {
//             start: new Date(2022, 2, 14),
//             end: new Date(2022, 5, 4),
//           },
//         },
//         {
//           subjectId: 'M11-2',
//           start: 14.5,
//           end: 18.5,
//           shelfLife: {
//             start: new Date(2022, 1, 28),
//             end: new Date(2022, 3, 23),
//           },
//         },
//       ],
//     },
//   ],
// }
