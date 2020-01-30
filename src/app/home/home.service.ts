import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { RestService } from '../util/rest.service';


@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private rest: RestService) { }

  getTopics(){
    return this.rest.get('assets/json/data/tree.json').then((res:any) => <TreeNode[]> res.data);
  }

}
