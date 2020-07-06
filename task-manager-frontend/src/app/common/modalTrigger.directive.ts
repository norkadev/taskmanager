import { Directive, OnInit, ElementRef, Inject, Input } from '@angular/core'
declare var $: any;

@Directive({
  selector: '[modal-trigger]'
})
export class ModalTriggerDirective implements OnInit{

  private domElement: HTMLElement;
  @Input('modal-trigger') modalIdentifier: string;

  constructor(ref: ElementRef){
    this.domElement = ref.nativeElement;
   }

  ngOnInit(): void {
    this.domElement.addEventListener('click', e => {
      $(`#${this.modalIdentifier}`).modal({});
    });
  }

}
