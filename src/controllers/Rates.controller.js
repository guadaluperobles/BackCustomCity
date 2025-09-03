import Rates from '../models/Rates.model.js'

const index = async (req, res) => {
  const {id} = req.query;
  try{
    if(id && id.length > 23){
      const model = await Rates.findById(id.toString());
      if(!model) res.status(400).json({message:"Not found"});
      res.json(model);
    }
    const models = await Rates.find({ delete: { $eq: null } });
    res.json({models:models});
  } catch (err){
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const save = async (req, res) => {
  const {_id, name, date,  amount} = req.body;
  try{
    let model = await Rates.findById(_id);
    if(!model){
      const model = new Rates({
        name,
        date,
        amount
      });
      const response = await model.save()
      res.send(response)
    }else{
      model = await Rates.findByIdAndUpdate(
        _id,
        {
          name: name,
          date: date,
          amount: amount
        },
        { new: true }
      );
      res.send(model)
    }
  }catch (err){
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const remove = async (req, res) => {
  const {_id } = req.body;

  try{
    if(_id){
      const model = await Rates.findByIdAndUpdate(
        _id,
        {delete: Date.now},
        { new: true }
      );
      res.status(200).json({message: 'Object deleted', model:model})
    }
    res.status(404).json({message: 'Not found'})

  } catch (err){
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const ratesQuery = async (req, res) => {
    const API_KEY = 'bdad49c80c5f4a80a8405bc437fb4878'; // guárdalo en .env
    const { base = "USD" } = req;

    const url = `https://exchange-rates.abstractapi.com/v1/live/?api_key=${API_KEY}&base=${base}`;

    try {
      const response = await fetch(url);
      const rates = await response.json();

      const object = rates?.exchange_rates;
      for (const key of Object.keys(object)) {
        const model = new Rates({
          name: key,
          amount: object[key]
        });
        const save = await model.save();
        console.log(save)
      }

      res.status(200).json({message: 'Object updated'})
    } catch (error) {
      throw new Error("Error fetching rates: " + error.message);
    }
  }


export {index, save, remove, ratesQuery};