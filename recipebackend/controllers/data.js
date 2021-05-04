import User from "../models/user.js"

export const editAllegyHandler = async (req, res) => {
    //const _id = req.params.id;
    console.log("edit allergy called, email ", req.params.email);
    console.log("edit allergy called, list ", req.body.allergies);
    const modified = await User.findOneAndUpdate({email: req.params.email}, {allergies: req.body.allergies}, {new: true});
    console.log(modified);
    res.json(modified);
}

export const editFavouriteHandler = async (req, res) => {
    //const _id = req.params.id;
    console.log("edit favourite called, email ", req.params.email);
    console.log("edit favourite list, list ", req.body.favourites);
    const modified = await User.findOneAndUpdate({email: req.params.email}, {favourites: req.body.favourites}, {new: true});
    console.log(modified);
    res.json(modified);
}
