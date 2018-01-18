import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "extract"
})
export class ExtractPipe implements PipeTransform {
  transform(value: any, property: string): string {
    let parsed = null;
    try {
      parsed = JSON.parse(value);
      for (const key of Object.keys(parsed)) {
        if (key.trim().toLowerCase() === property.trim().toLowerCase()) {
          return parsed[key];
        }
      }
      return "";
    } catch (e) {
      return "error";
    }
  }
}
