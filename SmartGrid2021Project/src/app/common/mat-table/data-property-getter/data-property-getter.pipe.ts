import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { defaultMiterLimit } from 'ol/render/canvas';

@Pipe({
  name: 'dataPropertyGetter'
})
export class DataPropertyGetterPipe implements PipeTransform {

  transform(object: any, keyName: string, ...args: unknown[]): unknown {
    if(object[keyName] instanceof Date){
        return formatDate(object[keyName],"dd.MMM.yyyy","en-us");
    }

    return object[keyName];

  }
}
