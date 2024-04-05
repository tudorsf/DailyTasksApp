
import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ToDo } from "../models/toDo.model";
import { OperationsService } from "../services/operations.service";

@Component({
    selector: 'toDo-component',
    templateUrl: './toDo.component.html',
    styleUrls: ['./toDo.component.css']
  })

export class ToDoComponent implements OnInit{

  todayDate = new Date();

  tasks!: ToDo;

  constructor(private datePipe: DatePipe,
              private operations: OperationsService) {}

  ngOnInit(): void {
    const formattedDate = this.datePipe.transform(this.todayDate, 'ddMMyyyy');
    console.log(formattedDate);

    this.operations.getTasks(parseFloat(formattedDate!)).subscribe((data: any) => {
      
        
            this.tasks = data;
            console.log(this.tasks)
          }
    )
   
    

  }


  
}