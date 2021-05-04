import User from "../models/user.js";

export async function registerController(req, res) {
    const user = await User.findOne({email: req.body.email});
    if (user) {
        console.log("A user account with that email address already exists");
        res.json({success: false, message: "A user account with that email address already exists"});
    } else {
        const createdUserAccount = await User.create({
            email: req.body.email,
            password: req.body.password,
            favourites: [],
            allergies: []
        });
        res.status(200).json({
            data: createdUserAccount,
            success: true
        });
        console.log("account created")
    }
}

export async function loginController(req, res) {
    console.log("received login request for ", req.body.email)
    let success = false;
    const user = await User.findOne({email: req.body.email});
    if (!user) {
        success = false;
        console.log("no account for ", req.body.email)
    } else {
        success = req.body.password === user.password;
    }
    if (!success) {
        res.json({message: "incorrect email or password"});
        console.log("no password match for ", req.body.email)
    } else {
        console.log("password matched for ", req.body.email)
        res.status(200).json({success:true, data: user});
    }
}
