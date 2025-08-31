import Invoice from '../models/Invoice.model.js'

const index = async (req, res) => {
  const {id} = req.query;
  try{
    if(id && id.length > 23){
      const model = await Invoice.findById(id.toString());
      if(!model) res.status(400).json({message:"Not found"});
      res.json(model);
    }
    const models = await Invoice.find({ delete: { $eq: null } });
    res.json({models:models});
  } catch (err){
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const save = async (req, res) => {
  const {_id, invoiceNumber, clientName, date, status, amount} = req.body;
  try{
    let model = await Invoice.findById(_id);
    if(!model){
      const model = new Invoice({
        invoiceNumber,
        clientName,
        date,
        status,
        amount
      });
      const response = await model.save()
      res.send(response)
    }else{
      model = await Invoice.findByIdAndUpdate(
        _id,
        {
          clientName: clientName,
          date: date,
          status: status,
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

const clear = async (req, res) => {
  const {_id } = req.body;

  try{
    if(_id){
      const model = await Invoice.findByIdAndUpdate(
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

export {index, save, clear};