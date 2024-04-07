import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ErrorModalComponent } from '../shared/error-modal/error-modal.component';
import { InfoModalComponent } from '../shared/info-modal/info-modal.component';
import { SuccessModalComponent } from '../shared/success-modal/success-modal.component';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {

  private modalRef: NgbModalRef | null = null;

  constructor(private modalService: NgbModal) {}

  openErrorModal(errorMessage: string): void {
    this.modalRef = this.modalService.open(ErrorModalComponent, { centered: true });
    this.modalRef.componentInstance.errorMessage = errorMessage;
  }

  closeErrorModal(): void {
     if (this.modalRef) {
      console.log(this.modalRef!.componentInstance.errorMessage);
      this.modalRef.close('Manually closed');
      this.modalRef = null; 

    }


  }

  openInfoModal(infoMessage: string): void {
    this.modalRef = this.modalService.open(InfoModalComponent, { centered: true });
    this.modalRef.componentInstance.infoMessage = infoMessage;
  }

  openSuccessModal(successMessage: string): void {
    this.modalRef = this.modalService.open(SuccessModalComponent, { centered: true });
    this.modalRef.componentInstance.successMessage = successMessage;
  }


 


}
