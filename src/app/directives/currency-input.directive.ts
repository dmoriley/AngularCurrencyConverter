import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[currencyInput]'
})
export class CurrencyInputDirective {

  private regex = /^\d{1,}(\.\d{0,2})?$/;

  constructor(private el: ElementRef) { }

  @HostListener('keydown',['$event']) onKeyDown($e: KeyboardEvent) {
    let value: string = (this.el.nativeElement.value as string).concat($e.key);
    console.log(value);

      // if(value.match(/^\d{1,}(\.\d{0,6})?$/)) {
      if(value.match(this.regex)) {
        return;
        //backspace, tab, enter, shift
      } else if([8,9,13,16].indexOf($e.keyCode) !== -1) {
        return;
        //ctrl + a | c | v | x
      } else if ($e.ctrlKey === true && [65,67,86,88].indexOf($e.keyCode) !== -1) {
        return;
      } else {
        $e.preventDefault();
      }
  }

  @HostListener('paste', ['$event']) onPaste($e: ClipboardEvent) {
    let value: string = (this.el.nativeElement.value as string).concat($e.clipboardData.getData('text/plain'));
    if(value.match(this.regex)) {
      return;
    }
    $e.preventDefault();
  }

}


