import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { CurrencyConverterComponent } from './components/currency-converter/currency-converter.component';
import { ConversionRatesService } from './services/conversion-rates/conversion-rates.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyInputDirective } from './directives/currency-input.directive';

@NgModule({
  declarations: [
    AppComponent,
    CurrencyConverterComponent,
    CurrencyInputDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ConversionRatesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
