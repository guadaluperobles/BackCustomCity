import { MongoDBService } from '@feathersjs/mongodb'
import fetch from "node-fetch";

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
//export class RatesService extends MongoDBService {}

export const getOptions = app => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then(db => db.collection('rates'))
  }
}


export class RatesService extends MongoDBService {

  async create(data, params) {
    const API_KEY = 'bdad49c80c5f4a80a8405bc437fb4878'; // guárdalo en .env
    const { base = "USD" } = data;

    const url = `https://exchange-rates.abstractapi.com/v1/live/?api_key=${API_KEY}&base=${base}`;

    try {
      const res = await fetch(url);
      const rates = await res.json();

      const record = {
        base,
        rates,
        createdAt: new Date(),
      };

      // Ejemplo: si usas Mongo
      const db = this.options.Model;
      const inserted = await db.create(record);

      return inserted;
    } catch (error) {
      throw new Error("Error fetching rates: " + error.message);
    }
  }
}