import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorService } from 'src/app/services/error.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrls: ['../error-modal/error-modal.component.css'],
  providers: [NgbActiveModal]
})
export class SuccessModalComponent {
  

  @Input() successMessage: string = '';
  
  constructor(public activeModal: NgbActiveModal,private errorService: ErrorService, private router: Router) {}

  closeModal(){
    this.errorService.closeErrorModal();
  }
}
