import cloudinary from '../config/cloudinery.js';
import Story from '../models/Story.js';

export const addStory = async (req, res) => {
    try {
        const { id } = req.user;
        const {fileType} = req.body
        const result = await cloudinary.uploader.upload(req.file.path, {
            resource_type: fileType, folder: "Stories"
        });
        
        const newStory = new Story({
            author: id,
            file: result.secure_url,
            fileType: fileType
        });

        const saveStory = await newStory.save();
        const populatedStory = await Story.findById(saveStory._id)
            .populate('author', 'username profilePic')
            .exec();

        res.status(201).json(populatedStory);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getUserStories = async (req, res) => {
    try {
        const userId = req.user;
        const stories = 
        res.status(200).json(stories);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}