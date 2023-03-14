import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from "../models/User.js";
import cloudinary from '../config/cloudinery.js';


/* REGISTER USER */
export const register = async (req, res) => {

    try {
        const {
            firstName,
            lastName,
            username,
            email,
            phone,
            password
        } = req.body;
        const salt = await bcrypt.genSalt();

        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            username,
            email,
            password: passwordHash,
            phone
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);


    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};


/* LOGGING IN */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) return res.status(400).json({ msg: "User does not exist. " });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
        delete user.password;
        res.status(200).json({ token, user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getUser = async (req, res) => {

    const userId = req.params.id
    try {
        const user = await User.findById(userId);

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const addProfilePic = async (req, res) => {
    try {
        const { userId } = req.body;
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "Users"
        });
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePic: result.secure_url },
            { new: true }
        )


        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json(error)
    }
}


export const editUserProfile = async (req, res) => {

    try {
        const { firstName, lastName, bio, phone, userId } = req.body
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                firstName: firstName,
                lastName: lastName,
                bio: bio,
                phone: phone
            },
            { new: true }
        )

        res.status(200).json(updatedUser)
    } catch {
        res.status(500).json(error)
    }
}

export const getAllUsers = async (req, res) => {
    const userId = req.params.id;
    try {
        const users = await User.find({ _id: { $ne: userId } }, { password: 0 });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send('Error retrieving users from database');
    }
};


export const followTheUser = async (req, res) => {



    try {
        const { userId, userIdToFollow } = req.body;
        const user = await User.findById(userIdToFollow);
        if (!user) {
            return res.status(400).json({ msg: "User does not exist" })
        }
        if (!user.followers.includes(userId)) { // Check if userId is not already in followers
            user.followers.push(userId);    
            await user.save();
        }

        const currentUser = await User.findById(userId);
        if (!currentUser) {
            return res.status(400).json({ msg: "User does not exist" })
        }
        if (!currentUser.following.includes(userIdToFollow)) { // Check if userIdToFollow is not already in following
            currentUser.following.push(userIdToFollow);
            await currentUser.save();
        }
        res.status(200).json(currentUser);
    } catch (error) {
        res.status(500).json(error)
    }
}


export const unFollowTheUser = async (req, res) => {


    try {
        const { userId, userIdToUnFollow } = req.body;
        const user = await User.findById(userIdToUnFollow);
        if (!user) {
            return res.status(400).json({ msg: "User does not exist" })
        }
        if (user.followers.includes(userId)) { // Check if userId is already in followers
            const index = user.followers.indexOf(userId);
            user.followers.splice(index, 1); // Remove it from the array
            await user.save();
        }

        const currentUser = await User.findById(userId);
        if (!currentUser) {
            return res.status(400).json({ msg: "User does not exist" })
        }
        if (currentUser.following.includes(userIdToUnFollow)) { // Check if userIdToUnFollow is already in following
            const index = currentUser.following.indexOf(userIdToUnFollow);
            currentUser.following.splice(index, 1); // Remove it from the array
            await currentUser.save();
        }
        res.status(200).json(currentUser);
    } catch (error) {
        res.status(500).json(error)
    }
}



