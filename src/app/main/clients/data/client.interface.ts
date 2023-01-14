import {Client} from "../classes/Client";

export const CLIENTES: Client[] = [
  {
    id: 1, name: 'Felipe', lastname: 'Jofre', email: 'felipe@test.test', createAt: new Date().toLocaleDateString('es')
  },
  {
    id: 2, name: 'Andres', lastname: 'Guzman', email: 'andres@test.test', createAt: new Date().toLocaleDateString('es')
  },
  {
    id: 3, name: 'Lorena', lastname: 'Ramirez', email: 'lorena@test.test', createAt: new Date().toLocaleDateString('es')
  },
]
