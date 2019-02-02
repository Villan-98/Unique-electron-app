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
const unit=db.define('unit',{
    id:{
        primaryKey:true,
        type:datatype.INTEGER,
        autoIncrement: true
    },
    unitName:{
        type:datatype.STRING,
        allowNull:false
    }
})
const item=db.define('item',{
    id:{
        primaryKey:true,
        type:datatype.INTEGER,
        autoIncrement: true
    },
    itemName:{
        type:datatype.STRING,
        allowNull:false
    }
})
const invoiceDetail=db.define('invoiceDetail',{
    id:{
       primaryKey:true,
       type:datatype.INTEGER 
    },
    remark:{
        type:datatype.STRING
    },
    gstTotal:{
        type:datatype.FLOAT,
        allowNull:false
    },
    totalAmount:{
        type:datatype.FLOAT,
        allowNull:false
    },
    invoiceDate:{
        type:datatype.DATEONLY
    }
},{timestamps:false})
const invoiceDiscription=db.define('invoiceDiscription',{
    id:{
        type:datatype.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    particular:{
        type:datatype.STRING
    },
    color:{
        type:datatype.INTEGER,
        allowNull:false,
    },
    quantity:{
        allowNull:false,
        type:datatype.INTEGER,
    },
    unit:{
        type:datatype.STRING,
        allowNull:false
    },
    jobType:{
        allowNull:false,
        type:datatype.STRING
    },
    status:{
        type:datatype.STRING,
        allowNull:false,
    },
    rate:{
        type:datatype.FLOAT,
        allowNull:false
    },
    yourChallanNo:{
        type:datatype.STRING,
        allowNull:false
    },
    ourChallanNo:{
        type:datatype.STRING,
        allowNull:false
    },
    amount:{
        type:datatype.FLOAT,
        allowNull:false
    }
},{timestamps:false})
invoiceDetail.belongsTo(party)
invoiceDiscription.belongsTo(invoiceDetail)


db.sync({
    alter:true
})
    .then(()=>{
        console.log("db synced")
    })
module.exports={party,company,unit,item,invoiceDetail,invoiceDiscription,db}