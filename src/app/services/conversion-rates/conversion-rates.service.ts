import { Injectable } from '@angular/core';

@Injectable()
export class ConversionRatesService {

  constructor() { }

  getAllConversionData() {
    let rates = {};
    return this.getConversionData({base:'CAD',targets:['USD','EUR']})
            .then(res => {
                Object.assign(rates,res); //assign the conversion values for that base to the rates object
                return this.getConversionData({base:'USD',targets:['CAD','EUR']}); //get next base values
            }).then(res => {
                Object.assign(rates,res); //assign the conversion values for that base to the rates object
                return this.getConversionData({base:'EUR',targets:['USD','CAD']});
            }).then(res => {
                Object.assign(rates,res); //assign the conversion values for that base to the rates object
                return Promise.resolve(rates); //return the rate finished rate object
            }).catch(err => {
                return Promise.reject(err);
            });

  }

  async getConversionRates(currencies: Array<String> = ['CAD','USD','EUR']): Promise<{}> {
    const rates = await currencies.reduce(async (prevPromise, i) => {
      const prev = await prevPromise;
      const query = {base: i, targets: currencies.filter(j => j !== i)};
      const data = await this.getConversionData(query);
      return Object.assign(prev, data);
    }, Promise.resolve({}) );
    
    /* other options
      const rates = {}; //in parallel
      await Promise.all(currencies.map(async (i) => {
        const query = {base: i, targets: currencies.filter(j => j !== i)};
        const test = await this.getConversionData(query);
        Object.assign(rates,test);
      }));	
      
      const rates = {}; //in sequence
      for(let i of currencies) {
        const query = {base: i, targets: currencies.filter(j => j !== i)};
        const data = await this.getConversionData(query);
        Object.assign(rates,data);
      }
    */
    if(Object.keys(rates).length !== 0) {
      return Promise.resolve(rates);
    }
    return Promise.reject({});
  }

  getConversionData({base, targets}) : Promise<{}> {
      return fetch(`https://api.fixer.io/latest?base=${base}&symbols=${targets.toString()}`)
              .then(response => response.json()) //takes response stream and resolves to a string
              .then(responseText => {
                  responseText.rates[base] = 1; //setup 1 to 1 conversion
                  return Promise.resolve({[base]: responseText.rates});
              }).catch(err => {
                console.log();
                  return Promise.reject({});
              });
  }


}
