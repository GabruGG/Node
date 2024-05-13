const mysql = require("mysql");

const db = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "12345678",
    database: "applications",

});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("MySql Connected");
});

exports.getAllResumes = (req,res)=>{
    let sql = "SELECT * from resumes;"
    db.query(sql,(err,result,field)=>{
        if(err){
            throw err;
        }
        console.log(result);
        res.status(200).send(result);
    })
}

exports.addEmployee = (req,res)=>{
    const reqBody = req.body;
    let duplicateEntryQuery =  `select * from resumes where name = '${reqBody.name}';`
    let qry = `insert into resumes(name,email_address,age) values('${reqBody.name}','${reqBody.email}','${reqBody.age}');`
    db.query(duplicateEntryQuery,(err,result,field)=>{
        if(err){
            throw err;
        }
        if(result && result[0]?.name == reqBody.name){ 
            res.json({
            code : 409,
            msg : "Employee name already exists."
        })
        }else{
            db.query(qry,(err,result,field)=>{
                if(err){
                    throw err;
                }
                res.status(200).send({msg : "Record added successfully."});
            });
        }
    })
   
}

exports.removeEmployee = (req,res)=>{
    console.info(req.body);
    let qry = `delete from resumes where name = '${req.body.name}'`;
    db.query(qry,(error,result,fields)=>{
        if(error){
            throw error;
        }
        res.status(200).send({msg :"Successfully removed entry from database."});
    });
}