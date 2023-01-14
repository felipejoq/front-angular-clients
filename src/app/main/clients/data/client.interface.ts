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
    lastname: 'Jofre',
    email: 'felipe@test.test',
    createAt: date,
  },  {
    id: 2,
    name: 'Andres',
    lastname: 'Guzman',
    email: 'andres@test.test',
    createAt: date,
  }, {
    id: 3,
    name: 'Lorena',
    lastname: 'Ramirez',
    email: 'lorena@test.test',
    createAt: date,
  }, {
    id: 4,
    name: 'Andrea',
    lastname: 'Robles',
    email: 'andrea@test.test',
    createAt: date,
  }, {
    id: 5,
    name: 'Hugo',
    lastname: 'Jara',
    email: 'hugo@test.test',
    createAt: date,
  },
]
