import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
    pure: false
})

export class FilterPipe implements PipeTransform {
    transform(items: any[], args: any[]): any {
        let percentMin = +(args[0]) ? args[0] : 0;
        let percentMax = +(args[1]) ? args[1] : 0;
        return args ?
            items.filter(item => (item.status <= +percentMax && item.status >= +percentMin))
            : items;
    }
}
