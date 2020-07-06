import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { ITask } from '../model/ITask';
import { TaskService } from '../service/task.service';
import { NgbDateStruct, NgbDatepicker  } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from '../common/notification.service';

@Component({
  selector: 'edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  @Input() currentTask: ITask;
  @Output() cancelEditTask = new EventEmitter();
  @Output() saveEditedTask = new EventEmitter();

  editedTask: ITask;
  model: NgbDateStruct;
  mouseOverSaveButton: boolean = false;
  dueDate: Date;
  priority: string;
  priorities = [
    {id: 'Alta', text: 'Alta'},
    {id: 'Media', text: 'Media'},
    {id: 'Baja', text: 'Baja'}
  ];

  constructor(
    private taskService: TaskService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.editedTask = { ...this.currentTask };
    this.dueDate = new Date(this.editedTask.dueDate);
    this.priority = this.editedTask.priority;
    this.model = {
      year: this.dueDate.getFullYear(),
      month: +this.dueDate.getMonth + 1,
      day: this.dueDate.getDay()
    }
  }


  save(){
    this.editedTask.priority = this.priority[0];
    this.editedTask.dueDate = new Date(this.model.year+"/"+this.model.month+"/"+this.model.day);

    this.taskService.editTask(this.editedTask).subscribe(
      res => {
        this.saveEditedTask.emit(this.editedTask);
        this.notificationService.showSuccess("Task successfully updated", "Success!");
      },
      err => {
        this.notificationService.showError("An error has ocurred", "Error");
      }
    );
  }

  cancel(){
    this.cancelEditTask.emit();
  }

}
