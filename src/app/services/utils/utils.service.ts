import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';


@Injectable({
  providedIn: 'root'
})
export class UtilsService {

constructor(
  private _snackBar: MatSnackBar,
  private translate: TranslateService
) { }

triggerNotification(message: string, duration?: number) {

  const snackBarRef = this._snackBar.open(message, 'dismiss', {
    duration: duration || 3000,
    horizontalPosition: 'end',
    verticalPosition: 'bottom'
  });

  snackBarRef.onAction().subscribe(() => {
    snackBarRef.dismiss();
  })

}

formatDateString = (date) => {
  return `${new Date(date).toDateString()} ${new Date(date).toLocaleTimeString()}`;
 }

getSubString = (string, a, b) => {
  return string.substring(a,b)
} 

getSubStrings = (string, a) => {
  return string.substring(a)
} 

formatDate(date) {
  let d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) {
    month = "0" + month;
  }
  if (day.length < 2) {
    day = "0" + day;
  }

  return [year, month, day].join("-");

}

deleteKeyIfEmpty(obj: any) {
  for (const o in obj) {
    if (obj[o] == null || obj[o].length == 0) {
      delete obj[o];
    }
  }
}

async translateWords(words:string) {
  const translatedWord = await this.translate.get(words).toPromise();
  return translatedWord;
}

}
