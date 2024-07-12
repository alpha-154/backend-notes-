import { User } from "../models/user.model.js";

async function handleGetAllUsers(req, res){
    const dbUsers = await User.find({})
    return res.json(dbUsers);
}

async function handleGetUserById(req, res){
    const user = await User.findById(req.params.id) 
     if (!user) return res.status(404).json('User not found');
       return res.json(user);
}

async function handleUpdateUserById(req, res){
    await User.findByIdAndUpdate(req.params.id, { lastName: "changed"})
    return res.json( { status: "Success"})
}

async function handleDeleteUserById(req, res){
    await User.findByIdAndDelete(req.params.id)
    return res.json({status: "Success"})
}


async function handleCreateNewUser(req, res){
    const body = req.body;
    if (!body || !body.first_name || !body.last_name || !body.gender || !body.email || !body.job_title) {
      return res.status(400).json({ msg: 'All fields are required' });
    }
  
    try {
      const user = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title,
      });
  
      console.log('user: ', user);
  
      return res.status(201).json({ msg: 'Success' , id: user._id});
    } catch (err) {
      console.error('Error creating user: ', err);
      return res.status(500).json({ msg: 'Internal Server Error' });
    }
}

export { 
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser
}