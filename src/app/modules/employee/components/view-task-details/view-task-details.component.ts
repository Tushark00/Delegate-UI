import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/modules/admin/services/admin.service';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-view-task-details',
  templateUrl: './view-task-details.component.html',
  styleUrls: ['./view-task-details.component.scss']
})
export class ViewTaskDetailsComponent {

  
  taskId: number=this.activatedRoute.snapshot.params["id"];
  taskData :any;
  comments :any;
  commentForm!: FormGroup;
  // userId=number=this.userId.getUserId()

  constructor(private service:EmployeeService,
    private activatedRoute:ActivatedRoute,
    private fb:FormBuilder ,
    private snackbar:MatSnackBar,
  ) {}

  ngOnInit(){
    this.getTaskById();
    this.getComments();
    this.commentForm=this.fb.group({
      content:[null,Validators.required]
    })
  }

  getTaskById(){
    this.service.getTaskById(this.taskId).subscribe((res)=>{
      this.taskData=res;
    })
  }

  getComments(){
    this.service.getCommentsByTask(this.taskId).subscribe((res)=>{
      this.comments=res;
    })
  }

  publishComment(){
    this.service.createComment(this.taskId,this.commentForm.get("content")?.value).subscribe((res)=>{
      if(res.id!=null){
        this.snackbar.open("Comment Posted Successfully","close",{duration:5000});
        this.getComments();
      }else{
        this.snackbar.open("Something went Wrong","close",{duration:5000});
      }
    })

  }

}
