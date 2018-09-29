import { Component, OnInit } from '@angular/core';
import { Pastebin } from '../pastebin/pastebin';
import { PastebinService } from '../pastebin.service';

@Component({
  selector: 'app-pastebin',
  templateUrl: './pastebin.component.html',
  styleUrls: ['./pastebin.component.css']
})
export class PastebinComponent implements OnInit {

  title = 'Pastebin Application';
  pastebin: any = [];

  constructor(public pastebinServ: PastebinService) { }


 // loadPastebin() is called on init
  ngOnInit() {
      this.loadPastebin();
  }

  public loadPastebin() {
     // invokes pastebin service's getPastebin() method and stores the response in `pastebin` property
     this.pastebinServ.getPastebin().then(pastebin => this.pastebin = pastebin);

  }
}
