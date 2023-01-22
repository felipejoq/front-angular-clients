import { Pipe, PipeTransform } from '@angular/core';
import {getFlagHelper} from "../helpers/getflag.helper";

@Pipe({
  name: 'getFlag'
})
export class GetFlagPipe implements PipeTransform {

  transform(code): unknown {
    return getFlagHelper(code);
  }



}
