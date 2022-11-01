import { Component, Inject, OnInit } from '@angular/core';
import * as core from '@globalchange/core';

@Component({
  selector: 'gc-webapp-mining',
  templateUrl: './mining.component.html',
  styleUrls: ['./mining.component.scss'],
})
export class MiningComponent implements OnInit {

  constructor(@Inject("GLOBAL_CHANGE_CORE_SERVICE") public gcCore: core.GCCoreService) {
  }

  ngOnInit(): void {
    this.gcCore.startup()
  }
  
  onSubmit() {
    alert('Thanks for submitting! Data: ');
  }
}
