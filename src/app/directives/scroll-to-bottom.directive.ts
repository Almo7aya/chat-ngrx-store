import { Directive, ElementRef, AfterViewChecked } from '@angular/core';

@Directive({
  selector: '[appScrollToBottom]'
})
export class ScrollToBottomDirective implements AfterViewChecked {


  constructor(private element: ElementRef) { }

  ngAfterViewChecked() {
    (<HTMLUListElement>this.element.nativeElement).scrollTo(0, 999999);
  }

}
