
export const resetPassword = async (req, res) => {
    try {
        console.log(req.body)
        const { email } = req.body 
        return res.status(201).json({message: "Sended Validation Code to ", email})
    } catch (error) {
        return res.status(500).json({message: "Error", error})
    }
}