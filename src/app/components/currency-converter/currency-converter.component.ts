import { ConversionRatesService } from './../../services/conversion-rates/conversion-rates.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css']
})
export class CurrencyConverterComponent implements OnInit {
  private apiDown;
  showDisclaimer;
  currencies = ['CAD', 'USD', 'EUR'];
  rates;
  test;

  form = new FormGroup({
    inputAmount: new FormControl(),
    inputCurrency: new FormControl({}),
    outputAmount: new FormControl({value:'', disabled: true}),
    outputCurrency: new FormControl({})
  });

  constructor(private ratesService: ConversionRatesService) { }

  async ngOnInit() {
    this.apiDown = false;
    this.showDisclaimer = false;
    try {
      this.rates = await this.ratesService.getConversionRates(this.currencies);
    } catch(err) {
      this.apiDown = true;
    }
    this.form.controls['inputCurrency'].setValue('CAD');
    this.form.controls['outputCurrency'].setValue('USD');
  }

  get inputAmount() {
    return this.form.get('inputAmount');
  }

  get outputAmount() {
    return this.form.get('outputAmount');
  }

  get inputCurrency() {
    return this.form.get('inputCurrency');
  }

  get outputCurrency() {
    return this.form.get('outputCurrency');
  }

  private updateConversion() {
    let converted = this.inputAmount.value;

    if(converted) {
      const conversionRate = this.rates[this.inputCurrency.value][this.outputCurrency.value];
      converted = this.calculateConvertedAmount(parseFloat(converted),conversionRate);
      this.outputAmount.setValue(converted);
    } else {
      this.outputAmount.setValue('');
    }
  }

  private calculateConvertedAmount(value: number,rate: number) {
    return (value * rate).toFixed(2);
}

}
