export const getMyProfile = (req,res) => {
try {
    const userid = req.userId
    res.json({
        success: true,
        message: "User finded",
        data : userid
    })
} catch (error) {
    res.json({
        success: false,
        message: error,
    })
}
};
