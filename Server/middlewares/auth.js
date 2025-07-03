// import jwt from 'jsonwebtoken';

// const userAuth = (req, res, next) => { 

//     const token = req.header;
//     if (!token) {
//         return res.json({ success: false, message: 'Not Authorized.Login Again' });
//     }
    
//     try{
//         const tokenDecode=jwt.verify(token, process.env.JWT_SECRET);
//         if (tokenDecode.id){
//             req.body.userId = tokenDecode.id;
//         }
//         else{
//             return res.json({ success: false, message: 'Not Authorized.Login Again' });
//         }

//         next();
//     }
//     catch (error) {
//         console.error("Error in userAuth middleware:", error);
//         return res.json({ success: false, message: 'Not Authorized.Login Again' });
//     }



//  }

// export default userAuth;


// import jwt from 'jsonwebtoken';

// const userAuth = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (!token) {
//     return res.json({ success: false, message: 'Not Authorized. Login Again' });
//   }

//   try {
//     const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
//     if (tokenDecode.id) {
//       req.body.userId = tokenDecode.id;
//       next();
//     } else {
//       return res.json({ success: false, message: 'Not Authorized. Login Again' });
//     }
//   } catch (error) {
//     console.error("Error in userAuth middleware:", error);
//     return res.json({ success: false, message: 'Not Authorized. Login Again' });
//   }
// };

// export default userAuth;


import jwt from 'jsonwebtoken';

const userAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not Authorized. Login Again' });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    if (tokenDecode.id) {
      req.user = tokenDecode; // ✅ Use req.user instead of modifying req.body
      next();
    } else {
      return res.status(401).json({ success: false, message: 'Not Authorized. Login Again' });
    }
  } catch (error) {
    console.error("Error in userAuth middleware:", error);
    return res.status(401).json({ success: false, message: 'Not Authorized. Login Again' });
  }
};

export default userAuth;
