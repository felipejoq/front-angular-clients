import {Country} from "../../country/classes/Country";

export class Client {
  id: number | undefined;
  name: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  imgUrl: string;
  country: Country;
  createAt: Date;
}
