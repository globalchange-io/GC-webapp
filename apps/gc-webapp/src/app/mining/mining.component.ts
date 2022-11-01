import { Component, OnInit } from '@angular/core';
import * as core from '@globalchange/core'

@Component({
  selector: 'gc-webapp-mining',
  templateUrl: './mining.component.html',
  styleUrls: ['./mining.component.scss'],
})
export class MiningComponent implements OnInit {
  ngOnInit(): void {core.globalchangeCore()}
  
  onSubmit() {
    alert('Thanks for submitting! Data: ');
  }
}
