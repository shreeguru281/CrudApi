const {create ,getUser,getUserById,updateUser,deleteUser,getUserByEmail }= require('./userService')
const {genSaltSync,hashSync,compareSync} = require('bcrypt')

const {sign}= require('jsonwebtoken')

module.exports = {
    createUser: (req, res) => {
      const body = req.body;
      const salt = genSaltSync(10);
      body.password = hashSync(body.password, salt);
      create(body, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database connection errror"
          });
        }
        return res.status(200).json({
          success: 1,
          data: results
        });
      });
    },
    userById:(req,res)=>{
        const id = req.params.id;
        getUserById(id , (err,results)=>{
            if(err){
                console.log(err)
                return
            }
            if(!results){
                return res.status(404).json({
                    success: 0,
                    message: "Record not found"
                })
            }
            return res.status(200).json({
                success :1,
                data:results
            })
        })

    },
    getusers:(req,res)=>{

               getUser((err,results)=>{
            if(err){
                console.log(err)
                return
            }
            if(!results){
                return res.status(404).json({
                    success: 0,
                    message: "Record not found"
                })
            }
            return res.status(200).json({
                success :1,
                data:results
            })
        })

    },
    updateUsers:(req,res)=>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(body , (err,results)=>{
            if(err){
                console.log(err)
                return
            }
            
            return res.status(201).json({
                success :1,
                message :"Updated Successfully"
            })
        })

    },
    deleteUser: (req, res) => {
        const data = req.body;
        deleteUser(data, (err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          if (!results) {
            return res.status(404).json({
              success: 0,
              message: "Record Not Found"
            });
          }
          return res.status(201).json({
            success: 1,
            message: "user deleted successfully"
          });
        });
      },
      login:(req,res)=>{
          const body = req.body;
          getUserByEmail(body.email,(err,results)=>{
              if(err){
                  console.log(err);
              }
              if(!results){
                  return res.status(400).json({
                      success:0,
                      data :"Invalid email or password"
                  });
              }
            const result = compareSync(body.password , results.password) 
            if (result){
                results.password= undefined
                const jsontoken = sign({result:results},"qwe1234" , {
                    expiresIn:"1h"
                })
             return res.status(200).json({
                success:1,
                message:"Login Successfully",
                token : jsontoken
            });
        } else{
            return res.status(400).json({
                success:0,
                data :"Invalid email or password"
            });
        }
          });
      }
    
}