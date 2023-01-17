import {Client} from "../classes/Client";

let date = new Date(Date.UTC(2023, 0, 14)).toLocaleDateString('es', {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

export const CLIENTES: Client[] = [
  {
    id: 1, name: 'Felipe',
    lastName: 'Jofre',
    email: 'felipe@test.test',
    createAt: date,
  },  {
    id: 2,
    name: 'Andres',
    lastName: 'Guzman',
    email: 'andres@test.test',
    createAt: date,
  }, {
    id: 3,
    name: 'Lorena',
    lastName: 'Ramirez',
    email: 'lorena@test.test',
    createAt: date,
  }, {
    id: 4,
    name: 'Andrea',
    lastName: 'Robles',
    email: 'andrea@test.test',
    createAt: date,
  }, {
    id: 5,
    name: 'Hugo',
    lastName: 'Jara',
    email: 'hugo@test.test',
    createAt: date,
  },
]
