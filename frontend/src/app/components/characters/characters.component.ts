import { Component, OnInit } from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import { CharactersService } from './characters.service';
import { Character } from 'src/app/model/character';
@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  providers: [ CharactersService ],
  styleUrls: ['./characters.component.sass']
})
export class CharactersComponent implements OnInit {

  personnages : Character[];
  meta : any ;

  // MatPaginator Inputs
  length = 100;
  pageSize = 25;
  pageSizeOptions: number[] = [25, 50];
  offset = 0;

  // MatPaginator Output
  pageEvent: PageEvent;

  constructor(private api : CharactersService) { }

  ngOnInit() {
    this.pageEvent = new PageEvent();
    this.pageEvent.pageSize = this.pageSize;
    this.pageEvent.length = this.length;
    this.getServerData(this.pageEvent);
  }

  public getServerData(event?:PageEvent){
    this.offset = event.pageSize * event.pageIndex;
    this.pageSize = event.pageSize;
    // call API
    this.api.getCharacters(this.offset,this.pageSize).subscribe(

      resp => {
        this.personnages = resp.data;
        this.meta = resp.meta ;
        this.length = this.meta.total;
      }
    );

    return event;
  }

  getImage (pers: Character) : string {
    return pers.thumbnail.path + '.' + pers.thumbnail.extension;
  }

}
