import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appScrollToBottom]'
})
export class ScrollToBottomDirective implements OnInit {


  constructor(private element: ElementRef) { }


  ngOnInit() {
    console.log(this.element);
  }

}
