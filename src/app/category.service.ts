import { AngularFireDatabase } from "angularfire2/database";
import { Injectable } from "@angular/core";

@Injectable()
export class CategoryService {
  constructor(private db: AngularFireDatabase) {
    this.db
      .list("/categories")
      .auditTrail()
      .subscribe(e => console.log(e));
  }

  getCategories() {
    return this.db
      .list("/categories", ref => ref.orderByChild('name'))
      .snapshotChanges();
  }
}
