import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['../error-modal/error-modal.component.css'],
  providers: [NgbActiveModal]
})
export class InfoModalComponent {
  

  @Input() infoMessage: string = '';
  
  constructor(public activeModal: NgbActiveModal,private errorService: ErrorService) {}

  closeModal(){
    this.errorService.closeErrorModal();
  }
}
