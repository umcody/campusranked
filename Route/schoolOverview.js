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
        tags:Object
    })

    app.get("/api/schoolOverview/:school",function(req,res){
        
        const school = req.params.school;

        for(let i = 0; i < categories.length ; i++){

            let ItemModel;
            try {
                ItemModel = mongoose.model((school+categories[i]));
            } catch (error) {
                ItemModel = new mongoose.model((school+categories[i]), itemSchema);
            }
            
            ItemModel
                .find({})
                .sort({count:-1})
                .limit(5)
                .exec(function(err,docs){
                    data[categories[i]] = docs;
                    if(i === categories.length-1){
                        res.json(data);
                        console.log("School data sent out.")
                    }
                })
            
            
            
        }
        

    })

    
}