import { AngularFireDatabase } from "angularfire2/database";
import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";

@Injectable()
export class CategoryService {
  constructor(private db: AngularFireDatabase) {
    // this.db
    //   .list("/categories")
    //   .auditTrail()
    //   .subscribe(e => console.log(e));
  }

  getAll() {
    return this.db
      .list("/categories")
      .snapshotChanges()
      .map(categories => {
        return categories
          .map(c => {
            const obj = JSON.parse(JSON.stringify(c));
            return {
              key: obj.key,
              name: obj.payload.name
            };
          })
          .sort(x => x.name );
      });
  }
}
