/* created by Villan-98 on 22/Jan/2019*/
const Sequelize=require('sequelize')
const datatype=Sequelize.DataTypes
const dbConfig=require('../config').DB
const db=new Sequelize(dbConfig.name,dbConfig.user,dbConfig.password,{
    dialect:dbConfig.dialect
})
const party=db.define('party',{
    id:{
      allowNull:false,
      primaryKey:true,
      autoIncrement:true,
      type:datatype.INTEGER
    },
    partyName:{
        type: datatype.STRING,
        allowNull:false,
        unique:true,
    },
    partyGst:{
        type:datatype.STRING,
        allowNull:false,
        unique:true
    },
    openingBalance:{
        type:datatype.FLOAT,
        defaultValue:0,
    },
    partyAddress:{
        type:datatype.STRING,
        allowNull:false
    },
    contactNo:{
        type:datatype.BIGINT(12)
    }
})
const company=db.define('company',{
    id:{
      type:datatype.INTEGER,
        primaryKey: true
    },
    companyName:{
        type:datatype.STRING,
        defaultValue: "Ram"
    },
    companyAddress:{
        type:datatype.STRING,
        defaultValue:"Delhi"
    },
    companyGst:{
        type:datatype.STRING,
        defaultValue:"sljdfslk"
    },
    term1:{
        type:datatype.STRING,
    },
    term2:{
        type:datatype.STRING,
    },
    contactNo1:{
        type:datatype.BIGINT(12),
    },
    contactNo2:{
        type:datatype.BIGINT(12)
    },
    password:{
        type:datatype.STRING,

    },
    signatory:{
        type:datatype.STRING,
        defaultValue:"ram"
    },
    remark:{
        type:datatype.STRING,
    },
    gstRate:{
        type:datatype.FLOAT,
        defaultValue:0
    }
},{timestamps:false})
db.sync({})
    .then(()=>{
        console.log("db synced")
    })
module.exports={party,company}