import dotenv from "dotenv";
dotenv.config();

const getTasksController = async (req,res) => {
    const data = req.user;
    console.log("Data recieved for jwt auth",data)
    if (!data) {
        return res.status(401).json({
            success: false,
            message: 'bad request'
        })
    }
    return res.status(200).json({
        success: true,
        message: "successful"
    })
}

export {
    getTasksController
}