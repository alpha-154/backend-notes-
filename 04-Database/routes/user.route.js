import express from "express"

import { handleGetAllUsers, 
         handleGetUserById, 
         handleUpdateUserById,
         handleDeleteUserById,
         handleCreateNewUser
        } 
 from  "../controllers/user.controllers.js";

// Initialize the router correctly
const router = express.Router();

// Server-side rendering for browsers
// router.get('/users', async (req, res) => {
//     const dbUsers =  await User.find({})
//     const html = `
//       <ul>
//         ${dbUsers.map((user) => `<li>${user.firstName}-${user.email}</li>`).join('')}
//       </ul>
//     `;
//     return res.send(html);
//   });
  
  // REST APIs
  router.route("/")
        .get(handleGetAllUsers)
        .post(handleCreateNewUser)
  
  // Combined route for GET, PATCH, and DELETE
  router.route('/:id')
        .get( handleGetUserById )
        .patch( handleUpdateUserById )
        .delete( handleDeleteUserById );
  
  // Error handling middleware
  router.use((err, req, res, next) => {
    console.error('Unhandled error: ', err);
    res.status(500).json({ msg: 'Internal Server Error' });
  });

  export { router }