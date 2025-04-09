const Course = require('../models/Course');
const User = require('../models/User');

exports.createCourse = async (req, res) => {
    const { userId, playListId, videoUrl, totalVideos, playListName } = req.body; 

    console.log(req.body);

    try {
        let course = await Course.findOne({ user: userId, playListId });

        if (!course) {
            // Create a new course entry if it doesn't exist
            const newCourse = new Course({
                user: userId,
                playListId: playListId,
                completedVideos: [videoUrl],
                totalVideos: totalVideos,
                isCompleted: false,
                playListName: playListName,
            });

            console.log(newCourse);

            await newCourse.save();
            return res.json(newCourse);
        } else {
            // Add videoUrl to completedVideos if not already present
            if (!course.completedVideos.includes(videoUrl)) {
                course.completedVideos.push(videoUrl);
            }

            // Mark course as completed if all videos are watched
            if (course.completedVideos.length === course.totalVideos) {
                course.isCompleted = true;
                course.completionDate = new Date();
            }

            console.log(course);

            await course.save();
            return res.json(course);
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}

exports.getCompletedCourse = async (req, res) => {
    const { userId, playListId } = req.body;
    try{
        const course = await Course.findOne({ user: userId, playListId });
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json({completedVideos: course.completedVideos});
    }
    catch(error){
        res.status(500).json({ error: 'Server error' });
    }
}

exports.getCourses = async (req, res) => {
    const { userId } = req.params;
    try{
        const courses = await Course.find({user: userId});
        if(!courses){
            return res.status(404).json({message: "No Courses Found"});
        }

        res.status(200).json(courses);
    }catch(err){
        res.status(500).json({ err: 'Server error' });
    }
}