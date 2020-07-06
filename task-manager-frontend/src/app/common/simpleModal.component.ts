import { Component, Input, ViewChild, ElementRef, Inject } from '@angular/core';
declare var $: any;

@Component({
  selector: 'simple-modal',
  template:`
  <div id="simple-modal" #modalcontainer class="modal fade" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h6 class="modal-title">{{title}}</h6>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  </div>
  `,
  styles: [`
    .modal-body{ overflow-y: scroll; max-height: 600px; }
    .modal-header{ background-color: #3a3a3a;  	border-bottom: 1px solid #21a2f1;}
    .modal-body{ background-color: #3a3a3a; overflow-y: scroll}
    .modal-title{ color: #21a2f1; }

  `]
})
export class SimpleModalComponent {
  @Input() title: string;
  @ViewChild('modalcontainer', {static: false}) modalContainer: ElementRef;

  constructor(){ }


}
