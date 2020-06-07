module.exports = function(app,mongoose){

    //update image address to amazon bucket
    app.get("/api/updateImage/:category/:title",function(req,res){
        const title = req.params.title;
        const category = req.params.category;
        let itemSchema = new mongoose.Schema({
            rank: Number,
            image: String,
            name: String,
            title: String,
            count: Number,
            category: String,
            ratings: Object,
            reviews: Array
        });
        let Item;
        try {
            Item = mongoose.model(title);
        } catch (error) {
            Item = new mongoose.model(title, itemSchema);
        }
        Item.find({},function(err,data){
            data.forEach(element => {
                let tempName = element.name.toLowerCase().replace(/\s/g, "").replace(/'/g, "");
                let address = "https://campusranked.s3.us-east-2.amazonaws.com/uwmadison/"+category+"/"+tempName+".jpg";
                Item.findOneAndUpdate({name: element.name},{
                    image : address
                },{strict:false},function(err,data){
                    console.log(data);
                })
            });
        })
        
    })






    //update category and title 
    app.get("/api/update/:category/:title",function(req,res){
        const title = req.params.title;
        const category = req.params.category;
        let itemSchema = new mongoose.Schema({
            rank: Number,
            image: String,
            name: String,
            title: String,
            count: Number,
            category: String,
            ratings: Object,
            reviews: Array
        });
        let Item;
        try {
            Item = mongoose.model(title);
        } catch (error) {
            Item = new mongoose.model(title, itemSchema);
        }
        Item.find({},function(err,data){
            data.forEach(element => {
                Item.findOneAndUpdate({name: element.name},{
                    title: title,
                    category: category
                },{strict:false},function(err,data){
                    console.log(data);
                })
            });
        })
        
    })
}