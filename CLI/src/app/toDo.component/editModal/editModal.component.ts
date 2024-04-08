import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ErrorService } from 'src/app/services/error.service';
import { Task } from 'src/app/models/task.model';
import { OperationsService } from 'src/app/services/operations.service';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './editModal.component.html',
  /*styleUrls: ['src\app\shared\error-modal\error-modal.component.css'],*/
  providers: [NgbActiveModal],
})

export class EditModalComponent {
  
    @Input() taskToEdit!: Task;

    newActivityName!: string;

    modalRef: NgbModalRef | null = null;

  
  constructor(public activeModal: NgbActiveModal,
              private errorService: ErrorService, 
              private operationsService: OperationsService,
              private modalService: NgbModal) {}

 
  saveChanges(taskToEdit: Task){
    this.taskToEdit.activityName = this.newActivityName;
    this.operationsService.editTask(taskToEdit).subscribe({
        next: () => {
            this.closeModal();
            this.errorService.openSuccessModal("task updated succesfully");
            },
          error: (error) => {
            this.errorService.openErrorModal(error.message)
          }
    })
  }

  closeModal(){
    this.modalService.dismissAll()
  }
}
