const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/exampleApp',{ useNewUrlParser: true });

const Schema = mongoose.Schema;

const catSchema = new Schema ({
  name: String,
  color: String,
  age: Number
})

const Cat = mongoose.model('Cat',catSchema);

function addNewCat(catName) {
  const kitty = new Cat({ name: catName });
  kitty.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log(`meow! ${catName} SAVED.`);
    }
  });
}

function showCats() {
  console.log('All the CATS!');
  Cat.find({}, (err, cats) => {
    cats.forEach((cat)=> {
      console.log(' --> cat: ', cat.name);
    })
  });
}

function addTenCats(){
  for (let i=0; i<10; i++){
    addNewCat(`cat ${i}`);
  }
}

addTenCats();

/* We have to wait for our cats to save before displaying them
 Remember, it's async */
setTimeout(showCats, 1500);
