/******************************************************************************
 *  @Purpose        : Method is used to generate tokens
 *  @file           : token.js        
 *  @author         : KAMALAKSHI C SWAMY
 *  @since          : 07-02-2019
 ******************************************************************************/
const jwt = require('jsonwebtoken');
module.exports = {
    /**
 * importing token 
 */

    GenerateTokenResetPassword(payload){
        const token = jwt.sign({payload},'secretkey',{expiresIn :'100d'})
        const obj = {
            success : true,
            message : 'Token is generated successfully',
            token : token
        }
        return obj;
    },
    GenerateTokenAuth(payload) {
        const token = jwt.sign({   payload  }, 'secretkey-auth', {
            expiresIn: '100d'
        })
        const obj = {
            status: true,
            message: 'Token Generated Successfully!!',
            token: token
        }
        return obj;
    }
   
}