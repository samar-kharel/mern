const login = (req, res) =>
{
    try{
        res.status(200).send("LOGIN PAGE");
    }
    catch(error){
        res.status(500).json({
        message: "Internal server error"

    });
    
}
}

const signup = (req, res) =>
    {
        try{
            res.status(201).send("SIGNUP PAGE");
        }
        catch(error){
            res.status(500).json({
            message: "Internal server error"
    
        });
    }
    }


const profile = (req, res) =>
        {
        try{
            res.status(200).json({
                name : "SAMAR",
                age : "18"

            });
        }
        catch(error){
            res.status(500).json({
                message: "Internal server error"


            });
        }
        }


module.exports = {signup, login, profile};
