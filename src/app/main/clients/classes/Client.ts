import {Country} from "../../country/classes/Country";
import {getFlagHelper} from "../../../helpers/getflag.helper";

export class Client {
  id: number | undefined;
  name: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  imgUrl: string;
  country: Country;
  createAt: Date;
}
