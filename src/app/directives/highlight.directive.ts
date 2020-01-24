import { Directive,ElementRef,Renderer2,HostListener } from '@angular/core';
import { hostElement } from '@angular/core/src/render3/instructions';
//hostlistener will listen to mouse movements and other events
// it will be used to highlight the hovered dish in the menu
@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private el : ElementRef, private renderer : Renderer2) { }
  // a listener for the mouse movement (Enter)
  @HostListener('mouseenter') onmouseenter(){
    console.log('the mouse has entered');
    this.renderer.addClass(this.el.nativeElement,'highlight')
  }
  // a listener for the mouse movement(Leave)
  @HostListener('mouseleave') onmouseleave(){
    console.log('the mouse has left');
    this.renderer.removeClass(this.el.nativeElement,'highlight');
  }
}
