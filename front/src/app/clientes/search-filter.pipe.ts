import { Pipe, PipeTransform } from '@angular/core';
import { Cliente } from '../Models/cliente.model';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(list: any[], filterText: string): Cliente[] {
    if(list[0] != undefined){
      return list ? list.filter(item => item.apellido1.search(new RegExp(filterText, 'i')) > -1) : [];
    }
    return null;
  }

}
