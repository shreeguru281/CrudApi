const { createPoolCluster } = require('mysql');
const pool = require('../../dataBase');


module.exports ={
    create :(data, callBack)=>{
        pool.query('INSERT INTO userDetails(name,email,password) VALUE (?,?,?)',[data.name ,data.email ,data.password],
        (err ,result)=>{
            if(err){
            return  callBack(err)
            }
            return callBack(null,result)
        }
        )
        },
    getUser:callBack =>{
        pool.query('SELECT id , name , email FROM userDetails',[],
        (err , result, fields)=>{
            if (err){
                return callBack(err)
            }
            return callBack(null,result)
        }
        
        )
    },
    getUserById:(id,callBack) =>{
        pool.query('SELECT id , name , email FROM userDetails WHERE id = ?',[id],
        (err , result, fields)=>{
            if (err){
                return callBack(err)
            }
            return callBack(null,result[0])
        }
        
        )
    },
    updateUser:(data,callBack) =>{
        pool.query(`update userDetails set name=?, email=?, password=? where id = ?`,[data.name ,data.email ,data.password,data.id],
        (err , result, fields)=>{
            if (err){
                return callBack(err)
            }
            return callBack(null,result)
        }
        
        )
    },
    deleteUser: (data, callBack) => {
        pool.query(
          `DELETE FROM userDetails WHERE id = ?`,
          [data.id],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results[0]);
          }
        );
      },
      getUserByEmail: (email, callBack) => {
        pool.query(
          `SELECT * FROM userDetails WHERE email = ?`,
          [email],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results[0]);
          }
        );
      }
}