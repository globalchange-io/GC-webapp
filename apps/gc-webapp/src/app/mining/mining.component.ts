import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as core from '@globalchange/core';

@Component({
  selector: 'gc-webapp-mining',
  templateUrl: './mining.component.html',
  styleUrls: ['./mining.component.scss'],
})
export class MiningComponent implements OnInit {
  
  formGroup: FormGroup;
  titleAlert = 'This field is required';

  constructor(@Inject("GLOBAL_CHANGE_CORE_SERVICE") public gcCore: core.GCCoreService, private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      'name': [null, Validators.required],
      'validate': ''
    });
    this.setChangeValidate()
  }

  ngOnInit(): void {
    this.gcCore.startup();
    this.formGroup.value;
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'name': [null, Validators.required],
      'validate': ''
    });
  }

  setChangeValidate() {
    this.formGroup.get('validate')?.valueChanges.subscribe(
      (validate) => {
        if (validate == '1') {
          this.formGroup.get('name')?.setValidators([Validators.required, Validators.minLength(3)]);
          this.titleAlert = "You need to specify at least 3 characters";
        } else {
          this.formGroup.get('name')?.setValidators(Validators.required);
        }
        this.formGroup.get('name')?.updateValueAndValidity();
      }
    )
  }
  
  onSubmit(post: any) {
    alert('Thanks for submitting! Data: ');
  }
}
