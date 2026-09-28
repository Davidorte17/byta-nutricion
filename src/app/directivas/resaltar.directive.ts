import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appResaltar]'
})
export class ResaltarDirective {
 constructor(private el: ElementRef) {}

 @HostListener('mouseenter') onEnter() {
   this.el.nativeElement.style.backgroundColor = 'cyan';
   this.el.nativeElement.style.cursor = 'pointer';
 }

 @HostListener('mouseleave') onLeave() {
   this.el.nativeElement.style.backgroundColor = null;
 }
}

