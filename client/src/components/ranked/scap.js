db.universityofwisconsinmadisoncampus.find().forEach(function(docs){
    docs.image="https://campusranked.s3.us-east-2.amazonaws.com/universityofwisconsinmadison/"+docs.category+"/"+(docs.name.toLowerCase().replace(/\s/g,'')+".jpg");
    db.universityofwisconsinmadisoncampus.save(docs);
})