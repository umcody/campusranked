module.exports = function(app,mongoose){
    
    const categories = ["residentialhall","dininghall", "library", "gym"]
    let data = {}

    let itemSchema = new mongoose.Schema({
        rank: Number,
        image: String,
        name: String,
        title: String,
        count: Number,
        category: String,
        ratings: Object,
        reviews: Array,
        reviewCounts:Number,
        tags:Object
    })

    app.get("/api/schoolOverview/:school",function(req,res){
        
        const school = req.params.school.toLowerCase().replace(/\s/g, "").replace(/'/g, "");

        for(let i = 0; i < categories.length ; i++){

            let ItemModel;
            try {
                ItemModel = mongoose.model((school+"campus"));
            } catch (error) {
                ItemModel = mongoose.model((school+"campus"), itemSchema);
            }
            

            ItemModel
                .find({title:(school+categories[i])})
                .sort({count:-1})
                .limit(5)
                .exec(function(err,docs){
                    data[categories[i]] = docs;
                    
                    if(data[categories[i]]!== null && i === (categories.length-1)){
                        console.log(data);
                        res.json(data);
                        console.log("School data sent out.")
                    }
                })
            
        }
        

    })

    
}